
<template>
   <Modal :isOpen="showModal" @close="showModal=!showModal" :title="modalTitle" :content="modalContent" :buttons="[]"/> 
   <footer>
      <a @click="openModal('Datenschutz')">Datenschutz</a>
      <a @click="openModal('Kontakt')">Kontakt</a>
      <a @click="openModal('AGB')">AGB</a>
   </footer>
</template>
<script>
import { ref } from "vue";
import Modal, { Button } from "@/components/modal/Modal.vue";
export default {
   component: {
      Modal
   },
   setup() {
      const showModal = ref(false);
      return { showModal }
   },
   methods: {
      openModal(type){
         this.modalTitle = type;
         switch(type){
            case "Datenschutz":
               this.modalContent = "Auf Vertrauensbasis"
               break;
            case "Kontakt":
               this.modalContent = "Bitte nicht. <br><br> Aber wenn es unbedingt sein muss dann eine Email an 'vp.mailservice.kepler@gmail.com'. Antwort könnte eine Weile dauern"
               break;
            case "AGB":
               this.modalContent = "Was ist das überhaupt"
               break;
         }
         this.showModal = true;
      }
   }
}
</script>
<style lang="scss">
@import "@/styles/_variables.scss";
footer{
   background-color: $bg-dark;
   width: 100%;
   text-align: center;
   > a {
      margin: 0 $margin;
      cursor: pointer;
   }
}
</style>