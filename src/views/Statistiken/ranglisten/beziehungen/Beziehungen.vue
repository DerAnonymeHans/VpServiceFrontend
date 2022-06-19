<!-- @format -->

<script setup>
import Ranking, { sortByToSentence } from "../../components/Ranking.vue";
import { SwitchModel } from "@/components/switch/Switch.vue";
import EntityType from "../../enums/EntityType.js";
</script>
<template>
   <div>
      <Ranking :_switches="switches" :getRanklist="getRanklist" :getExplanation="getExplanation"></Ranking>
   </div>
</template>
<script>
export default {
   inject: ["fetchStat"],
   data() {
      return {
         switches: {},
      };
   },
   methods: {
      async getRanklist(options) {
         const res = await this.fetchStat(`/SortRelations/By/${options.switches.sortBy}`);
         const key = options.switches.sortBy.slice(1) === "m" ? "missed" : "substituted";
         const data = [];
         for (let item of res) {
            data.push({ Name: `${item.name} - ${item.otherName}`, Stundenzahl: item[key] });
         }
         return data;
      },
      getExplanation(options) {
         const type = EntityType[Object.keys(EntityType)[this.includeWho]];
         let sortBy = sortByToSentence(options.switches.sortBy);
         return `Die Statistik zeigt die Beziehungen zwischen zwei Namen sortiert nach ${sortBy}.`;
      },
   },
};
</script>
<style lang="scss" scoped></style>
