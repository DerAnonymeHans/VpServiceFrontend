<!-- @format -->

<script setup>
import { computed } from "vue";
import Switch from "@/components/switch/Switch.vue";
import WithType from "./WithType.vue";
import WithName from "./WithName.vue";
import KLP from "@/structs/KeyLabelPair.js";
</script>
<template>
   <div class="beziehungen-page" :class="mq.current">
      <div class="beziehungen-header">
         <Switch :invert="true" :options="compareModeOptions" :default="compareModeValue" @switch="(to) => switchCompareMode(to)" />
      </div>
      <div class="beziehungen-main">
         <WithType v-if="compareModeValue === 'type'" />
         <WithName v-if="compareModeValue === 'name'" />
      </div>
   </div>
</template>
<script>
export default {
   inject: ["mq"],
   data() {
      return {
         isMounted: false,
         compareModeOptions: [new KLP("name", "Name"), new KLP("type", "Typ")],
         compareModeValue: "name",
      };
   },
   created() {
      this.switchCompareMode(sessionStorage.getItem("switch-compare-mode"));
   },
   methods: {
      switchCompareMode(mode) {
         if (mode === null) return;
         this.compareModeValue = mode;
         sessionStorage.setItem("switch-compare-mode", mode);
      },
   },
};
</script>
<style lang="scss" scoped>
@import "@/styles/_variables.scss";

.beziehungen-page {
   .beziehungen-header {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: $margin;
   }
}
</style>
