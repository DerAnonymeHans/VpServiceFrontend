<!-- @format -->
<script setup>
import { sleep } from "@/App.vue";
</script>
<template>
   <main :class="mq.current">
      <div class="text-container">
         <div>
            <button class="btn-focus" @click="scrollToForm()">Zum Abonnement</button>
            <button class="btn" type="button" @click="$emit('requestHashReset')">Ich bin bereits angemeldet</button>
         </div>
         <article>
            Bist du nicht auch genervt jedesmal nach einem neuen Vertretungsplan zu schauen? Und dann musst du dich auch nochmal neu anmelden und
            suchst ewig nach den Zeilen die dich überhaupt betreffen... Doch dagegen gibt es ein Mittel! Indem du den Kepleraner VP Service abonnierst
            erhälst du mit maximal 10 minütiger Verzögerung Informationen über einen neuen Plan (nur wenn sich tatsächlich etwas für dich ändert!!),
            wenn vorhanden erhälst du sogar noch den vom Tag danach - und zwar auch nur die Daten die du auch brauchst.<br />
            Um das Ganze noch weiter aufzuwerten, erhälst du im oberen Bild in der Email Informationen über das Wetter oder siehst andere
            eventabhängige Kunstwerke. Nicht zu vergessen ist außerdem das 'Kleine aber feine Extra' mit lustigen Sprüchen, interessanten Fakten oder
            weisen Zitaten.<br />
            Du hast dabei die Wahl zwischen Emails, wie auf dem Bild zu sehen, oder Push Benachrichtigungen (nur für Android) die dich auf eine
            Webseite ähnlich des Email Bildes führen.
         </article>
      </div>
      <abbr title="Quelle: https://pngimg.com/image/49158 (Bild bearbeitet - Email Screenshot eingefügt)"
         ><img src="@/assets/mail-example-hand.png" alt="Email"
      /></abbr>
   </main>
</template>
<script>
export default {
   inject: ["mq"],
   async mounted() {
      const params = new URLSearchParams(window.location.search);
      if (params.get("scroll") === "true") {
         await sleep(500);
         this.scrollToForm();
         params.delete("scroll");
         window.history.pushState("", "", window.location.origin + window.location.pathname + params.toString());
      }
   },
   methods: {
      scrollToForm() {
         window.scrollBy({ top: 1000000, left: 0, behavior: "smooth" });
      },
   },
};
</script>
<style scoped lang="scss">
@import "@/styles/_variables.scss";
@import "@/styles/_mixins.scss";
@import "@/styles/components.scss";
main {
   margin: auto;
   margin-top: 3em;
   padding-bottom: 0 !important;
   text-align: center;
   grid-gap: 2em;
   justify-content: center;

   .text-container {
      width: 100%;
      margin-bottom: 2em;

      > div {
         display: flex;
         flex-direction: column;
         align-items: center;
      }

      button {
         margin-bottom: 2em;
      }

      article {
         @include box;
      }
   }

   img {
      width: 100%;
      margin-top: auto;
   }

   &.ultrawide {
      display: grid;
      width: 50vw;
      grid-template-columns: 1fr 1fr;

      img {
         max-width: 20vw;
      }
   }
   &.desktop {
      display: grid;
      width: 60vw;
      grid-template-columns: 1fr 1fr;
   }
   &.tablet {
      width: 80vw;
      grid-template-columns: 1fr;
   }
   &.mobile {
      width: 90vw;
      grid-template-columns: 1fr;
   }
}
</style>
