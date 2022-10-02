<!-- @format -->
<script setup>
import Settings, { SettingBlock, SettingModel } from "@/components/settings/Settings.vue";
import KLP from "@/structs/KeyLabelPair.js";
import { fetchAPI, sleep } from "@/App.vue";
import Modal, { Button as ModalButton } from "@/components/modal/Modal.vue";
import Input from "@/components/input/Input.vue";
</script>
<template>
   <div class="content lernsax-settings">
      <Settings :settings="settings" @settingChange="settingChange" />
      <Modal :isOpen="showModal" @close="() => closeModal()" :title="modalTitle" :content="modalContent" :buttons="modalButtons">
         <div v-if="modalMode === 'change-creds'">
            <Input :isInvert="true" label="Lernsax Emailadresse" :id="'lernsax-mail-input'"></Input>
            <Input :isInvert="true" label="Lernsax Passwort" type="password" :id="'lernsax-pw-input'"></Input>
         </div>
      </Modal>
   </div>
</template>
<script>
export default {
   inject: ["colorScheme"],
   props: {
      methodOnMount: Object,
   },
   data() {
      return {
         modalTitle: "",
         modalContent: "",
         showModal: false,
         modalMode: "",
         modalButtons: [],
         modalMode: "",

         services: Object.freeze(["mail"]),
         subbedServices: [],

         loadCompleted: false,

         settings: [
            new SettingBlock("Meine Daten", [
               new SettingModel("change-creds", "Anmeldedaten ändern", "Hier kannst du deine Lernsaxdaten (Email und Passwort) angeben.", [
                  new KLP("change", "Ändern"),
               ]),
               new SettingModel(
                  "delete-creds",
                  "Anmeldedaten löschen",
                  "Wenn du deine Lernsax-Anmeldedaten löschst musst du auf alle Lernsax Service verzichten. Alle Daten die bereits geladen wurden sind (bspw. Emails) bleiben erhalten, es kommen jedoch keine neuen mehr hinzu.",
                  [new KLP("delete", "Löschen")]
               ),
               new SettingModel(
                  "delete-data",
                  "Alle Daten löschen",
                  "Wenn du auf 'Löschen' drückst, werden alle deine hier verwendeten Lernsaxdaten (Anmeldedaten + bereits geladene Daten wie Emails) gelöscht. ",
                  [new KLP("delete", "Löschen")]
               ),
            ]),
         ],
      };
   },
   computed: {
      scheme() {
         return this.colorScheme();
      },
   },
   async beforeMount() {
      await this.loadServices();
      await this.loadLaterSettings();
      await sleep(100);
      this.loadCompleted = true;
      if (typeof this.methodOnMount?.value === "string" && typeof this.methodOnMount?.option === "string") {
         this.settingChange(this.methodOnMount);
      }
   },
   mounted() {},
   methods: {
      closeModal() {
         this.modalMode = "";
         this.modalButtons = [];
         this.showModal = false;
      },
      settingChange(val) {
         const serviceMethod = val.value === "activate" ? ServiceMethod.subscribe : ServiceMethod.unsubscribe;
         switch (val.option) {
            case "mail-service":
               this.loadCompleted && this.de_activateService("mail", serviceMethod);
               break;
            case "change-creds":
               this.openChangeCredsModal();
               break;
            case "delete-creds":
               this.deleteCreds();
               break;
            case "delete-data":
               this.deleteAll();
               break;
            case "change-colorscheme":
               this.$emit("changeColorScheme", val.value);
               break;
         }
      },
      async loadServices() {
         const res = await fetchAPI("/Lernsax/SubscribedServices").then((res) => res.json());
         this.subbedServices = res.body;
      },
      async getServiceStatus(service) {
         const serviceEnumIdx = this.services.indexOf(service);
         return this.subbedServices.includes(serviceEnumIdx) ? "activate" : "deactivate";
      },
      async loadLaterSettings() {
         const serviceSettings = new SettingBlock("Services", [
            new SettingModel(
               "mail-service",
               "Email",
               "Aktiviere den Service, wenn du Push-Nachrichten über neue Lernsaxemails erhalten willst und diese auch unkompliziert auf dieser Seite anschauen willst.",
               [new KLP("activate", "Aktivieren"), new KLP("deactivate", "Deaktivieren")],
               await this.getServiceStatus("mail")
            ),
         ]);
         const appearanceSettings = new SettingBlock("Aussehen", [
            new SettingModel(
               "change-colorscheme",
               "Farbschema",
               "Hier kannst du zwischen Hell- und Dunkelmodus wechseln.",
               [new KLP("darkmode", "Dunkelmodus"), new KLP("lightmode", "Hellmodus")],
               this.scheme
            ),
         ]);
         this.settings = [...this.settings, serviceSettings, appearanceSettings];
      },
      async de_activateService(service, method) {
         const serviceEnumIdx = this.services.indexOf(service);
         if (method === ServiceMethod.subscribe) {
            window.dispatchEvent(new Event("registerpush"));
         }
         try {
            const res = await fetchAPI(`/Lernsax/Services/${method}/${serviceEnumIdx}`, { method: "POST" }).then((res) => res.json());
            this.modalTitle = "Fehlschlag";
            if (res.isSuccess) {
               this.modalTitle = "Erfolg";
            }
            this.modalContent = res.message;
         } catch (e) {
            this.modalTitile = "Fehlschlag";
            this.modalContent = "Leider ist etwas schief gelaufen.";
         }
         this.showModal = true;
      },

      openChangeCredsModal() {
         this.modalMode = "change-creds";
         this.modalTitle = "Anmeldedaten ändern";
         this.modalContent =
            "Wenn du die Lernsax Services nutzen willst musst du vorher deine Lernsax-Anmeldedaten angeben. Die Daten werden verschlüsselt gespeichert. Beachte jedoch, dass du dem Betreiber der Seite damit deine Daten anvertraust und dieser theoretisch die Daten einsehen kann. Vielen Dank für dein Vertrauen.";
         this.modalButtons = [new ModalButton("Speichern", "btn", this.changeCreds)];
         this.showModal = true;
      },
      async changeCreds() {
         const mail = document.getElementById("lernsax-mail-input").value;
         const pw = document.getElementById("lernsax-pw-input").value;
         const form = new FormData();
         form.append("mail", mail);
         form.append("password", pw);
         window.dispatchEvent(new Event("startloading"));
         try {
            const res = await fetchAPI("/Lernsax/SetCredentials", { method: "POST", body: form }).then((res) => res.json());
            window.dispatchEvent(new Event("endloading"));
            this.modalContent = res.message;
            if (res.isSuccess) {
               this.modalTitle = "Erfolg";
               this.showModal = true;
               return;
            }
         } catch (e) {
            window.dispatchEvent(new Event("endloading"));
            this.modalContent = "Leider ist etwas schief gelaufen. Bitte versuche es erneut.";
         }
         this.modalTitle = "Fehlschlag";
         this.modalButtons = [
            new ModalButton("Erneut versuchen", "btn", async () => {
               await sleep(500);
               this.openChangeCredsModal();
            }),
         ];
         this.showModal = true;
      },
      async deleteCreds() {
         if (!confirm("Bist du sicher, dass du deine Lernsax Anmeldedaten von Kepleraner löschen willst?")) return;
         window.dispatchEvent(new Event("startloading"));
         try {
            const res = await fetchAPI("/Lernsax/Credentials", { method: "DELETE" }).then((res) => res.json());
            this.modalTitle = "Fehlschlag";
            this.modalContent = res.message;
            if (res.isSuccess) {
               this.modalTitle = "Erfolg";
            }
         } catch (e) {
            this.modalTitle = "Fehlschlag";
            this.modalContent = "Leider ist etwas schief gelaufen. Bitte versuche es erneut.";
         }
         this.showModal = true;
         window.dispatchEvent(new Event("endloading"));
      },
      async deleteAll() {
         if (!confirm("Bist du sicher, dass du alle deine Lernsaxdaten von Kepleraner löschen willst?")) return;
         window.dispatchEvent(new Event("startloading"));
         try {
            const res = await fetchAPI("/Lernsax/All", { method: "DELETE" }).then((res) => res.json());
            this.modalTitle = "Fehlschlag";
            this.modalContent = res.message;
            if (res.isSuccess) {
               this.modalTitle = "Erfolg";
            }
         } catch (e) {
            this.modalTitle = "Fehlschlag";
            this.modalContent = "Leider ist etwas schief gelaufen. Bitte versuche es erneut.";
         }
         this.showModal = true;
         window.dispatchEvent(new Event("endloading"));
      },
   },
};
class ServiceMethod {
   static get subscribe() {
      return "Subscribe";
   }
   static get unsubscribe() {
      return "Unsubscribe";
   }
}
</script>
<style lang="scss" scoped>
.content {
   padding-bottom: 3vh;
}
</style>
<style lang="scss">
@import "@/styles/_variables.scss";
.lernsax-settings {
   .box {
      border: none !important;
   }
   .box,
   .setting {
      p {
         color: var(--font) !important;
      }
      background-color: var(--bg-medium) !important;
      border-color: var(--col-dark) !important;

      h2 {
         color: $accent !important;
      }
   }
}
</style>
