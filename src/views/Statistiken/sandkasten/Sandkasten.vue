<!-- @format -->

<script setup>
import { SwitchModel } from "../components/Statistic.vue";
import Gesamtzahlen from "./gesamtzahlen/Gesamtzahlen.vue";
import Zeit from "./zeit/Zeit.vue";
import Beziehungen from "./beziehungen/Beziehungen.vue";
import Relativ from "./relativ/Relativ.vue";
import Vergleich from "./vergleich/Vergleich.vue";
</script>
<template>
   <div>
      <Gesamtzahlen v-if="statistic === 'gesamtzahlen'" />
      <Zeit v-if="statistic === 'zeit'" />
      <Beziehungen v-if="statistic === 'beziehungen'" />
      <Relativ v-if="statistic === 'relativ'" />
      <Vergleich v-if="statistic === 'vergleich'" />
   </div>
</template>
<script>
export default {
   props: {
      statistic: {
         type: String,
         required: true,
      },
   },
   data() {
      return {};
   },
};
</script>
<style lang="scss">
@import "@/styles/_variables.scss";
</style>
