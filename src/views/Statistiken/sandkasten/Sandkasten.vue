<script setup>
import Gesamtzahlen from "./gesamtzahlen/Gesamtzahlen.vue";
import Zeit from "./zeit/Zeit.vue";
</script>
<template>
   <div>
      <Gesamtzahlen v-if="statistic === 'gesamtzahlen'"/>
      <Zeit v-if="statistic === 'zeit'"/> 
   </div>
</template>
<script>
export default {
   props: {
      statistic: {
         type: String, required: true
      }
   }
}
</script>
<style lang="scss">
@import "@/styles/_variables.scss";
.statistic {
   background-color: $bg-medium;
   margin: $margin 0;
   border-radius: $border-radius;
}
</style>