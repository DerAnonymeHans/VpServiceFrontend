<!-- @format -->
<script setup>
import Switch from "@/components/switch/Switch.vue";
import ScrollSelector, { Item } from "@/components/navigation/ScrollSelector.vue";
import KeyLabelPair from "@/structs/KeyLabelPair.js";
import Kurswahl from "./kurswahl/Kurswahl.vue";
import Abifaecher from "./abifächer/Abifächer.vue";
import Einbringen from "./einbringen/Einbringen.vue";
</script>

<template>
   <div class="abirechner-container">
      <div class="selector">
         <ScrollSelector
            @select="
               (item) => {
                  stage = item.key;
               }
            "
            :default="stage"
            :items="stages"
         />
      </div>
      <div class="main" :class="mq.current">
         <Kurswahl v-if="stage === 'kurswahl'" />
         <Abifaecher v-if="stage === 'abifächer'" />
         <Einbringen v-if="stage === 'punkte'" />
      </div>
   </div>
</template>
<script>
export default {
   inject: ["mq"],
   data() {
      return {
         stage: "kurswahl",
         stages: [new Item("Kurswahl", "kurswahl"), new Item("Abiturfächer", "abifächer"), new Item("Punkte", "punkte")],
      };
   },
};
</script>
<style lang="scss" scoped>
@import "@/styles/helper.scss";
@import "@/styles/variables.scss";
@import "@/styles/assets.scss";
.abirechner-container {
   margin-top: 9vh;
   padding-bottom: 5vh;

   .selector {
      margin: $margin auto;
      width: 100%;
      display: flex;
      justify-content: center;
      height: max(5vh, 100px);
      background-color: $col-dark;
      padding: $padding 0;
   }

   .main {
      &.ultrawide {
         margin-inline: 30vw;
      }
      &.desktop {
         margin-inline: 20vw;
      }
      &.tablet {
         margin-inline: 5vw;
      }

      &.mobile {
         margin-inline: $margin;
      }
   }
}
</style>
