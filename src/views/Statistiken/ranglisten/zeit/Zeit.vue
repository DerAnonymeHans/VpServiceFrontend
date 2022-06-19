<!-- @format -->

<script setup>
import Ranking from "../../components/Ranking.vue";
import { SwitchModel } from "@/components/switch/Switch.vue";
import EntityType from "../../enums/EntityType.js";
import { Months, Weekdays, Lessons } from "../../enums/TimeType.js";
</script>
<template>
   <div>
      <Ranking :_switches="switches" :getRanklist="getRanklist">
         <div class="flex-n-margin">
            <select class="select" @input="(e) => (includeWho = e.target.value)">
               <option v-for="key in Object.keys(EntityType)" :key="key" :value="EntityType[key].idx">{{ EntityType[key].name }}</option>
            </select>
            <select class="select" @input="(e) => (timeName = e.target.value)">
               <optgroup label="Monate">
                  <option v-for="month in Months" :key="month" :value="month.key">{{ month.name }}</option>
               </optgroup>
               <optgroup label="Wochentage">
                  <option v-for="day in Weekdays" :key="day" :value="day.key">{{ day.name }}</option>
               </optgroup>
               <optgroup label="Stunden">
                  <option v-for="lesson in Lessons" :key="lesson" :value="lesson.key">{{ lesson.name }}</option>
               </optgroup>
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
         switches: {
            // sortBy: new SwitchModel(["Top-Fehl", "Top-Ver", "Flop-Fehl", "Flop-Ver"], "Top-Fehl"),
         },
         includeWho: "0",
         timeName: "january",
      };
   },
   methods: {
      async getRanklist(options) {
         const res = await this.fetchStat(`/SortCountsOf/${this.includeWho}/During/${this.timeName}/By/${options.switches.sortBy}`);
         const key = options.switches.sortBy.slice(1) === "m" ? "missed" : "substituted";
         const data = [];
         for (let item of res) {
            data.push({ Name: item.name, Stundenzahl: item[key] });
         }
         return data;
      },
   },
};
</script>
<style lang="scss" scoped></style>
