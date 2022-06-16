<!-- @format -->

<script setup>
import Statistic, { SwitchModel, Dataset } from "../../components/Statistic.vue";
</script>
<template>
   <Statistic :getDatasets="getDatasets" :getLabels="getLabels" chartType="bar" :_switches="switches" />
</template>
<script>
export default {
   inject: ["fetchStat"],
   data(){
      return{
         switches: {
            attendance: new SwitchModel(['Fehlstunden', 'Vertretungsstunden', 'beides'], 'Fehlstunden'),
            sumMode: new SwitchModel(['getrennt', 'addieren'], 'getrennt')
         }
      }
   },
   methods: {
      getLabels(options){
         const sumData = options.switches.sumMode === "addieren";
         if(sumData) return [options.selectors.map((selector) => selector.name).join(", ")]
         return options.selectors.map((selector) => selector.name)
      },
      async getDatasets(options) {
         const sumData = options.switches.sumMode === "addieren";
         const missed = new Dataset("Fehlstunden", options.selectors.length);
         const subst = new Dataset("Vertretungsstunden", options.selectors.length);
         for (let selector of options.selectors) {
            if (typeof selector.name !== "string") continue;
            const data = await this.fetchStat(`/CountOf/${encodeURIComponent(selector.name)}`);
            missed.data.push(data.missed);
            subst.data.push(data.substituted);
         }
         if(sumData){
            missed.sumData();
            subst.sumData();
         }
         if(options.switches.attendance === "Fehlstunden") return [missed];
         if(options.switches.attendance === "Vertretungsstunden") return [subst];
         return [missed, subst];
      },
   },
};
</script>
