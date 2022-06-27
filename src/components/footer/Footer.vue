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
      <a @click="openModal('Impressum')">Impressum</a>
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
               this.modalContent = `Auf Vertrauensbasis ;)<br><br>Keine der angegebenen Daten werden veröffentlicht oder an Dritte weitergegeben. Die gesammelten Statistiken werden auschließlich auf dieser Seite und passwortgeschützt publiziert.`;
               break;
            case "Impressum":
               this.modalContent = `
               <div class='impressum'>
                  <p>Angaben gemäß § 5 TMG</p>
                  <p>
                     Pascal Setzer<br>
                     Lausner Weg 10a<br>
                     04207 Leipzig<br></p>
                  <p>
                     <strong>Vertreten durch: </strong><br>
                     Pascal Setzer<br>
                  </p>
                  <p>
                     <strong>Kontakt:</strong> <br>
                     Telefon: 0176 45764406<br>
                     E-Mail: <a href='mailto:vp.mailservice.kepler@gmail.com'>vp.mailservice.kepler@gmail.com</a></br>
                  </p>
                  <p>
                     <strong>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:</strong><br>
                     Pascal Setzer <br> 
                     Lausner Weg 10a<br> 
                     04207 Leipzig <br>
                  </p>
                  <p>
                     <strong>Haftungsausschluss: </strong><br><br>

                     <strong>Haftung für Inhalte</strong><br><br>
                     Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.<br><br>

                     <strong>Haftung für Links</strong><br><br>
                     Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.<br><br><strong>Urheberrecht</strong><br><br>
                     Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.<br><br>

                     <strong>Datenschutz</strong><br><br>
                     Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder eMail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben. <br>
                     Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich. <br>
                     Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten durch Dritte zur Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit ausdrücklich widersprochen. Die Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung von Werbeinformationen, etwa durch Spam-Mails, vor.<br>
                  </p><br> `;
               break;
            case "AGB":
               this.modalContent = `Bei der Seite handelt es sich um ein nicht-kommerzielles Privatprojekt.<br>Der Besitzer der Seite übernimmt keine Haftung auf Schäden verursacht durch die Emailbenachtichtigung. Jegliche Verantwortung liegt beim Endnutzer. <br>Es gibt keine Gewähr auf die Richtigkeit der statistischen Daten - von einer Fehlermarge muss ausgegangen werden. Hinter den angegebenen Daten findet sich keine Wertung, es handelt sich ausschließlich um eine objektive und neutrale Darstellung. Der Nutzer verpflichtet sich die Daten nicht schulextern zu veröffentlichen bzw. die Daten in irgendeiner anderen Hinsicht zu missbrauchen. Jegliche Veröffentlichung der Daten darf nur nach Zustimmung des Betreibers der Seite geschehen.`;
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
