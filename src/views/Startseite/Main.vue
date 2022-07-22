<!-- @format -->

<template>
   <main :class="mq.current">
      <article :class="mq.current" class="introduction">
         Auf Kepleraner findest du Dinge rund um das Johannes-Kepler-Gymnasium Leipzig. Es sei aber angemerkt, dass es sich hierbei um keine
         offizielle Schulseite, sondern um ein Privatprojekt handelt.<br />Der wichtigste Bestandteil der Seite sind die Vertretungsplan Update
         Emails. Wenn du es auch Leid bist, ständig nach neuen Vertretungsplandaten zu schauen, dann abonniere unter
         <a href="/Benachrichtigung">Benachrichtigung</a> den Service und erhalte immer Plan Updates für deine Klassenstufe, sowie vieles mehr.<br />
         Unter dem Menüpunkt <a href="/Statistiken">Statistiken</a> findest du statistische Daten über alles mögliche. Von einfachen Daten wie den
         Gesamtzahlen an Fehl- und Vertretungsstunden für Lehrer/Fächer/Klassen/Klassenstufen/Kurse über die Daten nach Monaten, Wochentagen, Stunden
         und Schnittmengen von Daten zwischen bspw. einer Klasse und ihrer Lehrer bis hin zu errechnetem Ausfall als Anteil an den planmäßigen
         Gesamtstunden. Außerdem gibt es natürlich auch Rankings in denen die Top 10 aufgeführt werden.<br />Für Feedback und Möglichkeiten wie du
         dich selbst mit einbringen kannst gibt es unter <a href="/Mitmachen">Mitmachen</a> diverse Optionen.<br />
      </article>
      <div class="spaceship-container" v-if="mq.desktopPlus">
         <img class="spaceship-img" src="@/assets/spaceship.png" alt="Spaceship" />
      </div>
   </main>
</template>
<script>
export default {
   inject: ["mq"],
};
</script>
<style lang="scss">
@import "@/styles/_variables.scss";
@import "@/styles/_mixins.scss";

main {
   height: max-content;
   padding-bottom: 5vw;
   .introduction {
      @include box;
      margin: $margin auto;
      z-index: 2;
      position: relative;
   }
   &.ultrawide {
      .introduction {
         width: 40vw;
         margin-top: $margin * 6;
      }
      .spaceship-container {
         position: relative;
         margin: $margin * 8 0;

         .spaceship-img {
            position: absolute;
            z-index: 1;
            margin-left: 10vw;
            bottom: $margin;
         }
      }
   }
   &.desktop {
      .introduction {
         width: 50vw;
         margin-top: $margin * 6;
      }
      .spaceship-container {
         position: relative;
         margin: $margin * 8 0;

         .spaceship-img {
            position: absolute;
            z-index: 1;
            margin-left: $margin * 3;
            bottom: $margin;
         }
      }
   }
   &.tablet {
      .introduction {
         width: 80vw;
         margin-top: $margin * 4;
      }
   }
   &.mobile {
      .introduction {
         width: 80vw;
         margin-top: $margin * 3;
      }
   }
}
</style>
