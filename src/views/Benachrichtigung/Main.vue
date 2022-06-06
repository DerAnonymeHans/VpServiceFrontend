<!-- @format -->

<template>
   <main :class="mq.current">
      <div class="text-container">
         <button class="btn-focus" @click="scrollToForm()">Zum Abonnement</button>
         <article>
            Bist du nicht auch genervt jedesmal nach einem neuen Vertretungsplan zu schauen? Und dann musst du dich auch nochmal neu anmelden und suchst ewig nach den Zeilen die dich überhaupt betreffen... Doch dagegen gibt es ein Mittel! Indem du den VpMailservice abonnierst erhälst du mit maximal 10 minütiger Verzögerung Informationen über einen neuen Plan (nur wenn sich tatsächlich etwas für dich ändert!!), wenn vorhanden erhälst du sogar noch den vom Tag danach - und zwar auch nur die Daten die du auch brauchst.<br>
            Um das ganze noch weiter aufzuwerten, erhälst du im oberen Bild in der Email Informationen über das Wetter oder siehst andere eventabhängige Kunstwerke. Nicht zu vergessen ist außerdem das 'Kleine aber feine Extra' mit lustigen Sprüchen, interessanten Fakten oder weisen Zitaten.
         </article>
      </div>
      <img src="@/assets/mail-example-hand.png" alt="Email">
   </main>
</template>
<script>
export default {
   inject: ['mq'],
   methods: {
      scrollToForm(){
         window.scrollBy({top: 100000, left: 0, behavior: 'smooth'})
      }
   }
};
</script>
<style scoped lang="scss">
@import "@/styles/_variables.scss";
@import "@/styles/components.scss";
main{
   margin: auto;   
   margin-top: 3em;
   text-align: center;
   display: grid;
   grid-gap: 2em;

   .text-container{
      button{
         margin-bottom: 2em;
      }
      margin-bottom: 2em;
   }

   img{
      margin-top: auto;
   }
      

   &.desktop{
      width: 60vw;
      grid-template-columns: 1fr 1fr;
      
   }
   &.tablet{
      width: 80vw;
      grid-template-columns: 1fr;
      
   }
   &.mobile{
      width: 80vw;
      grid-template-columns: 1fr;
      
   }
}
</style>
