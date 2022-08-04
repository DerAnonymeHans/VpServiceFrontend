<!-- @format -->

<script setup>
import { ref } from "vue";
import Input from "@/components/input/Input.vue";
import Modal, { Button } from "@/components/modal/Modal.vue";
import { fetchAPI, sleep } from "@/App.vue";
</script>
<template>
   <div class="form-container" :class="mq.current">
      <iframe id="dummy-frame" frameborder="0"></iframe>
      <form id="subscribe-form" @submit="submit" target="dummy-frame">
         <Input type="text" label="Anrede/Name" name="name" />
         <Input type="text" label="Email" name="mail" />
         <Input type="number" label="Klassenstufe" name="grade" :min="5" :max="12" />
         <div class="agb">
            <input type="checkbox" id="accept-agb" name="accept-agb" />
            <label for="accept-agb">Ich akzeptiere die AGB</label>
         </div>
         <button class="btn-focus" type="submit">Los gehts!</button>
         <button class="btn-border-invert" type="button" @click="resetHashModal()">Ich bin bereits angemeldet - neu anmelden</button>
      </form>
      <Modal :isOpen="showModal" @close="showModal = !showModal" :title="modalTitle" :content="modalContent" :buttons="modalButtons">
         <Input v-if="isHashResetModal" :isInvert="true" label="Email Addresse" :id="'hashreset-mail-input'"></Input>
      </Modal>
   </div>
</template>
<script>
export default {
   inject: ["mq"],
   component: {
      Input,
   },
   data() {
      return {
         modalTitle: "",
         modalContent: "",
         modalButtons: [],
         showModal: false,
         isHashResetModal: false,
      };
   },
   methods: {
      submit(e) {
         e.preventDefault();
         const formdata = new FormData(e.target);
         fetchAPI("/Subscribe", { method: "POST", body: formdata })
            .then((res) => res.json())
            .then((res) => {
               if (res.isSuccess) {
                  this.modalTitle = "Erfolg";
                  e.target.reset();
                  this.$emit("newUser");
               } else this.modalTitle = "Fehlschlag";

               this.modalContent = res.message;
               this.modalButtons = [];
               this.showModal = true;
            });
      },
      resetHashModal() {
         this.modalTitle = "Neu anmelden";
         this.modalContent = `Wenn du dich bereits einmal angemeldet hast und nun auf die Vertretungsplandaten zugreifen möchtest bist du hier richtig. Wenn du auf den Knopf drückst, erhälst du eine Email, mit einem Link, der dich wieder anmeldet.<br><br>
         `;
         this.modalButtons = [
            new Button("Email senden", "btn", () => {
               (async () => {
                  await sleep(300);
                  this.resetHash();
               })();
            }),
         ];
         this.isHashResetModal = true;
         this.showModal = true;
      },
      async resetHash() {
         const mail = document.getElementById("hashreset-mail-input").value;
         this.isHashResetModal = false;
         await sleep(0);
         this.modalTitle = "Ergebnis";
         this.modalButtons = [];
         let res;
         let form = new FormData();
         form.append("mail", mail);
         try {
            res = await fetchAPI(`/User/RequestHashReset`, { method: "POST", body: form }).then((res) => res.json());
            this.modalContent = res.message;
         } catch (e) {
            console.log(e);
            this.modalContent = "Leider ist etwas schief gelaufen.";
            this.modalButtons = [
               new Button("Erneut versuchen", "btn", () => {
                  (async () => {
                     await sleep(300);
                     this.resetHashModal();
                  })();
               }),
            ];
         }
         this.showModal = true;
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
   }

   &.ultrawide {
      form {
         width: 20vw;
      }
   }
   &.desktop {
      form {
         width: 30vw;
      }
   }
   &.tablet {
      form {
         width: 60vw;
      }
   }
   &.mobile {
      form {
         width: 80vw;
      }
   }
}

#dummy-frame {
   display: none;
   opacity: 0;
}
</style>
