<!-- @format -->

<script setup>
import Statistic, { SwitchModel, Dataset } from "../../components/Statistic.vue";
import TimeType from "../../enums/TimeType.js";
</script>
<template>
   <Statistic :getDatasets="getDatasets" :getLabels="getLabels" chartType="line" :_switches="switchModel" />
</template>
<script>
export default {
   inject: ["fetchStat"],
   data() {
      return {
         switchModel: {
            timeType: new SwitchModel(["Monate", "Wochentage", "Stunden"], "Monate"),
            attendance: new SwitchModel(["Fehlstunden", "Vertretungsstunden", "beides"], "Fehlstunden"),
            sumMode: new SwitchModel(["getrennt", "addieren"], "getrennt"),
         },
      };
   },
   methods: {
      getLabels(options) {
         switch (options.switches.timeType) {
            case "Monate":
               return ["Aug", "Sep", "Okt", "Nov", "Dez", "Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul"];
            case "Wochentage":
               return ["Mo", "Di", "Mi", "Do", "Fr"];
            case "Stunden":
               return ["1", "2", "3", "4", "5", "6", "7", "8"];
         }
      },
      async getDatasets(options) {
         let sumData = options.switches.sumMode === "addieren";
         let timeType = 0;
         switch (options.switches.timeType) {
            case "Monate":
               timeType = TimeType.MONTH;
               break;
            case "Wochentage":
               timeType = TimeType.DAY;
               break;
            case "Stunden":
               timeType = TimeType.LESSON;
               break;
         }

         const datasets = [];

         for (let selector of options.selectors) {
            if (typeof selector.name !== "string") continue;
            const data = await this.fetchStat(`/CountsOf/${encodeURIComponent(selector.name)}/Over/${timeType}`);

            let keys = options.switches.attendance === "Fehlstunden" ? ["missed"] : ["substituted"];
            keys = options.switches.attendance === "beides" ? ["missed", "substituted"] : keys;

            for (let [idx, key] of keys.entries()) {
               const set = new Dataset(data.name + (keys.length > 1 ? (key === "missed" ? "-Fehl" : "-Vert") : ""), 1);
               set.newColor(1, datasets.length);
               set.setBorder();
               set.tension = 0.5;
               // shift month to start in august
               set.data = timeType === TimeType.MONTH ? [...data[key].slice(6, Infinity), ...data[key].slice(0, 6)] : data[key];
               set.key = key;

               if (sumData) {
                  if (datasets.length < keys.length) {
                     datasets.push(set);
                     continue;
                  }
                  for (let i = 0; i < datasets[idx].data.length; i++) {
                     datasets[idx].data[i] += set.data[i];
                  }
                  datasets[idx].label += `, ${set.label}`;
                  continue;
               }
               datasets.push(set);
            }
         }
         // if (sumData) {
         //    const set1 = new Dataset("", 0)
         //    set1.newColor(1)
         //    const set2 = new Dataset("", 0)
         //    set2.newColor(1, 1)
         //    for(let set of datasets){
         //       let newSet = set1;
         //       if(set.key === "substituted") {
         //          newSet = set2;
         //       }
         //       for(let i = 0; i < set.data.length; i++){
         //          if(typeof newSet.data[i] !== "number") {
         //             newSet.data.push(set.data[i])
         //             continue
         //          }
         //          newSet.data[i] += set.data[i]
         //       }
         //    }
         //    if(set1.data.length > 0 && set2.data.length > 0) return [set1, set2];
         //    if(set1.data.length > 0) return set1;
         //    return set2;
         // }
         console.log(datasets);
         return datasets;
      },
   },
};
</script>
