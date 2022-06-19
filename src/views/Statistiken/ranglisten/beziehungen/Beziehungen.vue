<!-- @format -->

<script setup>
import Ranking from "../../components/Ranking.vue";
import { SwitchModel } from "@/components/switch/Switch.vue";
import EntityType from "../../enums/EntityType.js";
</script>
<template>
   <div>
      <Ranking :_switches="switches" :getRanklist="getRanklist"></Ranking>
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
   },
};
</script>
<style lang="scss" scoped></style>
