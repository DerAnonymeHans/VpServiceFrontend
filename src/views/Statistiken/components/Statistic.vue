<!-- @format -->

<script setup>
import NameSelectorContainer from "@/views/Statistiken/components/NameSelectorContainer.vue";
import Chart from "chart.js/auto";
import ColorRepo from "@/repos/ColorRepo.js";
import Switch, { SwitchModel } from "@/components/switch/Switch.vue";
import { sleep } from "@/App.vue";
</script>
<template>
   <div class="page" :class="mq.current">
      <NameSelectorContainer @selector-change="(selectors) => selectorsChanged(selectors)">
         <slot></slot>
      </NameSelectorContainer>
      <div class="statistic box" ref="chart-container">
         <canvas id="mychart" ref="chart"></canvas>
      </div>

      <div class="switches">
         <Switch
            v-for="(_switch, key) in _switches"
            :key="key"
            :invert="true"
            :options="_switch.options"
            :default="_switch.value"
            @switch="(to) => switchMode(key, to)"
         />
      </div>

      <div class="explanation box" v-html="explanation"></div>
   </div>
</template>
<script>
export default {
   inject: ["fetchStat", "mq", "year"],
   props: {
      getDatasets: {
         type: Function,
         required: true,
      },
      getLabels: {
         type: Function,
         required: true,
      },
      getExplanation: {
         type: Function,
         required: true,
      },
      chartType: {
         type: String,
         required: true,
      },
      _switches: {
         type: Object,
         required: true, // {sumMode: new SwitchModel(['getrennt', 'addieren'], 'getrennt')}
      },
      options: Object,
   },
   data() {
      return {
         selectors: [],
         mychart: null,
         isMounted: false,
         explanation: "",
      };
   },
   created() {
      this.switchSessionHandler("load");
   },
   mounted() {
      this.isMounted = true;
   },
   beforeUnmount() {
      if (this.chart !== undefined) this.chart.destroy();
      this.isMounted = false;
   },
   methods: {
      async selectorsChanged(selectors) {
         this.selectors = selectors;
         await this.redraw();
         if (localStorage.getItem("stat-scroll") !== "false") this.$refs["chart-container"].scrollIntoView({ behavior: "smooth", block: "end" });
      },
      async redraw() {
         if (!this.isMounted) return;
         let doc = document.documentElement;
         let top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

         const switchVals = {};
         for (let key in this._switches) switchVals[key] = this._switches[key].value;
         const generationOptions = new GenerationOptions(this.selectors, switchVals);

         if (this.chart !== undefined) this.chart.destroy();

         this.chart = new Chart(this.$refs.chart, {
            type: this.chartType,
            options: {
               maintainAspectRatio: false,
               responsive: true,
               ...(typeof this.options === "object" ? this.options : {}),
            },
            data: {
               datasets: await this.getDatasets(generationOptions),
               labels: await this.getLabels(generationOptions),
            },
         });

         this.explanation =
            (await this.getExplanation(generationOptions, this.chart)) +
            "<br /><br />" +
            `
               Der beobachtete Zeitraum beträgt ${await this.fetchStat("/RecordedDays/Count")} Tage. Alle Angaben sind ohne Gewähr.
            `;

         window.scrollTo(0, top);
      },
      async switchMode(key, value) {
         this._switches[key].value = value;
         if (this.isMounted) this.switchSessionHandler("save");
         await this.redraw();
      },
      switchSessionHandler(action) {
         for (let key in this._switches) {
            if (action === "save") {
               sessionStorage.setItem("switch-" + key, this._switches[key].value);
            } else if (action === "load") {
               const saved = sessionStorage.getItem("switch-" + key);
               if (saved === undefined || saved === null) continue;
               this._switches[key].value = saved;
            }
         }
      },
   },
};

class GenerationOptions {
   constructor(selectors, _switches) {
      this.selectors = selectors;
      this.switches = _switches;
   }
}
class Dataset {
   constructor(label = "", dataCount = 0) {
      this.label = label;
      this.data = [];
      this.backgroundColor = ColorRepo.get(dataCount);
      this.borderColor = "";
      this.key = "";
      this.tension;
      this.stack;
   }
   sumData(mode = "abs") {
      switch (mode) {
         case "abs":
            this.data = [this.data.reduce((prev, current) => parseFloat(prev) + parseFloat(current), 0)];
            break;
         case "rel":
            let oldLength = this.data.length;
            this.data = [this.data.reduce((prev, current) => parseFloat(prev) + parseFloat(current), 0) / oldLength];
            break;
      }
      this.backgroundColor = ColorRepo.get(1);
   }
   newColor(count, offset = 0, isArray = true) {
      this.backgroundColor = ColorRepo.get(count, offset);
      if (!isArray) this.backgroundColor = this.backgroundColor[0];
   }
   setBorder(offset = 0) {
      this.borderColor = this.backgroundColor[offset];
   }
}
class DatasetGroup {
   constructor(name) {
      this.name = name;
      this.sets = [];
   }
   add(dataset) {
      dataset.stack = this.name;
      this.sets.push(dataset);
   }
}
export { Dataset, DatasetGroup };
</script>
<style lang="scss" scoped>
@import "@/styles/helper.scss";
@import "@/styles/assets.scss";
@import "@/styles/variables.scss";
#mychart {
   width: 0;
}
.page {
   > * {
      margin-bottom: $margin;
   }

   .statistic {
      canvas {
         height: 100%;
      }
   }
   .switches {
      > * {
         margin: $margin;
      }
   }

   .explanation {
      color: $col-text;
   }

   &.desktop,
   &.ultrawide {
      .statistic {
         height: 70vh;
      }
      .switches {
         display: grid;
         grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      }
   }
   &.tablet {
      .statistic {
         height: 80vh;
      }
   }
   &.mobile {
      .statistic {
         height: 80vh;
      }
   }
}
</style>
