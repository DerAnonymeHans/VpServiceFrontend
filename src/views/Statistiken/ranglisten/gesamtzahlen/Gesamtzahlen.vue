<!-- @format -->

<script setup>
import Ranking, { sortByToSentence } from "../../components/Ranking.vue";
import { SwitchModel } from "@/components/switch/Switch.vue";
import EntityType from "../../enums/EntityType.js";
</script>
<template>
   <div>
      <Ranking :_switches="switches" :getRanklist="getRanklist" :getExplanation="getExplanation">
         <div class="flex">
            <select class="select" @input="(e) => changeType(e.target.value)" :value="includeWho">
               <option v-for="key in Object.keys(EntityType)" :key="key" :value="EntityType[key].idx">{{ EntityType[key].name }}</option>
            </select>
         </div>
      </Ranking>
   </div>
</template>
<script>
export default {
   inject: ["fetchStat"],
   data() {
      return {
         switches: {},
         includeWho: "0",
      };
   },
   mounted() {
      this.changeType(sessionStorage.getItem("cached-type-selector"));
   },
   methods: {
      async getRanklist(options) {
         const res = await this.fetchStat(`/SortCountsOf/${this.includeWho}/By/${options.switches.sortBy}`);
         const key = options.switches.sortBy.slice(1) === "m" ? "missed" : "substituted";
         const data = [];
         for (let item of res) {
            data.push({ Name: item.name, Stundenzahl: item[key] });
         }
         return data;
      },
      getExplanation(options) {
         const type = EntityType[Object.keys(EntityType)[this.includeWho]];
         let sortBy = sortByToSentence(options.switches.sortBy);
         return `Die Statistik zeigt die ${type.name} mit den ${sortBy}.`;
      },
      changeType(newType) {
         if (parseInt(newType) != newType) return;
         this.includeWho = newType;
         sessionStorage.setItem("cached-type-selector", newType);
      },
   },
};
</script>
<style lang="scss" scoped></style>
