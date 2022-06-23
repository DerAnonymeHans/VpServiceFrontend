<!-- @format -->
<script setup>
import Section from "./Section.vue";
</script>
<template>
   <div class="section-container" :class="mq.current">
      <Section svg="quotes" :content="fehlVerContent" />
      <Section svg="statCreation" title="Statistikerstellung" :content="statExtractionContent" />
      <Section svg="thunder" title="Differenzen" :content="diferenzenContent" />
   </div>
</template>
<script>
export default {
   inject: ["mq"],
   data() {
      return {
         fehlVerContent: `<b>Fehlstunden:</b> Anzahl der Stunden die der <abbr title="Zusammenfassung von Lehrer, Klassen, Klassenstufen, Fächern, ...">Name</abbr> weniger als planmäßig durchgeführt hat. Wenn Lehrer oder Fächer häufiger vertreten als sie ausfallen, kann die Fehlstundenzahl ins negative rutschen, da der Lehrer oder das Fach dann mehr Stunden als planmäßig durchführt.
         <br><br>
         <b>Vertretungsstunden:</b> Anzahl der Stunden die der Name für einen anderen Namen nicht-planmäßig übernommen hat.
         `,
         statExtractionContent: `Über den Tag werden, gepaart mit dem Benachrichtigungsservice, die Vertretungsplandaten gesammelt und veraltete Vertretungsplandaten des Tages überschrieben. Jeden Tag zwischen 15 und 17 Uhr (um diese Uhrzeit wird der Vertretungsplan des Tages wohl hoffentlich nicht mehr geändert) werden die Statistiken mit Hilfe dieser Daten aktualisiert.
         <br>
         <br>
         Euphemismen wie <i>Aufgaben erteilt</i> oder <i>eigenverantwortliches Arbeiten</i> werden bei der Statistikerstellung ignoriert und stattdessen einfach als Ausfall gewertet.
         `,
         diferenzenContent: `Vergleicht man bspw. die Summe der Fehl-/Vertretungsstunden aller Klassen einer Klassenstufe mit den Daten der Klassenstufe (z.B. 5a+5b+5c+5d mit 5) so stellt man mit hoher Wahrscheinlichkeit Unterschiede fest. Deren Ursache findet sich in klassenübergreifendem Unterricht. Dazu ein Beispiel: <br> Eine Lateinklasse wird aus Schülern aller siebten Klassen gebildet. Dieser Unterricht fällt eines Tages aus. Im Vertretungsplan findet sich deshalb folgende Schreibweise für die Klassen: <i>7a-7d</i>. Der Ausfall wird nun jeder der vier Klassen als Lateinausfall zugeschrieben, jedoch nur einmal der Klassenstufe. Dadurch beträgt die Summe des Lateinausfalls der Klassen das Vierfache des Lateinausfalls der Klassenstufe.`,
      };
   },
};
</script>
<style lang="scss" scoped>
@import "@/styles/_variables.scss";
.section-container {
   width: 100%;
   margin: auto;

   > * {
      margin: $margin * 3 0;
   }
}
</style>
