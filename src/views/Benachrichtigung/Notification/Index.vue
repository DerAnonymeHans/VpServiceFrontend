<!-- @format -->

<script setup>
import { fetchAPI, sleep } from "@/App.vue";
import Modal, { Button } from "@/components/modal/Modal.vue";
import Switch, { SwitchModel } from "@/components/switch/Switch.vue";
import IconRepo from "@/repos/IconRepo.vue";
import KeyLabelPair from "@/structs/KeyLabelPair.js";
</script>
<template>
   <div :class="mq.current" class="page" ref="page">
      <div class="data">
         <img :src="imgSrc" class="artwork" :alt="imgSrc" />
         <h2 class="global-extra" :style="{ color: color }">{{ globalExtra }}</h2>
         <div class="box text-center">
            <b>{{ title }}</b> <br />
            <i>(vom {{ originDate }} um {{ originTime }} Uhr.)</i>
         </div>
         <div class="box" v-if="information.length > 0">
            <span v-for="info in information" :key="info">{{ info }}<br /></span>
         </div>
         <div class="box">Es fehlen: {{ missingTeachers.join(", ") }}</div>
         <div class="box">
            <div v-for="table in tables" :key="table">
               <div v-if="table.rows.length > 0">
                  <h4>{{ table.weekday }}</h4>
                  <table>
                     <tr>
                        <th>Klasse</th>
                        <th>Stunde</th>
                        <th>Fach</th>
                        <th>Lehrer</th>
                        <th>Raum</th>
                        <th>Info</th>
                     </tr>
                     <tr v-for="row in table.rows" :key="row" :style="{ color: row.hasChange ? color : '' }">
                        <td>{{ row.row.klasse }}</td>
                        <td>{{ row.row.stunde }}</td>
                        <td>{{ row.row.fach }}</td>
                        <td>{{ row.row.lehrer }}</td>
                        <td>{{ row.row.raum }}</td>
                        <td>{{ row.row.info }}</td>
                     </tr>
                  </table>
               </div>
            </div>
         </div>
         <div class="box small-extra">
            <blockquote :style="{ borderColor: color }" v-html="extraText"></blockquote>
            <p v-if="extraAuthor?.length > 0">~{{ extraAuthor }}</p>
         </div>
      </div>
      <div class="user-space">
         <div class="account-logo-container">
            <div class="account-logo"><IconRepo name="account" /></div>
         </div>
         <div class="box">
            <div
               id="webpushr-subscription-button"
               data-show-subscriber-count="false"
               data-button-text="Benachrichtigung erlauben"
               data-subscriber-count-text=""
               data-background-color="#ff8ded"
            ></div>
            <Switch
               v-for="(_switch, key) in _switches"
               :key="key"
               :invert="true"
               :options="_switch.options"
               :default="_switch.value"
               @switch="(to) => switchMode(key, to)"
            />
         </div>
      </div>
      <Modal :isOpen="showModal" @close="showModal = !showModal" :title="modalTitle" :content="modalContent" :buttons="[]" />
   </div>
