<!-- @format -->

<script setup>
import Subscribe from "./Subscribe/Index.vue";
import Notification from "./Notification/Index.vue";
import { fetchAPI } from "@/App.vue";
import Modal, { Button } from "@/components/modal/Modal.vue";
</script>
<template>
   <div class="content">
      <div v-if="isLoggedIn === null"></div>
      <Notification v-else-if="isLoggedIn === true" />
      <Subscribe v-else-if="isLoggedIn === false" />
      <Modal :isOpen="showModal" @close="showModal = !showModal" :title="modalTitle" :content="modalContent" :buttons="[]" />
   </div>
</template>
<script>
export default {
   data() {
      return {
         isLoggedIn: null,
         modalTitle: "",
         modalContent: "",
         showModal: false,
      };
   },
   async mounted() {
      await this.handleHashReset();
      await this.checkIfLoggedIn();
   },
   methods: {
      async handleHashReset() {
         return new Promise(async (resolve, reject) => {
            const params = new URLSearchParams(window.location.search);
            const resetMail = params.get("reset-mail"),
               resetKey = params.get("reset-key");
            if (typeof resetMail !== "string" || typeof resetKey !== "string") return resolve();

            const form = new FormData();
            form.append("mail", resetMail);
            form.append("key", resetKey);
            let res;
            try {
               res = await fetchAPI(`/User/ResetHash`, { method: "POST", body: form }).then((res) => res.json());
               if (res.isSuccess) {
                  this.modalTitle = "Anmeldung erfolgreich";
                  this.modalContent = "Anmeldung erfolgreich";

                  params.delete("reset-mail");
                  params.delete("reset-key");
                  window.location.search = params.toString();
                  this.showModal = true;
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
      async checkIfLoggedIn() {
         try {
            let res = await fetchAPI("/User/IsAuthenticated").then((res) => res.json());
            if (res.body === true) {
               this.isLoggedIn = true;
               return;
            }
            this.isLoggedIn = false;
         } catch {
            this.isLoggedIn = false;
            return;
         }
      },
   },
};
</script>
<style lang="scss" scoped>
.content {
   margin-top: 9vh;
}
</style>
