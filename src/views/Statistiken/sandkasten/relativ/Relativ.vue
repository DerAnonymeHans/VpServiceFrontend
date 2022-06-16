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
            const data = await this.fetchStat(`/RelativeOf/${encodeURIComponent(selector.name)}`);
            // convert to percentage
            missed.data.push(data.missed * 100);
            subst.data.push(data.substituted * 100);
         }
         if(sumData){
            missed.sumData("rel");
            subst.sumData("rel");
         }
         if(options.switches.attendance === "Fehlstunden") return [missed];
         if(options.switches.attendance === "Vertretungsstunden") return [subst];
         return [missed, subst];
      },
   },
};
</script>
