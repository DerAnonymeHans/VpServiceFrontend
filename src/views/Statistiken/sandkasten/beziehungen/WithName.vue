<script setup>
import Statistic, { SwitchModel, Dataset } from "../../components/Statistic.vue";
import EntityType from "../../functions/EntityType.js";
import NameSelector from "../../components/NameSelector.vue";
</script>
<template>
   <Statistic :getDatasets="getDatasets" :getLabels="getLabels" chartType="bar" :_switches="switches">
      <div class="compare-with-container">
         <h4>mit</h4>
         <NameSelector @change="(e) => changeCompareWith(e.target.value)"/>
      </div>
   </Statistic>
</template>
<script>
export default {
   inject: ["fetchStat"],
   data(){
      return{
         switches: {
            // attendance: new SwitchModel(['Fehlstunden', 'Vertretungsstunden'], 'Fehlstunden'),
         },
         otherName: "Arb",
         labels: []
      }
   },
   methods: {
      changeCompareWith(name){
         console.log(name)
         this.otherName = name;
      },
      getLabels(options){
         return this.labels;
      },
      async getDatasets(options) {
         options.switches.otherType = this.otherType;

         this.labels = []
         const missed = new Dataset("Fehlstunden", 1);
         const subst = new Dataset("Vertretungsstunden", 1);

         for (let selector of options.selectors) {
            if (typeof selector.name !== "string") continue;
            let data;
            try{
               data = await this.fetchStat(`/Compare/${encodeURIComponent(selector.name)}/WithName/${encodeURIComponent(this.otherName)}`, false)               
            }catch{
               continue;
            }
            const missedObj = {
               name: data.otherName,
               count: data.missed
            }
            const substObj = {
               name: data.otherName,
               count: data.substituted
            }
            let idx = missed.data.findIndex(el => el.name === missedObj.name)
            idx = idx === -1 ? subst.data.findIndex(el => el.name === substObj.name) : idx;
            if(idx === -1){
               if(missedObj.count === 0 && substObj.count === 0) continue
               missed.data.push(missedObj);
               subst.data.push(substObj);
               this.labels.push(missedObj.name)
               continue;
            }
            missed.data[idx].count += missedObj.count;
            subst.data[idx].count += substObj.count;
            
         }
         missed.data = missed.data.map(el => el.count)
         missed.newColor(1)
         subst.data = subst.data.map(el => el.count)
         subst.newColor(1, 1)
         return [missed, subst]
      },
   },
}
</script>
<style lang="scss" scoped>
@import "@/styles/_variables.scss";
@import "@/styles/components.scss";

.compare-with-container{
   display: flex;
   flex-direction: column;
   align-items: center;
   max-width: 300px;
   margin: auto;
}
</style>