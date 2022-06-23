<!-- @format -->

<script setup>
import { ref, reactive } from "vue";
import Modal, { Button } from "@/components/modal/Modal.vue";
// const showModal = ref(false);
</script>
<template>
   <Modal :isOpen="showModal" @close="showModal = !showModal" :title="modalTitle" :content="modalContent" :buttons="[]"></Modal>
   <footer>
      <a @click="openModal('Datenschutz')">Datenschutz</a>
      <a @click="openModal('Kontakt')">Kontakt</a>
      <a @click="openModal('AGB')">AGB</a>
   </footer>
</template>

<script>
export default {
   data() {
      return {
         showModal: false,
      };
   },
   methods: {
      openModal(type) {
         this.modalTitle = type;
         switch (type) {
            case "Datenschutz":
               this.modalContent = "Auf Vertrauensbasis ;)";
               break;
            case "Kontakt":
               this.modalContent = "Wenn es unbedingt sein muss dann eine Email an 'vp.mailservice.kepler@gmail.com'";
               break;
            case "AGB":
               this.modalContent = `Keine`;
               break;
         }
         this.showModal = true;
      },
   },
};
</script>
<style lang="scss">
@import "@/styles/_variables.scss";
footer {
   background-color: $col-dark;
   width: 100%;
   text-align: center;
   position: absolute;
   bottom: 0;
   > a {
      margin: 0 $margin;
      cursor: pointer;
      user-select: none;
   }
}
</style>
