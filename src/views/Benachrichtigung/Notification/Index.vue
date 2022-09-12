<!-- @format -->

<script setup>
import { fetchAPI, sleep } from "@/App.vue";
import Modal, { Button } from "@/components/modal/Modal.vue";
import Switch, { SwitchModel } from "@/components/switch/Switch.vue";
import IconRepo from "@/repos/IconRepo.vue";
import KeyLabelPair from "@/structs/KeyLabelPair.js";
import TableComp, { Table } from "./Table.vue";
import SmallExtra from "./SmallExtra.vue";
</script>
<template>
   <div :class="mq.current" class="notif-page" ref="page">
      <div class="data-space">
         <img :src="imgSrc" class="artwork" :alt="imgSrc" />
         <div class="text-center" :style="{ color: color }" v-if="tempMax !== null">{{ tempMin }}/{{ tempMax }}°C</div>
         <h2 class="global-extra" :style="{ color: color }">{{ globalExtra }}</h2>
         <div class="box text-center">
            <b>{{ title }}</b> <br />
            <i>(vom {{ originDate }} um {{ originTime }} Uhr.)</i>
         </div>
         <div class="box" v-if="information.length > 0">
            <span v-for="info in information" :key="info">{{ info }}<br /></span>
         </div>
         <div class="box">Es fehlen: {{ missingTeachers.join(", ") }}</div>
         <div class="box plan-box">
            <div v-for="table in tables" :key="table">
               <TableComp :color="color" :table="table" />
            </div>
         </div>
         <div class="box link-container" :style="{ color: color }">
            <button class="btn"><a href="https://jkg-leipzig.de/vertretungsplan/">Schulseite</a></button>
            <button class="btn"><RouterLink to="/Mitmachen">Kleines Extra beitragen</RouterLink></button>
         </div>
         <div class="box small-extra">
            <SmallExtra :color="color" :text="extraText" :author="extraAuthor" />
         </div>
      </div>
      <hr v-if="mq.tabletMinus" :style="{ borderColor: color }" />
      <div class="user-space">
         <div class="account-logo-container" v-if="mq.desktopPlus">
            <div class="account-logo" :style="{ color: color }"><IconRepo name="account" /></div>
         </div>
         <div class="box">
            <div
               id="webpushr-subscription-button"
               data-show-subscriber-count="false"
               data-button-text="Benachrichtigung erlauben"
               data-subscriber-count-text=""
               data-background-color="#ff8ded"
            ></div>
            <div class="switches">
               <Switch
                  v-for="(_switch, key) in _switches"
                  :key="key"
                  :invert="true"
                  :options="_switch.options"
                  :default="_switch.value"
                  @switch="(to) => switchMode(key, to)"
               />
            </div>
            <button class="btn" @click="reload()">Neuladen</button>
         </div>
      </div>
      <details class="box qrcode-container">
         <summary>QR Code</summary>
         <img :src="qrCodeSrc" alt="QR Code" loading="lazy" />
      </details>
      <Modal :isOpen="showModal" @close="showModal = !showModal" :title="modalTitle" :content="modalContent" :buttons="[]" />
   </div>
