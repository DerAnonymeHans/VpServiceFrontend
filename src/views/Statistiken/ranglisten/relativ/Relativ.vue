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
            <select class="select" @input="(e) => (includeWho = e.target.value)">
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
   methods: {
      async getRanklist(options) {
         const res = await this.fetchStat(`/SortRelativesOf/${this.includeWho}/By/${options.switches.sortBy}`);
         const key = options.switches.sortBy.slice(1) === "m" ? "missed" : "substituted";
         const data = [];
         for (let item of res) {
            data.push({ Name: item.name, "Stundenzahl in %": Math.round(item[key] * 100) });
         }
         return data;
      },
      getExplanation(options) {
         const type = EntityType[Object.keys(EntityType)[this.includeWho]];
         let sortBy = sortByToSentence(options.switches.sortBy);
         return `Die Statistik zeigt die ${
            type.name
         } mit den ${sortBy} relativ gesehen. Diese Statistik hat die meiste Aussagekraft wenn man Ausfall und Vertretung von ${
            type.name.slice(type.name.length - 1) === "n" ? type.name : type.name + "n"
         } bewerten will, da sie die Gesamtsunden mit in Betracht bezieht.`;
      },
   },
};
</script>
<style lang="scss" scoped></style>
