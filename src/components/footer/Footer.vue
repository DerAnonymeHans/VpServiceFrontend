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
               this.modalContent =
                  "Bitte nicht.<br><br>Falls wirklich dringend:<br>Email: 'vp.mailservice.kepler@gmail.com'<br>bzw. unter 'Mitmachen'<br>Betreiber: Pascal Setzer (Klasse 11)";
               break;
            case "AGB":
               this.modalContent = `Bei der Seite handelt es sich um ein nicht-kommerzielles Privatprojekt.<br>Der Besitzer der Seite übernimmt keine Haftung auf Schäden verursacht durch die Emailbenachtichtigung. Jegliche Verantwortung liegt beim Endnutzer. <br>Es gibt keine Gewähr auf die Richtigkeit der statistischen Daten - von einer Fehlermarge muss ausgegangen werden. Hinter den angegebenen Daten findet sich keine Wertung, es handelt sich ausschließlich um eine objektive und neutrale Darstellung. Der Nutzer verpflichtet sich die Daten nicht schulextern zu veröffentlichen bzw. die Daten in irgendeiner anderen Hinsicht zu missbrauchen.`;
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