</template>
<script>
export default {
   inject: ["mq"],
   data() {
      return {
         imgSrc: "",
         qrCodeSrc: `${import.meta.env.VITE_API_URL}/Notification/QrCode`,
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
         tempMax: "",
         tempMin: "",

         modalTitle: "",
         modalContent: "",
         showModal: false,

         _switches: {
            color: new SwitchModel(
               [new KeyLabelPair("darkmode", "Dunkelmodus"), new KeyLabelPair("lightmode", "Hellmodus")],
               localStorage.getItem("color-scheme")
            ),
            notifyMode: new SwitchModel([new KeyLabelPair("pwa", "Push Nachricht"), new KeyLabelPair("mail", "Per Mail")], "pwa"),
         },

         isNotifyModeUpdated: false,

         colorScheme: "darkmode",
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
         this.imgSrc = `${import.meta.env.VITE_API_URL}/Notification/Artwork/${this.artworkName}/${this.userName}`;
         this.globalExtra = global.globalExtra || "Moin";
         this.affectedDate = global.affectedDate || "";
         this.originDate = global.originDate || "";
         this.originTime = global.originTime || "";
         this.tempMax = global.weather.tempMax;
         this.tempMin = global.weather.tempMin;
         this.tables = [new Table(global.affectedWeekday, grade.rows), new Table(global.affectedWeekday2, grade.rows2)];
         this.missingTeachers = global.missingTeachers?.map((teacher) => teacher.trim()) || [];
         this.information = global.information || [];
         this.grade = grade.grade;
         this.globalExtra = grade.gradeExtra !== null ? grade.gradeExtra : this.globalExtra;
         this.extraText = user.smallExtra.text;
         this.extraAuthor = user.smallExtra.author;
         this.color = global.artwork.color;
         this.title = global.subject;

         const lastPlanModel = this.handleLastPlan(global, grade);
         if (lastPlanModel !== null) this.tables.push(lastPlanModel.table);

         this.ensurePlanColorContrast();

         localStorage.setItem("greeting", this.userName);
         localStorage.setItem("last-origin-datetime", `${this.originDate}, ${this.originTime}`);
         localStorage.setItem("last-affected-date", this.affectedDate);
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
      handleLastPlan(globalModel, gradeModel) {
         let lastPlanModel = localStorage.getItem("last-plan-model");

         if (lastPlanModel !== null) {
            lastPlanModel = JSON.parse(lastPlanModel);
         }
         if (lastPlanModel?.affectedDate === globalModel.affectedDate) {
            this.setLastPlan(globalModel, gradeModel);
            return null;
         }

         // if last plan is affecting today
         if (new Date().getDate() === parseInt(lastPlanModel.affectedDate.slice(0, 2))) return lastPlanModel;

         this.setLastPlan(globalModel, gradeModel);

         return null;
      },
      setLastPlan(globalModel, gradeModel) {
         const newLastPlanModel = new LastPlanModel(globalModel, gradeModel);
         localStorage.setItem("last-plan-model", JSON.stringify(newLastPlanModel));
      },
      ensurePlanColorContrast() {
         const wantedBrightness = this.colorScheme === "lightmode" ? 550 : 300;
         const dec = (hex) => parseInt(hex, 16);
         const hex = (dec) => Math.round(dec).toString(16);

         let r = dec(this.color.slice(1, 3)),
            g = dec(this.color.slice(3, 5)),
            b = dec(this.color.slice(5, 7));

         const quotient = wantedBrightness / (r + g + b);
         if (this.colorScheme === "darkmode" && quotient < 1) return;
         if (this.colorScheme === "lightmode" && quotient > 1) return;
         console.log(quotient);

         r *= quotient;
         g *= quotient;
         b *= quotient;

         this.color = `#${hex(r)}${hex(g)}${hex(b)}`;
      },
      async isPlanNew() {
         return new Promise(async (resolve, reject) => {
            try {
               const lastOriginDatetime = localStorage.getItem("last-origin-datetime");
               const lastAffectedDate = localStorage.getItem("last-affected-date");
               let res = await fetchAPI(`/Notification/IsNewPlan/${encodeURIComponent(`${lastOriginDatetime}-${lastAffectedDate}`)}`).then((res) =>
                  res.json()
               );
               if (res.isSuccess) {
                  return resolve(res.body);
               }
            } catch (e) {}
            return resolve(true);
         });
      },
      reload() {
         localStorage.setItem("last-origin-datetime", "reload");
         this.fetchData();
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
               this.colorScheme = to;
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

         this.ensurePlanColorContrast();
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

class LastPlanModel {
   constructor(global, grade) {
      this.table = new Table(
         global.affectedWeekday,
         grade.rows.map((row) => Object.assign(row, { hasChange: false })),
         global.information
      );
      this.affectedDate = global.affectedDate;
   }
}
</script>
<style lang="scss">
@import "@/styles/_variables.scss";
.notif-page {
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
   color: var(--font);

   .box {
      color: var(--font);
      background-color: var(--bg-medium);
      border: none;
   }

   hr {
      width: 50%;
      border: none;
      border-bottom: 3px solid $accent;
   }

   .data-space {
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

      h4 {
         margin: $margin * 0.5 auto;
         text-align: center;
      }

      .plan-box {
         padding-inline: $padding * 0.1;

         > * {
            &:not(:last-child) {
               margin-bottom: $margin * 2;
            }
         }
      }

      .link-container {
         width: fit-content;
         margin: auto;

         > * {
            margin-right: $margin;
            color: inherit !important;
            background-color: currentColor;
            a {
               color: var(--bg);
            }

            &:last-child {
               margin-right: 0;
            }
         }
      }
   }

   .user-space {
      margin-inline: auto;

      .account-logo-container {
         .account-logo {
            color: $accent;
            margin: auto;
         }
      }

      .switches {
         > * {
            margin: $margin 0;
         }
      }
   }

   .qrcode-container {
      margin: auto;
      margin-top: $margin;
      max-width: 95%;

      img {
         max-width: 500px;
         width: 100%;
      }
   }

   &.ultrawide {
      .data-space,
      .user-space {
         width: 70% !important;
      }
   }

   &.ultrawide,
   &.desktop {
      grid-template-columns: 1fr 1fr;
      .data-space,
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
      .data-space,
      .user-space {
         width: 70%;
      }
      .user-space {
         margin-top: $margin;
      }
   }

   &.mobile {
      .data-space,
      .user-space {
         width: 95%;
      }
      .data-space {
         table {
            font-size: 11pt;
         }
      }
      .user-space {
         margin-top: $margin;
      }
   }
}
</style>