</template>
<script>
export default {
   inject: ["mq"],
   data() {
      return {
         imgSrc: "",
         globalExtra: "",
         grade: "",
         affectedDate: "",
         originDate: "",
         originTime: "",
         missingTeachers: [],
         information: [],
         tables: [],
         extraText: "",
         extraAuthor: "",
         userName: "",
         color: "",
         title: "",

         modalTitle: "",
         modalContent: "",
         showModal: false,

         _switches: {
            color: new SwitchModel(
               [new KeyLabelPair("darkmode", "Dunkelmodus"), new KeyLabelPair("lightmode", "Hellmodus")],
               localStorage.getItem("color-scheme")
            ),
            notifyMode: new SwitchModel([new KeyLabelPair("pwa", "Per App"), new KeyLabelPair("mail", "Per Mail")], "pwa"),
         },

         isNotifyModeUpdated: false,
      };
   },
   beforeMount() {
      localStorage.setItem("device-was-logged-in", "true");
      this.fetchData();
   },
   mounted() {
      this.loadColorScheme(localStorage.getItem("color-scheme"));
      this.getNotifyMode();

      webpushr("fetch_id", (sid) => {
         this.saveUserPushrId(sid);
      });
   },
   methods: {
      async fetchData() {
         const useCachedData = !(await this.isPlanNew());
         const res = await Promise.allSettled([
            this.fetchModel("Global", useCachedData),
            this.fetchModel("Grade", useCachedData),
            this.fetchModel("User", useCachedData),
         ]);
         const global = res[0].value,
            grade = res[1].value,
            user = res[2].value;

         this.userName = user.userName || "Kepleraner";
         this.artworkName = global.artwork?.name || "";
         this.imgSrc = `${import.meta.env.VITE_API_URL}/Notification/GetArtwork/${this.artworkName}/${this.userName}`;
         this.globalExtra = global.globalExtra || "Moin";
         this.affectedDate = global.affectedDate || "";
         this.originDate = global.originDate || "";
         this.originTime = global.originTime || "";
         this.tables.push(new Table(global.affectedWeekday, grade.rows), new Table(global.affectedWeekday2, grade.rows2));
         this.missingTeachers = global.missingTeachers?.map((teacher) => teacher.trim()) || [];
         this.information = global.information || [];
         this.grade = grade.grade;
         this.globalExtra = grade.gradeExtra !== null ? grade.gradeExtra : this.globalExtra;
         this.extraText = user.smallExtra.text;
         this.extraAuthor = user.smallExtra.author;
         this.color = global.artwork.color;
         this.title = global.subject;

         localStorage.setItem("last-origin-datetime", `${this.originDate}, ${this.originTime}`);
      },
      fetchModel(name, useCachedData) {
         return new Promise(async (resolve, reject) => {
            if (useCachedData) {
               const json = localStorage.getItem(`${name}-model`);
               if (json.length > 0) {
                  return resolve(JSON.parse(json));
               }
            }
            try {
               let res = await fetchAPI(`/Notification/${name}Model`).then((res) => res.json());
               if (res.isSuccess) {
                  localStorage.setItem(`${name}-model`, JSON.stringify(res.body));
                  return resolve(res.body);
               }
               this.modalTitle = "Fehlschlag";
               this.modalContent = res.message;
            } catch (e) {
               this.modalTitle = "Fehlschlag";
               this.modalContent = "Leider ist etwas schief gelaufen";
            }
            this.showModal = true;
            return reject();
         });
      },
      async isPlanNew() {
         return new Promise(async (resolve, reject) => {
            try {
               let res = await fetchAPI(`/Notification/IsNewPlan/${encodeURIComponent(localStorage.getItem("last-origin-datetime"))}`).then((res) =>
                  res.json()
               );
               if (res.isSuccess) {
                  return resolve(res.body);
               }
            } catch (e) {}
            return resolve(true);
         });
      },
      async getNotifyMode() {
         try {
            let res = await fetchAPI("/User/GetNotifyMode").then((res) => res.json());
            if (res.isSuccess) {
               const mode = res.body.toLowerCase() === "pwa" ? "pwa" : "mail";
               const notifyModeModel = { ...this._switches.notifyMode };
               notifyModeModel.value = mode;
               delete this._switches.notifyMode;
               await sleep(0);
               this._switches = Object.assign(this._switches, {
                  notifyMode: notifyModeModel,
               });
               await sleep(0);
               this.isNotifyModeUpdated = true;
               return;
            }
         } catch (e) {}
      },
      switchMode(key, to) {
         switch (key) {
            case "color":
               this.loadColorScheme(to);
               break;
            case "notifyMode":
               this.isNotifyModeUpdated && this.changeNotifyMode(to);
               break;
         }
      },
      loadColorScheme(name) {
         localStorage.setItem("color-scheme", name);
         const dark = {
            bg: "#111",
            "bg-medium": "#222",
            "col-dark": "#333",
            "col-light": "#444",
            font: "#ccc",
         };
         const light = {
            bg: "#fff",
            "bg-medium": "#eee",
            "col-light": "#ddd",
            "col-dark": "#ccc",
            font: "#000",
         };
         const scheme = name === "lightmode" ? light : dark;
         for (const key in scheme) {
            this.$refs.page.style.setProperty(`--${key}`, scheme[key]);
         }
      },
      async changeNotifyMode(name) {
         try {
            let res = await fetchAPI(`/User/ChangeNotifyMode/${name}`, { method: "POST" }).then((res) => res.json());
            this.modalContent = res.message;
            if (res.isSuccess) {
               this.modalTitle = "Erfolg";
               this.showModal = true;
               return;
            }
         } catch (e) {
            this.modalContent = "Leider ist etwas schief gelaufen.";
         }
         this.modalTitle = "Fehlschlag";
         this.showModal = true;
      },
      async saveUserPushrId(sid) {
         console.log(sid);
         if (typeof sid !== "string") return;
         const form = new FormData();
         form.append("sid", sid);
         try {
            await fetchAPI(`/User/SetPushId/${sid}`, { method: "POST" }).then((res) => res.json());
         } catch (e) {
            console.error(e);
         }
      },
   },
};
class Table {
   constructor(weekday, rows) {
      this.weekday = weekday;
      this.rows = rows;
   }
}
</script>
<style lang="scss" scoped>
@import "@/styles/_variables.scss";
.page {
   --bg: #111;
   --bg-medium: #222;
   --col-light: #444;
   --col-dark: #333;
   --font: #ccc;

   background-color: var(--bg);
   padding-top: 2vh;
   padding-bottom: 5vh;
   display: grid;
   align-content: flex-start;

   .box {
      color: var(--font);
      background-color: var(--bg-medium);
      // border-color: var(--bg-medium);
      border: none;
   }

   .data {
      margin: auto;

      .artwork {
         width: 100%;
      }

      .box {
         margin: $margin 0;
      }

      .global-extra {
         text-align: center;
      }

      .small-extra {
         blockquote {
            border-left: 3px solid $accent;
            margin: 0;
            padding-left: $padding;
         }
         p {
            text-align: right;
            margin-right: $margin * 3;
         }
      }

      h4 {
         margin: $margin * 0.5 auto;
         text-align: center;
      }

      table {
         width: 100%;

         tr {
            td,
            th {
               border-left: none;
               &:nth-child(2n) {
                  background-color: var(--col-light);
               }
               &:nth-child(2n - 1) {
                  background-color: var(--col-dark);
               }
            }
         }
      }
   }

   .user-space {
      margin-inline: auto;

      .account-logo-container {
         // border: 3px solid var(--bg-medium);
         // border-radius: $border-radius $border-radius 0 0;

         .account-logo {
            color: $accent;
            margin: auto;
         }
      }
   }

   &.ultrawide {
      .data,
      .user-space {
         width: 70% !important;
      }
   }

   &.ultrawide,
   &.desktop {
      grid-template-columns: 1fr 1fr;
      .data,
      .user-space {
         width: 85%;
      }
      .user-space {
         .account-logo {
            width: 20%;
         }
      }
   }

   &.tablet {
      .data,
      .user-space {
         width: 60%;
      }
      .user-space {
         .account-logo {
            width: 30%;
         }
      }
   }

   &.mobile {
      .data,
      .user-space {
         width: 95%;
      }
      .data {
         table {
            font-size: 11pt;
         }
      }
      .user-space {
         margin-top: $margin * 2;
         .account-logo {
            width: 40%;
         }
      }
   }
}
</style>
