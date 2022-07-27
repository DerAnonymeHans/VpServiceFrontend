<!-- @format -->

<script setup>
import { computed } from "vue";

import Navigation from "./components/Navigation.vue";
import Sandkasten from "./sandkasten/Sandkasten.vue";
import Ranglisten from "./ranglisten/Ranglisten.vue";
import Allgemein from "./allgemein/Allgemein.vue";
import Login from "./login/Login.vue";

import Modal from "@/components/modal/Modal.vue";
import DBStatus from "./enums/DBStatus.js";
import { fetchAPI, sleep } from "@/App.vue";
import EntityType from "./enums/EntityType.js";
</script>

<template>
   <main :class="mq.current">
      <h3 class="print text-center">Eine Statistik von kepleraner.herokuapp.com</h3>
      <div class="print text-center">Schuljahr: {{ year }}/{{ parseInt(year) + 1 }}</div>
      <div class="print text-center">Datum: {{ getDate() }}</div>
      <div class="user-inform-container dont-print">
         <div v-if="userInformation.length > 0" class="user-inform">{{ userInformation }}</div>
      </div>
      <Navigation v-if="_isLoggedIn" />

      <div class="content">
         <div v-if="_isLoggedIn && !updateRequested">
            <Allgemein v-if="page === 'allgemein'" :statistic="statistic" />
            <Sandkasten v-if="page === 'sandkasten'" :statistic="statistic" :year="year" />
            <Ranglisten v-if="page === 'ranglisten'" :statistic="statistic" />
         </div>
         <Login v-if="!_isLoggedIn" />
      </div>
   </main>
   <Modal :isOpen="showModal" @close="showModal = !showModal" :title="modalTitle" :content="modalContent" :buttons="[]"></Modal>
</template>

