<!-- @format -->

<script setup>
import Statistic, { Dataset, DatasetGroup } from "../../components/Statistic.vue";
import EntityType from "../../enums/EntityType.js";
import NameSelector from "../../components/NameSelector.vue";
import { SwitchModel } from "@/components/switch/Switch.vue";
</script>
<template>
   <Statistic
      :getDatasets="getDatasets"
      :getLabels="getLabels"
      chartType="bar"
      :getExplanation="getExplanation"
      :_switches="switches"
      :options="chartOptions"
   >
      <div class="compare-with-container">
         <h4>mit</h4>
         <NameSelector @change="(e) => changeCompareWith(e.target.value)" />
      </div>
   </Statistic>
</template>
<script>
export default {
   inject: ["fetchStat"],
   data() {
      return {
         switches: {
            // attendance: new SwitchModel(['Fehlstunden', 'Vertretungsstunden'], 'Fehlstunden'),
         },
         otherName: "Arb",
         labels: [],
         chartOptions: {
            scales: {
               x: {
                  stacked: true,
               },
               y: {
                  stacked: true,
               },
            },
            interaction: {
               intersect: false,
            },
         },
      };
   },
   methods: {
      changeCompareWith(name) {
         this.otherName = name;
      },
      getLabels(options) {
         return ["Fehlstunden", "Vertretungsstunden"];
      },
      async getDatasets(options) {
         options.switches.otherType = this.otherType;

         const sets = [];

         for (let selector of options.selectors) {
            if (typeof selector.name !== "string") continue;
            let data;
            try {
               data = await this.fetchStat(`/Compare/${encodeURIComponent(selector.name)}/WithName/${encodeURIComponent(this.otherName)}`, false);
            } catch {
               continue;
            }

            const set = new Dataset(data.name);

            set.data = [data.missed, data.substituted];

            set.newColor(1, sets.length, false);

            sets.push(set);
         }

         return sets;
      },
      async getExplanation(options, chart) {
         return `Das Diagramm zeigt die Schnittmenge an Fehl- und Vertretungsstunden zwischen ${
            options.selectors.length === 1 ? options.selectors[0].name : "den gewählten Namen"
         } und ${this.otherName}, also welche Beziehung die Namen bezüglich der Fehl- und Vertretungsstunden miteinander haben.`;
      },
   },
};
</script>
<style lang="scss" scoped>
@import "@/styles/_variables.scss";
@import "@/styles/components.scss";

.compare-with-container {
   display: flex;
   flex-direction: column;
   align-items: center;
   max-width: 300px;
   margin: auto;
}
</style>
