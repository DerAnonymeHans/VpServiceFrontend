<!-- @format -->

<script setup>
import Statistic, { Dataset } from "../../components/Statistic.vue";
import EntityType from "../../enums/EntityType.js";
import { SwitchModel } from "@/components/switch/Switch.vue";
</script>
<template>
   <Statistic :getDatasets="getDatasets" :getLabels="getLabels" :getExplanation="getExplanation" chartType="pie" :_switches="switches">
      <div class="compare-with-container">
         <h4>mit</h4>
         <select class="select" @input="(e) => changeType(e.target.value)" :value="otherType">
            <option v-for="key in Object.keys(EntityType)" :key="key" :value="EntityType[key].idx">{{ EntityType[key].name }}</option>
         </select>
      </div>
   </Statistic>
</template>
<script>
export default {
   inject: ["fetchStat"],
   data() {
      return {
         switches: {
            attendance: new SwitchModel(["Fehlstunden", "Vertretungsstunden"], "Fehlstunden"),
         },
         otherType: "0",
         labels: [],
      };
   },
   mounted() {
      this.changeType(sessionStorage.getItem("cached-type-selector"));
   },
   methods: {
      changeType(newType) {
         if (parseInt(newType) != newType) return;
         this.otherType = newType;
         sessionStorage.setItem("cached-type-selector", newType);
      },
      getLabels(options) {
         return this.labels;
      },
      async getDatasets(options) {
         options.switches.otherType = this.otherType;

         this.labels = [];
         const set = new Dataset(options.switches.attendance, options.selectors.length, 0);

         for (let selector of options.selectors) {
            if (typeof selector.name !== "string") continue;
            let data;
            try {
               data = await this.fetchStat(`/Compare/${encodeURIComponent(selector.name)}/WithType/${encodeURIComponent(this.otherType)}`, false);
            } catch {
               continue;
            }
            for (const statistic of data) {
               const obj = {
                  name: statistic.otherName,
                  count: options.switches.attendance === "Fehlstunden" ? statistic.missed : statistic.substituted,
               };
               const idx = set.data.findIndex((el) => el.name === obj.name);
               if (idx === -1) {
                  set.data.push(obj);
                  this.labels.push(obj.name);
                  continue;
               }
               set.data[idx].count += obj.count;
            }
         }
         for (let i = 0; i < set.data.length; i++) {
            if (set.data[i].count <= 0) {
               this.labels.splice(i, 1);
               set.data.splice(i, 1);
               i--;
            }
         }
         set.data = set.data.map((el) => el.count);
         set.newColor(set.data.length);
         set.borderColor = "#fff";
         return [set];
      },
      async getExplanation(options, chart) {
         return `Das Diagramm zeigt wie sich die ${options.switches.attendance} ${
            options.selectors.length === 1 ? "von " + options.selectors[0].name : "der Namen"
         } auf die verschiedenen ${EntityType[Object.keys(EntityType)[parseInt(this.otherType)]].name} aufteilen.`;
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
