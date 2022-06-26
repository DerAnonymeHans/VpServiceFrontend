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
      <Navigation v-if="_isLoggedIn" />

      <div class="content">
         <div v-if="_isLoggedIn">
            <Sandkasten v-if="page === 'Sandkasten'" :statistic="statistic" />
            <Ranglisten v-if="page === 'Ranglisten'" :statistic="statistic" />
            <Allgemein v-if="page === 'Allgemein'" :statistic="statistic" />
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
         page: "Sandkasten",
         statistic: "gesamtzahlen",
         showModal: false,
         modalTitle: "",
         modalContent: "",
         _isLoggedIn: false,
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
   },
   mounted() {
      // this.preloadData();
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

            let res;
            try {
               res = await fetchAPI("/Statistic" + path, { credentials: "include" });
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
            const request = await window.statDB.transaction(["cached-data"]).objectStore("cached-data").get(path);

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
         window.statDB.transaction(["cached-data"], "readwrite").objectStore("cached-data").add({ data: value, path: path });
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
   },
};
</script>

<style lang="scss" scoped>
@import "@/styles/_variables.scss";
main {
   .content {
      margin: 5vh auto;
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
</style>
<style lang="scss">
@import "@/styles/_variables.scss";
main {
   .content {
      padding-bottom: $margin * 2;
   }
   // &.desktop{
   //    .statistic{
   //       min-height: 60vh;
   //    }
   // }
   // &.tablet{
   //    .statistic{
   //       min-height: 60vh;
   //    }
   // }
   // &.mobile{
   //    .statistic{
   //       min-height: 80vh;
   //    }
   // }
}
</style>
