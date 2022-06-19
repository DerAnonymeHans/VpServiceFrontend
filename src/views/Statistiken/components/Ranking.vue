<!-- @format -->
<script setup>
import NameSelectorContainer from "@/views/Statistiken/components/NameSelectorContainer.vue";
import Chart from "chart.js/auto";
import ColorRepo from "@/repos/ColorRepo.js";
import Switch, { SwitchModel } from "@/components/switch/Switch.vue";
import { sleep } from "@/App.vue";
</script>
<template>
   <div class="ranking" :class="mq.current">
      <div class="inputs box">
         <div class="switches flex">
            <Switch
               v-for="(_switch, key) in _switches"
               :key="key"
               :invert="true"
               :options="_switch.options"
               :default="_switch.value"
               @switch="(to) => switchMode(key, to)"
            />
         </div>
         <slot></slot>
         <button class="btn-focus" @click="redraw()">Erstellen</button>
      </div>

      <div class="podest-container box">
         <div class="podest-item second">
            <div class="name">{{ podest.second }}</div>
            <div class="podest">
               <div class="label">2</div>
            </div>
         </div>
         <div class="podest-item first">
            <div class="name">{{ podest.first }}</div>
            <div class="podest">
               <div class="label">1</div>
            </div>
         </div>
         <div class="podest-item third">
            <div class="name">{{ podest.third }}</div>
            <div class="podest">
               <div class="label">3</div>
            </div>
         </div>
      </div>

      <div class="table-container box">
         <table>
            <tr>
               <th>Platz</th>
               <th v-for="key in Object.keys(rankList[0])" :key="key">{{ key }}</th>
            </tr>
            <tr v-for="(data, idx) in rankList" :key="idx">
               <td>{{ idx + 1 }}.</td>
               <td v-for="item in data" :key="item">{{ item }}</td>
            </tr>
         </table>
      </div>

      <div class="explanation box">
         {{ explanation }}
      </div>
   </div>
</template>
<script>
export default {
   inject: ["mq"],
   props: {
      _switches: {
         type: Object,
         required: true, // {sumMode: new SwitchModel(['getrennt', 'addieren'], 'getrennt')}
      },
      getRanklist: {
         type: Function,
         required: true,
      },
      getExplanation: {
         type: Function,
         required: true,
      },
   },
   data() {
      return {
         rankList: [{}],
         podest: {
            isFirst: false,
            first: "",
            isSecond: false,
            second: "",
            isThird: true,
            third: "",
         },
         places: [
            { label: "second", num: 2 },
            { label: "first", num: 1 },
            { label: "third", num: 3 },
         ],
         isMounted: false,
         explanation: "",
      };
   },
   mounted() {
      this.isMounted = true;
      this._switches.sortBy = new SwitchModel(["Top-Fehl", "Top-Ver", "Flop-Fehl", "Flop-Ver"], "Top-Fehl");
      this.switchSessionHandler("load");
   },
   methods: {
      async switchMode(key, value) {
         this._switches[key].value = value;
         if (this.isMounted) this.switchSessionHandler("save");
         await this.redraw();
      },
      async redraw() {
         const switchVals = {};
         for (let key in this._switches) switchVals[key] = this._switches[key].value;
         const options = new GenerationOptions(switchVals);
         this.rankList = await this.getRanklist(options);
         this.doPodest();
         this.explanation = await this.getExplanation(options);
      },
      doPodest() {
         this.podest.first = this.rankList[0].Name;
         this.podest.second = this.rankList[1].Name;
         this.podest.third = this.rankList[2].Name;
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
   constructor(_switches) {
      this.switches = _switches;
      for (let key in this.switches) {
         if (key === "sortBy") {
            switch (this.switches.sortBy) {
               case "Top-Fehl":
                  this.switches.sortBy = "mm";
                  break;
               case "Top-Ver":
                  this.switches.sortBy = "ms";
                  break;
               case "Flop-Fehl":
                  this.switches.sortBy = "lm";
                  break;
               case "Flop-Ver":
                  this.switches.sortBy = "ls";
                  break;
            }
         }
      }
   }
}

function sortByToSentence(sortBy) {
   switch (sortBy) {
      case "mm":
         return "meisten Fehlstunden";
      case "lm":
         return "wenigsten Fehlstunden";
      case "ms":
         return "meisten Vertretungsstunden";
      case "ls":
         return "wenigsten Vertretungsstunden";
   }
}

export { sortByToSentence };
</script>
<style lang="scss" scoped>
@import "@/styles/helper.scss";
@import "@/styles/assets.scss";
@import "@/styles/components.scss";
@import "@/styles/variables.scss";

.ranking {
   > * {
      margin-bottom: $margin !important;
   }

   .inputs {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      > * {
         margin-bottom: $margin;
      }

      .btn-focus {
         margin-top: $margin;
      }
   }

   .podest-container {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      height: 20vh;
      margin: auto;

      .podest-item {
         width: 100%;
         margin-top: auto;
         display: flex;
         flex-direction: column;

         .name {
            text-align: center;
            color: $col-text;
            font-weight: bold;
            font-size: 1.2em;
            animation-name: dance;
            animation-duration: 1.5s;
            animation-timing-function: ease;
            animation-iteration-count: infinite;
            animation-fill-mode: forwards;
         }

         .podest {
            height: 100%;
            width: 100%;
            background-color: $col-dark;
            margin-top: auto;
            border: 3px solid $col-light;
            border-radius: $border-radius;
            display: flex;
            align-items: center;
            justify-content: center;

            .label {
               border: 3px solid currentColor;
               height: 50%;
               aspect-ratio: 1;
               border-radius: 50%;
               display: flex;
               align-items: center;
               justify-content: center;
               font-weight: bold;
            }
         }
      }
      .second {
         height: 80%;
         color: silver;
      }
      .first {
         height: 100%;
         color: goldenrod;
         z-index: 1;

         .name {
            color: $accent;
         }
      }
      .third {
         height: 60%;
         color: lightsalmon;
      }
   }

   .table-container {
      table {
         width: 100%;
         tr {
            &:nth-child(2n) {
               background-color: rgba($col-dark, 0.05);
            }
            td {
               // text-align: center;
               padding: $padding * 0.2;
            }
         }
      }
   }

   &.desktop {
      .podest-container {
         width: 40%;
      }
   }
}

$deg: 5deg;
$trans: 10%;
@keyframes dance {
   0% {
      transform: rotate($deg) translateX($trans);
   }
   25% {
      transform: rotate(0) translateX(0%) translateY(-$trans);
   }
   50% {
      transform: rotate(-$deg) translateX(-$trans);
   }
   75% {
      transform: rotate(0) translateX(0%) translateY(-$trans);
   }
   100% {
      transform: rotate($deg) translateX($trans);
   }
}
</style>
