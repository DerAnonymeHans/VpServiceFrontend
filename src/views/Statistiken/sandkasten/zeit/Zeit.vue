<!-- @format -->

<script setup>
import Statistic, { Dataset } from "../../components/Statistic.vue";
import TimeType from "../../enums/TimeType.js";
import { SwitchModel } from "@/components/switch/Switch.vue";
import KLP from "@/structs/KeyLabelPair.js";
</script>
<template>
   <Statistic :getDatasets="getDatasets" :getLabels="getLabels" :getExplanation="getExplanation" chartType="line" :_switches="switchModel" />
</template>
<script>
export default {
   inject: ["fetchStat"],
   data() {
      return {
         switchModel: {
            timeType: new SwitchModel([new KLP("Monate", "Monate"), new KLP("Wochentage", "Wochentage"), new KLP("Stunden", "Stunden")], "Monate"),
            attendance: new SwitchModel(
               [new KLP("Fehlstunden", "Fehlstunden"), new KLP("Vertretungsstunden", "Vertretungsstunden"), new KLP("beides", "beides")],
               "Fehlstunden"
            ),
            continuity: new SwitchModel([new KLP("split", "getrennt"), new KLP("continuos", "fortlaufend")], "split"),
            sumMode: new SwitchModel([new KLP("split", "getrennt"), new KLP("add", "addieren")], "split"),
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
         let sumData = options.switches.sumMode === "add";
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
               set.data = timeType === TimeType.MONTH ? [...data[key].slice(7, Infinity), ...data[key].slice(0, 7)] : data[key];
               set.key = key;

               if (options.switches.continuity === "continuos") {
                  for (let i = 1; i < set.data.length; i++) {
                     set.data[i] += set.data[i - 1];
                  }
               }

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
         return datasets;
      },
      async getExplanation(options, chart) {
         const attendance = options.switches.attendance === "beides" ? "Fehl- und Vertretungsstunden" : options.switches.attendance;
         const timeType = options.switches.timeType;
         return `Das Diagramm zeigt die ${attendance} je nach ${timeType.slice(0, timeType.length - 1)}.
         ${
            options.switches.sumMode === "add"
               ? `Die Daten aller ausgewählten Namen werden hierbei addiert, so dass die Summe ihrer ${attendance} sichtbar ist.`
               : ""
         }
         `;
      },
   },
};
</script>
