<!-- @format -->

<script setup>
import Statistic, { SwitchModel, Dataset } from "../../components/Statistic.vue";
import EntityType from "../../enums/EntityType.js";
</script>
<template>
   <Statistic :getDatasets="getDatasets" :getLabels="getLabels" chartType="pie" :_switches="switches">
      <div class="compare-with-container">
         <h4>mit</h4>
         <select class="select" @input="(e) => changeCompareWith(e.target.value)">
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
   methods: {
      changeCompareWith(type) {
         this.otherType = type;
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
            const data = await this.fetchStat(`/Compare/${encodeURIComponent(selector.name)}/WithType/${encodeURIComponent(this.otherType)}`);
            for (const statistic of data) {
               const obj = {
                  name: statistic.otherName,
                  count: options.switches.attendance === "Fehlstunden" ? statistic.missed : statistic.substituted,
               };
               const idx = set.data.findIndex((el) => el.name === obj.name);
               if (idx === -1) {
                  if (obj.count === 0) continue;
                  set.data.push(obj);
                  this.labels.push(obj.name);
                  continue;
               }
               set.data[idx].count += obj.count;
            }
         }
         set.data = set.data.map((el) => el.count);
         set.newColor(set.data.length);
         set.borderColor = "#fff";
         return [set];
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
