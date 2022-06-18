<!-- @format -->

<script setup>
import Statistic, { SwitchModel, Dataset } from "../../components/Statistic.vue";
</script>
<template>
   <Statistic :getDatasets="getDatasets" :getLabels="getLabels" :getExplanation="getExplanation" chartType="bar" :_switches="switches" />
</template>
<script>
export default {
   inject: ["fetchStat"],
   data() {
      return {
         switches: {
            attendance: new SwitchModel(["Fehlstunden", "Vertretungsstunden", "beides"], "Fehlstunden"),
            sumMode: new SwitchModel(["getrennt", "addieren"], "getrennt"),
         },
         expectedHours: [],
      };
   },
   methods: {
      getLabels(options) {
         const sumData = options.switches.sumMode === "addieren";
         if (sumData) return [options.selectors.map((selector) => selector.name).join(", ")];
         return options.selectors.map((selector) => selector.name);
      },
      async getDatasets(options) {
         this.expectedHours = [];
         const sumData = options.switches.sumMode === "addieren";
         const missed = new Dataset("Fehlstunden", options.selectors.length);
         const subst = new Dataset("Vertretungsstunden", options.selectors.length);
         for (let selector of options.selectors) {
            if (typeof selector.name !== "string") continue;
            const data = await this.fetchStat(`/RelativeOf/${encodeURIComponent(selector.name)}`);
            // convert to percentage
            missed.data.push(data.missed * 100);
            subst.data.push(data.substituted * 100);

            this.expectedHours.push(data.hundredPercent);
         }
         if (sumData) {
            missed.sumData("rel");
            subst.sumData("rel");
         }
         if (options.switches.attendance === "Fehlstunden") return [missed];
         if (options.switches.attendance === "Vertretungsstunden") return [subst];
         return [missed, subst];
      },
      async getExplanation(options, chart) {
         const attendance = options.switches.attendance === "beides" ? "Fehl- und Vertretungsstunden" : options.switches.attendance;
         const recordedDays = await this.fetchStat(`/RecordedDays/Count`);
         return `Das Diagramm zeigt die relative Verteilung der ${attendance} - die Angaben sind also in Prozent. Das bedeutet: Es wird der erwartete wöchentliche Stundensatz  genommen, dieser auf die Anzahl der beobachteten Tage hochgerechnet (siehe unten) und anschließend mit den ${attendance} ins Verhältnis gesetzt. Bsp: 12% Fehlstunden bedeuten, das von der erwarteten Zahl an Stunden 12% fehlen. 
         ${
            options.switches.sumMode === "addieren"
               ? `Die Daten aller ausgewählten Namen werden hierbei relativ addiert (es wird das arithmetische Mittel der Prozente gebildet), so dass die Summe ihrer ${attendance} sichtbar ist.`
               : ""
         }
         <br />
         <br />
         ${(() => {
            let html = "<table><tr><th>Name</th><th>Wochenstunden</th><th>Gesamtstunden</th>";
            for (let i = 0; i < options.selectors.length; i++) {
               html += `<tr><td>${options.selectors[i].name}</td><td>${Math.round((this.expectedHours[i] / recordedDays) * 5)}</td><td>${Math.round(
                  this.expectedHours[i]
               )} </td></tr>`;
            }
            return html + "</table>";
         })()}
         `;
      },
   },
};
</script>
