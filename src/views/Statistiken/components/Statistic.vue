<!-- @format -->

<script setup>
import NameSelectorContainer from "@/views/Statistiken/components/NameSelectorContainer.vue";
import Chart from "chart.js/auto";
import ColorRepo from "@/repos/ColorRepo.js";
import Switch from "@/components/switch/Switch.vue";
import { sleep } from "@/App.vue";

</script>
<template>
   <div class="page" :class="mq.current">
      <NameSelectorContainer @selector-change="(selectors) => selectorsChanged(selectors)" />

      <div class="statistic">
         <canvas id="mychart" ref="chart"></canvas>
      </div>

      <div class="switches">
         <Switch v-for="(_switch, key) in _switches" :key="key" 
            :invert="true"
            :options="_switch.options" 
            :default="_switch.value" 
            @switch="(to) => switchMode(key, to)"
         />
      </div>
   </div>
</template>
<script>
export default {
   inject: ["fetchStat", "mq"],
   props: {
      getDatasets: {
         type: Function, required: true
      },
      getLabels: {
         type: Function, required: true
      },
      chartType: {
         type: String, required: true
      },
      _switches: {
         type: Object, required: true // {sumMode: new SwitchModel(['getrennt', 'addieren'], 'getrennt')}
      }
   },
   data() {
      return {
         selectors: [],
         mychart: null,
         isMounted: false,
      };
   },
   created(){
      this.switchSessionHandler("load")
   },
   mounted(){
      this.isMounted = true;
   },
   beforeUnmount(){
      if(this.chart !== undefined) this.chart.destroy();
      this.isMounted = false;
   },
   methods: {
      async selectorsChanged(selectors) {
         this.selectors = selectors;
         await this.redraw();
         this.$refs.chart.scrollIntoView({ behavior: "smooth" });
      },
      async redraw() {
         if(!this.isMounted) return;
         let doc = document.documentElement;
         let top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
         
         const switchVals = {};
         for(let key in this._switches) switchVals[key] = this._switches[key].value;
         const generationOptions = new GenerationOptions(this.selectors, switchVals)

         if(this.chart !== undefined) this.chart.destroy();

         this.chart = new Chart(this.$refs.chart, {
            type: this.chartType,         
            options: {
               maintainAspectRatio: false,
               responsive: true
            },
            data: {
               labels: await this.getLabels(generationOptions),
               datasets: await this.getDatasets(generationOptions),
            }
         });

         window.scrollTo(0, top)
      },
      async switchMode(key, value){
         this._switches[key].value = value;
         if(this.isMounted) this.switchSessionHandler("save");
         await this.redraw();
      },
      switchSessionHandler(action){
         for(let key in this._switches){
            if(action === "save"){
               sessionStorage.setItem("switch-"+key, this._switches[key].value);
            }else if(action === "load"){
               const saved = sessionStorage.getItem("switch-"+key);
               if(saved === undefined || saved === null) continue;
               this._switches[key].value = saved;
            }
         }
      },
   },
};

class SwitchModel{
   constructor(options, _default){
      this.options = options;
      this.value = _default;
   }
}
class GenerationOptions{
   constructor(selectors, _switches){
      this.selectors = selectors;
      this.switches = _switches;
   }
}
class Dataset{
   constructor(label="", dataCount=0){
      this.label = label;
      this.data = [];
      this.backgroundColor = ColorRepo.get(dataCount);
      this.borderColor = "";
      this.key = "";
      this.tension;
   }
   sumData(){
      this.data = [this.data.reduce((prev, current) => prev + current, 0)]
      this.backgroundColor = ColorRepo.get(1)
   }
   newColor(count, offset=0){
      this.backgroundColor = ColorRepo.get(count, offset);
   }
   setBorder(offset=0){
      this.borderColor = this.backgroundColor[offset]
   }
}

export { SwitchModel, Dataset }

</script>
<style lang="scss" scoped>
@import "@/styles/_variables.scss";
@import "@/styles/helper.scss";

.page{
   .statistic{   
      canvas{
         height: 100%;
      }
   }
   .switches{
      > *{
         margin: $margin;
      }
   }
   &.desktop{
      .statistic{
         height: 70vh;
      }
      .switches{
         display: flex;
      }
   }
   &.tablet{
      .statistic{
         height: 80vh;
      }
   }
   &.mobile{
      .statistic{
         height: 80vh;
      }
   }
}
</style>
