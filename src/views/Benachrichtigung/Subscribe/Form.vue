<!-- @format -->

<script setup>
import { ref } from "vue";
import Input from "@/components/input/Input.vue";
import Switch, { SwitchModel } from "@/components/switch/Switch.vue";
import Modal, { Button } from "@/components/modal/Modal.vue";
import { fetchAPI, sleep } from "@/App.vue";
import KeyLabelPair from "@/structs/KeyLabelPair.js";
</script>
<template>
   <div class="form-container" :class="mq.current">
      <iframe id="dummy-frame" frameborder="0"></iframe>
      <form id="subscribe-form" @submit="submit" target="dummy-frame">
         <Input type="text" label="Anrede/Name" name="name" />
         <Input type="text" label="Email" name="mail" />
         <Input type="number" label="Klassenstufe" name="grade" :min="5" :max="12" />
         <div class="center" v-if="os != 'mac'">
            <Switch :options="switchModel.options" :default="switchModel.value" @switch="switchNotifyMode" />
         </div>
         <div class="agb">
            <input type="checkbox" id="accept-agb" name="accept-agb" />
            <label for="accept-agb">Ich akzeptiere die AGB</label>
         </div>
         <button class="btn-focus" type="submit">Los gehts!</button>
         <div class="flex auth-buttons">
            <button class="btn-border-invert" type="button" @click="requestHashResetModal()">Ich bin bereits angemeldet</button>
            <button class="btn-border-invert" type="button" @click="enterKeyModal()">Code eingeben</button>
         </div>
      </form>
      <Modal :isOpen="showModal" @close="showModal = !showModal" :title="modalTitle" :content="modalContent" :buttons="modalButtons">
         <Input v-if="modalMode === 'hashReset'" :isInvert="true" label="Email Addresse" :id="'hashreset-mail-input'"></Input>
         <Input v-if="modalMode === 'enterKey'" :isInvert="true" label="Code" :id="'hashreset-key-input'"></Input>
      </Modal>
   </div>
</template>
<script>
export default {
   inject: ["mq", "os"],
   component: {
      Input,
   },
   data() {
      return {
         modalTitle: "",
         modalContent: "",
         modalButtons: [],
         showModal: false,
         modalMode: "",
         notifyMode: "pwa",

         switchModel: new SwitchModel([new KeyLabelPair("pwa", "Per App"), new KeyLabelPair("mail", "Per Mail")], "pwa"),
      };
   },
   mounted() {
      const params = new URLSearchParams(window.location.search);
      if (params.get("codeModal") === "true") this.enterKeyModal();
   },
   methods: {
      submit(e) {
         e.preventDefault();
         const formdata = new FormData(e.target);
         formdata.append("notify-mode", this.notifyMode);
         fetchAPI("/Subscribe", { method: "POST", body: formdata })
            .then((res) => res.json())
            .then((res) => {
               if (res.isSuccess) {
                  this.modalTitle = "Erfolg";
                  e.target.reset();
                  this.$emit("newUser");
               } else this.modalTitle = "Fehlschlag";

               this.modalContent =
                  res.message +
                  (this.notifyMode === "pwa"
                     ? " Wenn die Anfrage akzeptiert wird, wirst du eine Email erhalten."
                     : " Sobald die Anfrage akzeptiert wird, erhälst auch du die Emails.");
               this.modalButtons = [];
               this.showModal = true;
            });
      },
      switchNotifyMode(to) {
         this.notifyMode = to;
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
               await sleep(1000);
               this.showModal = false;
               await sleep(500);
               this.enterKeyModal();
               return;
            }
         } catch (e) {
            this.modalContent = "Leider ist etwas schief gelaufen.";
            this.modalButtons = [
               new Button("Erneut versuchen", "btn", () => {
                  (async () => {
                     await sleep(300);
                     this.requestHashResetModal();
                  })();
               }),
            ];
         }
         this.modalTitle = "Fehlschlag";
         this.showModal = true;
      },
      enterKeyModal() {
         this.modalTitle = "Code eingeben";
         this.modalContent = `Wenn du eine Anmeldungsemail mit einem Code erhalten hast, bist du hier richtig. Gib diesen Code einfach hier ein und du bist angemeldet.<br><br>
         `;
         this.modalButtons = [
            new Button("Anmelden", "btn", () => {
               (async () => {
                  await sleep(300);
                  this.keyEntered();
               })();
            }),
         ];
         this.modalMode = "enterKey";
         this.showModal = true;
      },
      async keyEntered() {
         const key = document.getElementById("hashreset-key-input").value;
         this.$emit("keyEntered", key);
      },
   },
};
</script>
<style lang="scss">
@import "@/styles/_variables.scss";

.form-container {
   width: 100%;
   background-color: $col-dark;

   form {
      display: flex;
      flex-direction: column;
      margin: auto;
      padding: $padding * 2 0;

      > * {
         margin: $margin * 0.5 0;
      }
      button {
         width: 50%;
         margin: $margin auto;
      }

      .agb {
         color: white;
      }

      .auth-buttons {
         margin: auto;
         > * {
            margin: 0 $margin * 0.5;
         }
      }
   }

   &.ultrawide {
      form {
         width: 20vw;

         .auth-buttons {
            width: 50%;
         }
      }
   }
   &.desktop {
      form {
         width: 30vw;

         .auth-buttons {
            width: 60%;
         }
      }
   }
   &.tablet {
      form {
         width: 60vw;

         .auth-buttons {
            width: 80%;
         }
      }
   }
   &.mobile {
      form {
         width: 80vw;

         .auth-buttons {
            width: 100%;
         }
      }
   }
}

#dummy-frame {
   display: none;
   opacity: 0;
}
</style>