<script>
export default {
   data() {
      return {
         page: "sandkasten",
         statistic: "gesamtzahlen",
         year: "21",
         showModal: false,
         modalTitle: "",
         modalContent: "",
         _isLoggedIn: false,
         updateRequested: false,
         userInformation: "",
      };
   },
   inject: ["mq"],
   provide() {
      return {
         page: computed({
            get: () => {
               if (typeof sessionStorage.getItem("stat-page") !== "string") return this.page;
               return sessionStorage.getItem("stat-page");
            },
            set: (val) => {
               sessionStorage.setItem("stat-page", val);
               this.page = val;
            },
         }),
         statistic: computed({
            get: () => {
               if (typeof sessionStorage.getItem("stat-name") !== "string") return this.statistic;
               return sessionStorage.getItem("stat-name");
            },
            set: (val) => {
               sessionStorage.setItem("stat-name", val);
               this.statistic = val;
            },
         }),
         year: computed({
            get: () => {
               if (typeof sessionStorage.getItem("stat-year") !== "string") return this.year;
               return sessionStorage.getItem("stat-year");
            },
            set: async (val) => {
               sessionStorage.setItem("stat-year", val);
               this.year = val;
               this.updateRequested = true;
               await (() => new Promise((resolve, reject) => setTimeout(resolve, 0)))();
               this.updateRequested = false;
            },
         }),
         isLoggedIn: computed({
            get: () => this._isLoggedIn,
            set: (val) => {
               this._isLoggedIn = val;
               if (!this._isLoggedIn) this.page = "";
            },
         }),
         fetchStat: this.fetchStat,
      };
   },
   async beforeMount() {
      await this.dbSetup();
      this.year =
         typeof sessionStorage.getItem("stat-year") !== "string"
            ? await this.fetchStat("/Years/Current", false)
            : sessionStorage.getItem("stat-year");
   },
   mounted() {
      this.getUserInformation();
   },
   methods: {
      inform(title, content) {
         this.modalTitle = title;
         this.modalContent = content;
         this.showModal = true;
      },
      dbSetup() {
         return new Promise((resolve, reject) => {
            if (sessionStorage.getItem("db-status") === null) sessionStorage.setItem("db-status", DBStatus.NEW_SESSION);
            else if (typeof window.statDB !== "object") sessionStorage.setItem("db-status", DBStatus.PENDING);

            if (!window.indexedDB) {
               sessionStorage.setItem("db-status", DBStatus.ERROR);
               return resolve();
            }

            let request = window.indexedDB.open("StatistikenDB", 1);
            request.onerror = (e) => {
               sessionStorage.setItem("db-status", DBStatus.ERROR);
               return resolve();
            };
            request.onsuccess = (e) => {
               console.log("success");
               window.statDB = e.target.result;
               if (sessionStorage.getItem("db-status") === DBStatus.NEW_SESSION) {
                  console.log("clear");
                  window.statDB.transaction(["cached-data"], "readwrite").objectStore("cached-data").clear();
               }
               sessionStorage.setItem("db-status", DBStatus.RUNNING);

               return resolve();
            };
            request.onupgradeneeded = (e) => {
               sessionStorage.setItem("db-status", DBStatus.RUNNING);
               window.statDB = e.target.result;
               const store = window.statDB.createObjectStore("cached-data", { keyPath: "path" });
               store.createIndex("data", "data", { unique: false });
               return resolve();
            };
         });
      },
      fetchStat(path, isInform = true) {
         return new Promise(async (resolve, reject) => {
            const dbStatus = sessionStorage.getItem("db-status");
            for (let i = 0; i < 5; i++) {
               if (dbStatus === DBStatus.PENDING) await sleep(200);
               else break;
            }
            if (dbStatus === DBStatus.RUNNING) {
               try {
                  const res = await this.getFromDb(path);
                  return resolve(res);
               } catch (e) {}
            }

            console.log(this.year);

            let res;
            try {
               res = await fetchAPI("/Statistic" + path + `?year=${this.year}`, { credentials: "include" });
               if (res.status !== 200) throw new Error();
               res = await res.json();
            } catch (e) {
               if (isInform) this.inform("Problem", "Die von dir angefragten Statistiken wurden nicht gefunden.");
               return reject();
            }

            if (!res.isSuccess) {
               if (isInform) this.inform("Information", res.message);
               return reject();
            }

            if (dbStatus === DBStatus.RUNNING) {
               this.insertInDb(path, res.body);
            }

            return resolve(res.body);
         });
      },
      getFromDb(path) {
         return new Promise(async (resolve, reject) => {
            const request = await window.statDB.transaction(["cached-data"]).objectStore("cached-data").get(`${path}?year=${this.year}`);

            request.onsuccess = (e) => {
               if (e.target.result === undefined) return reject();
               resolve(e.target.result.data);
            };
            request.onerror = (e) => {
               reject();
            };
         });
      },
      insertInDb(path, value) {
         window.statDB
            .transaction(["cached-data"], "readwrite")
            .objectStore("cached-data")
            .add({ data: value, path: path + `?year=${this.year}` });
      },

      async preloadData() {
         try {
            // fetch all names
            for (let key of Object.keys(EntityType)) {
               await this.fetchStat(`/Names/${EntityType[key].idx}`);
            }

            await this.fetchStat("/RecordedDays/Count");
         } catch (e) {
            console.warn("Preload failed. " + e.message);
         }
      },
      async getUserInformation() {
         const res = await this.fetchAPI("/Statistic/CheckDataFreshness").then((res) => res.json());
         if (res.message === null || res.message === undefined) return;
         this.userInformation = res.message;
      },
      getDate() {
         const date = new Date(Date.now());
         return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
      },
   },
};
</script>

<style lang="scss" scoped>
@import "@/styles/_variables.scss";
@import "@/styles/_mixins.scss";
main {
   padding-bottom: $padding * 2;
   margin-top: 9vh;
   .user-inform-container {
      background-color: $col-dark;
      padding: $padding 0;
      .user-inform {
         @include box;
         border-color: $warning;
         background-color: rgba($warning, 0.2);
         color: white;
         width: fit-content;
         max-width: 80vw;
         margin: auto;
      }
   }

   .content {
      margin: 5vh auto;
      margin-bottom: 0;
   }
   &.ultrawide {
      .content {
         width: 45vw;
      }
   }
   &.desktop {
      .content {
         width: 60vw;
      }
   }
   &.tablet {
      .content {
         width: 70vw;
      }
   }
   &.mobile {
      .content {
         width: 95vw;
      }
   }
}

@media print {
   main {
      margin-top: 2vh !important;
      padding-bottom: 0 !important;
   }
   .content {
      width: 100vw !important;
   }
}
</style>
