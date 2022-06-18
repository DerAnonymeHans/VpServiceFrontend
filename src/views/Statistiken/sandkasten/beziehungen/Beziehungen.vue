<!-- @format -->

<script setup>
import { computed } from "vue";
import Switch from "@/components/switch/Switch.vue";
import WithType from "./WithType.vue";
import WithName from "./WithName.vue";
</script>
<template>
   <div class="beziehungen-page" :class="mq.current">
      <div class="beziehungen-header">
         <Switch :invert="true" :options="compareModeOptions" :default="compareModeValue" @switch="(to) => (compareModeValue = to)" />
      </div>
      <div class="beziehungen-main">
         <WithType v-if="compareModeValue === 'Typ'" />
         <WithName v-if="compareModeValue === 'Name'" />
      </div>
   </div>
</template>
<script>
export default {
   inject: ["mq"],
   data() {
      return {
         isMounted: false,
         compareModeOptions: ["Name", "Typ"],
         compareModeValue: "Name",
      };
   },
   mounted() {
      this.isMounted = true;
   },
   methods: {
      switchCompareMode(mode) {
         if (!this.isMounted) return;
         this.compareModeValue = mode;
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
