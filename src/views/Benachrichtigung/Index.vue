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
         const params = new URLSearchParams(window.location.search);
         const resetMail = params.get("reset-mail"),
            resetKey = params.get("reset-key");
         if (typeof resetMail !== "string" || typeof resetKey !== "string") return;

         let res;
         try {
            console.log();
            res = await fetchAPI(`/User/ResetHash/${resetMail}/${resetKey}`, { method: "POST" }).then((res) => res.json());
            if (res.isSuccess) {
               this.modalTitle = "Anmeldung erfolgreich";
               this.modalContent = "Anmeldung erfolgreich";
               return;
            }
            this.modalTitle = "Anmeldung fehlgeschlagen";
            this.modalContent = res.message;
         } catch (e) {
            console.log(e);
            this.modalTitle = "Anmeldung fehlgeschlagen";
            this.modalContent = "Leider ist etwas schief gelaufen";
         }
         this.showModal = true;
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
