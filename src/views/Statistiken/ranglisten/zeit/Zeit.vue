<!-- @format -->

<script setup>
import Ranking, { sortByToSentence } from "../../components/Ranking.vue";
import { SwitchModel } from "@/components/switch/Switch.vue";
import EntityType from "../../enums/EntityType.js";
import { Months, Weekdays, Lessons } from "../../enums/TimeType.js";
</script>
<template>
   <div>
      <Ranking :_switches="switches" :getRanklist="getRanklist" :getExplanation="getExplanation">
         <div class="flex-n-margin">
            <select class="select" @input="(e) => changeType(e.target.value)" :value="includeWho">
               <option v-for="key in Object.keys(EntityType)" :key="key" :value="EntityType[key].idx">{{ EntityType[key].name }}</option>
            </select>
            <select class="select" @input="(e) => changeTime(e.target.value)" :value="timeName">
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
   mounted() {
      this.changeType(sessionStorage.getItem("cached-type-selector"));
      this.changeTime(sessionStorage.getItem("cached-time-selector"));
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
      getExplanation(options) {
         const type = EntityType[Object.keys(EntityType)[this.includeWho]];
         let sortBy = sortByToSentence(options.switches.sortBy);
         let timeName = this.getTimeSentence(this.timeName);
         return `Die Statistik zeigt die ${type.name} mit den ${sortBy} während ${timeName}.`;
      },
      getTimeSentence(timeName) {
         for (let timeType of [Months, Weekdays, Lessons]) {
            let idx = timeType.findIndex((entity) => entity.key === timeName);
            if (idx === -1) continue;

            // wenn Monate
            if (timeType.length === 12) return `des Monats ${timeType[idx].name}`;
            // wenn Wochentag
            if (timeType.length === 5) return `des Wochentags ${timeType[idx].name}`;
            // wenn Stunde
            if (timeType.length === 8) return `der ${timeType[idx].name}n Stunde`;
         }
      },
      changeType(newType) {
         if (parseInt(newType) != newType) return;
         this.includeWho = newType;
         sessionStorage.setItem("cached-type-selector", newType);
      },
      changeTime(newTime) {
         if (newTime === null) return;
         this.timeName = newTime;
         sessionStorage.setItem("cached-time-selector", newTime);
      },
   },
};
</script>
<style lang="scss" scoped></style>
