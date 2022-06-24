<!-- @format -->

<script setup>
import Ranking, { sortByToSentence } from "../../components/Ranking.vue";
import { SwitchModel } from "@/components/switch/Switch.vue";
import EntityType from "../../enums/EntityType.js";
</script>
<template>
   <div>
      <Ranking
         :_switches="switches"
         :getRanklist="getRanklist"
         :getExplanation="getExplanation"
         :disableAutoSwitches="true"
         :disablePodest="true"
      ></Ranking>
   </div>
</template>
<script>
export default {
   inject: ["fetchStat"],
   data() {
      return {
         switches: {
            sortBy: new SwitchModel(["Top-Fehl", "Top-Ver"], "Top-Fehl"),
         },
      };
   },
   methods: {
      async getRanklist(options) {
         const res = await this.fetchStat(`/SortCountsOf/Extras/${options.switches.sortBy}`);
         const data = [];
         for (let item of res) {
            data.push({ Name: item.key, Anzahl: item.count });
         }
         return data;
      },
      getExplanation(options) {
         let sortBy = sortByToSentence(options.switches.sortBy);
         return `Die Statistik zeigt mit welchen Worten die ${sortBy} beschrieben wurden.`;
      },
   },
};
</script>
<style lang="scss" scoped></style>
