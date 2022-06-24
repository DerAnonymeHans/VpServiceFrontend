<!-- @format -->

<script setup>
import Gesamtzahlen from "./gesamtzahlen/Gesamtzahlen.vue";
import Zeit from "./zeit/Zeit.vue";
import Beziehungen from "./beziehungen/Beziehungen.vue";
import Relativ from "./relativ/Relativ.vue";
import Beschreibungen from "./beschreibungen/Beschreibungen.vue";
</script>
<template>
   <div>
      <Gesamtzahlen v-if="statistic === 'gesamtzahlen'" />
      <Zeit v-if="statistic === 'zeit'" />
      <Beziehungen v-if="statistic === 'beziehungen'" />
      <Relativ v-if="statistic === 'relativ'" />
      <Beschreibungen v-if="statistic === 'beschreibungen'" />
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
};
</script>
<style lang=""></style>
