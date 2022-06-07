<script setup>
import { ref, reactive } from "vue";
import Modal, { Button } from "@/components/modal/Modal.vue";
const showModal = ref(false);

</script>
<template>
   <Modal :isOpen="showModal" @close="showModal=!showModal" :title="modalTitle" :content="modalContent" :buttons="[]"></Modal> 
   <footer>
      <a @click="openModal('Datenschutz')">Datenschutz</a>
      <a @click="openModal('Kontakt')">Kontakt</a>
      <a @click="openModal('AGB')">AGB</a>
      <div>{{showModal}}</div>
   </footer>
</template>

<script>

export default {
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
      user-select: none;
   }
}
</style>