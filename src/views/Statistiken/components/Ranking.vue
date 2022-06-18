<!-- @format -->
<script setup>
import NameSelectorContainer from "@/views/Statistiken/components/NameSelectorContainer.vue";
import Chart from "chart.js/auto";
import ColorRepo from "@/repos/ColorRepo.js";
import Switch, { SwitchModel } from "@/components/switch/Switch.vue";
import { sleep } from "@/App.vue";
</script>
<template>
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
   <div>
      <div class="podest-container"></div>
   </div>
</template>
<script>
export default {
   props: {
      _switches: {
         type: Object,
         required: true, // {sumMode: new SwitchModel(['getrennt', 'addieren'], 'getrennt')}
      },
   },
};
</script>
<style lang="scss" scoped></style>
