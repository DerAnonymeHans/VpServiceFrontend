<!-- @format -->

<script setup>
import Statistic, { Dataset } from "../../components/Statistic.vue";
import { SwitchModel } from "@/components/switch/Switch.vue";
import EntityType from "@/views/Statistiken/enums/EntityType.js";
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
         averages: [],
      };
   },
   methods: {
      getLabels(options) {
         const sumData = options.switches.sumMode === "addieren";
         if (sumData) return [options.selectors.map((selector) => selector.name).join(", ")];
         return options.selectors.map((selector) => selector.name);
      },
      async getDatasets(options) {
         const sumData = options.switches.sumMode === "addieren";
         const missed = new Dataset("Fehlstunden", options.selectors.length);
         const subst = new Dataset("Vertretungsstunden", options.selectors.length);
         for (let selector of options.selectors) {
            if (typeof selector.name !== "string") continue;
            const data = await this.fetchStat(`/RelativeOf/${encodeURIComponent(selector.name)}/InComparison`);
            missed.data.push((data.missed * 100).toFixed(2));
            subst.data.push((data.substituted * 100).toFixed(2));

            if (this.averages.findIndex((obj) => obj.type.key === data.type) === -1)
               this.averages.push({ type: EntityType[data.type], missed: data.missedAverage, subst: data.substitutedAverage });
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
         console.log(options);
         return `Das Diagramm zeigt die ${attendance} verglichen mit der durchschnittlichen Anzahl an ${attendance} des Typs - die Angaben sind also in Prozent. Das bedeutet: Es werden die relativen ${attendance} (siehe Statistik 'relativ') genommen und diese mit der durchschnitlichen relativen Zahl an ${attendance} des Typs (Lehrer, Klassen, Kurse, ...) ins Verhältnis genommen. Hohe Werte bedeuten also, das der Name verglichen mit seinem Typ sehr viel ${attendance} hat.
         <br>
         Bsp.: Lehrer X hat 40% mehr Fehlstunden als der Durchschnittslehrer.
         ${
            options.switches.sumMode === "addieren"
               ? `<br>Die Daten aller ausgewählten Namen werden hierbei relativ addiert (es wird das arithmetische Mittel der Prozente gebildet), so dass die Summe ihrer ${attendance} sichtbar ist. Diese Option wird nur empfohlen insofern alle ausgewählten Namen dem selben Typ angehören.`
               : ""
         }
         ${(() => {
            let html = '<br><br><table style="text-align:center"><tr><th>Name</th><th>Fehlstunden in %</th><th>Vertretungsstunden in %</th>';
            for (const avg of this.averages) {
               html += `<tr><td>${avg.type.key === "KEPLER" ? "Schule" : avg.type.name}</td><td>${(avg.missed * 100).toFixed(2)}</td><td>${(
                  avg.subst * 100
               ).toFixed(2)}</td>`;
            }
            return html + "</table>";
         })()}
         ${
            options.selectors.findIndex((selector) => selector.type.key === "KEPLER") !== -1
               ? `<br><br>Die ${attendance} von Schule werden dabei mit deutschlandweiten Daten einer Umfrage der Zeit in Zusammenarbeit mit Statista verglichen (<a href="https://www.zeit.de/gesellschaft/schule/2017-10/unterrichtsausfall-schule-bildung-studie-eltern">Artikel</a>)`
               : ""
         }
         `;
      },
   },
};
</script>
