<!-- @format -->

<script setup>
import Subscribe from "./Subscribe/Index.vue";
import Notification from "./Notification/Index.vue";
import Lernsax from "./Lernsax/Index.vue";

import { fetchAPI, sleep } from "@/App.vue";
import Modal, { Button } from "@/components/modal/Modal.vue";
import Switch, { SwitchModel } from "@/components/switch/Switch.vue";
import KeyLabelPair from "@/structs/KeyLabelPair.js";
import Input from "@/components/input/Input.vue";
</script>
<template>
   <div class="main">
      <div class="center page-switch-container">
         <Switch :options="switchModel.options" :default="page" :value="page" @switch="switchPage" v-if="isLoggedIn" />
      </div>
      <div v-if="page === null"></div>

      <Notification v-else-if="page === 'notif'" :isHashResetResponseModalOpen="isHashResetResponseModalOpen" />
      <Subscribe v-else-if="page === 'sub'" @requestHashReset="requestHashResetModal()" />
      <Lernsax v-else-if="page === 'lernsax'" />

      <Modal :isOpen="showModal" @close="() => closeModal()" :title="modalTitle" :content="modalContent" :buttons="modalButtons">
         <Input v-if="modalMode === 'hashReset'" :isInvert="true" label="Email Addresse" :id="'hashreset-mail-input'"></Input>
      </Modal>
   </div>
</template>
<script>
export default {
   data() {
      return {
         isLoggedIn: null,
         page: null,
         modalTitle: "",
         modalContent: "",
         showModal: false,
         modalMode: "",
         modalButtons: [],
         switchModel: new SwitchModel(
            [new KeyLabelPair("sub", "Abo Seite"), new KeyLabelPair("notif", "Plan Seite"), new KeyLabelPair("lernsax", "Lernsax")],
            "notif"
         ),

         isHashResetResponseModalOpen: false,
      };
   },
   async mounted() {
      await this.handleHashReset();
      await this.getPage();
   },
   methods: {
      async handleHashReset() {
         return new Promise(async (resolve, reject) => {
            const params = new URLSearchParams(window.location.search);
            const key = params.get("code");
            if (key === null) return resolve();
            params.delete("code");
            window.history.pushState("", "", window.location.origin + window.location.pathname + params.toString());
            await this.resetHash(key);
            return resolve();
         });
      },
      async resetHash(key) {
         return new Promise(async (resolve, reject) => {
            const form = new FormData();
            form.append("key", key);
            this.modalButtons = [];
            this.modalMode = "hashResetResponse";
            let res;
            try {
               res = await fetchAPI(`/User/ResetHash`, { method: "POST", body: form }).then((res) => res.json());
               if (res.isSuccess) {
                  this.isHashResetResponseModalOpen = true;
                  this.modalTitle = "Anmeldung erfolgreich";
                  this.modalContent = `<b>ACHTUNG:</b> Folge den Anweisungen um Push Nachrichten zu erhalten:<br>
                     1. Scrolle nach unten und wähle "Push Nachrichten" statt "Email" aus und erlaube die Benachrichtigungen.<br>
                     2. CHROME: Drücke auf die 3 Punkte oben rechts und anschließend auf "App installieren" (Keine Angst, das ist nur diese Webseite in App-Form - rund 0,5 MB)<br>
                     SONST: Füge die Webseite zum Startbildschirm hinzu
                     `;
                  this.showModal = true;
                  sessionStorage.setItem("notif-page", "notif");
                  return resolve();
               }
               this.modalTitle = "Anmeldung fehlgeschlagen";
               this.modalContent = res.message;
            } catch (e) {
               this.modalTitle = "Anmeldung fehlgeschlagen";
               this.modalContent = "Leider ist etwas schief gelaufen";
            }
            this.showModal = true;
            return resolve();
         });
      },
      closeModal() {
         this.showModal = false;
         if (this.modalMode === "hashResetResponse") {
            this.isHashResetResponseModalOpen = false;
         }
      },
      async getPage() {
         let cachedPage = sessionStorage.getItem("notif-page");
         const params = new URLSearchParams(window.location.search);
         if (params.get("page") !== null) cachedPage = params.get("page");
         try {
            let res = await fetchAPI("/User/IsAuthenticated").then((res) => res.json());
            if (res.body === true) {
               this.isLoggedIn = true;
               this.page = this.switchModel.options.findIndex((el) => el.key === cachedPage) === -1 ? "sub" : cachedPage;
               return;
            }
         } catch {}
         this.isLoggedIn = false;
         this.page = "sub";
      },
      switchPage(page) {
         sessionStorage.setItem("notif-page", page);
         this.page = page;
      },

      requestHashResetModal() {
         this.modalTitle = "Neu anmelden";
         this.modalContent = `Wenn du dich bereits einmal angemeldet hast und nun auf die Vertretungsplandaten zugreifen möchtest bist du hier richtig. Wenn du auf den Knopf drückst, erhälst du eine Email, mit einem Link, der dich wieder anmeldet.<br><br>
         `;
         this.modalButtons = [
            new Button("Email senden", "btn", () => {
               (async () => {
                  await sleep(300);
                  this.requestHashReset();
               })();
            }),
         ];
         this.modalMode = "hashReset";
         this.showModal = true;
      },
      async requestHashReset() {
         const mail = document.getElementById("hashreset-mail-input").value;
         this.modalMode = "none";
         await sleep(0);

         this.modalButtons = [];
         let res;
         let form = new FormData();
         form.append("mail", mail);
         try {
            res = await fetchAPI(`/User/RequestHashReset`, { method: "POST", body: form }).then((res) => res.json());
            this.modalContent = res.message;
            if (res.isSuccess) {
               this.modalTitle = "Erfolg";
               this.showModal = true;
               return;
            }
         } catch (e) {
            this.modalContent = "Leider ist etwas schief gelaufen.";
         }
         this.modalButtons = [
            new Button("Erneut versuchen", "btn", () => {
               (async () => {
                  await sleep(300);
                  this.requestHashResetModal();
               })();
            }),
         ];
         this.modalTitle = "Fehlschlag";
         this.showModal = true;
      },
   },
};
</script>
<style lang="scss" scoped>
@import "@/styles/_variables.scss";
.main {
   margin-top: 9vh;
}
.page-switch-container {
   background-color: $col-dark;
   padding-bottom: $padding * 0.2;
}
</style>
