<script setup>
import { SwitchModel } from "../components/Statistic.vue"
import Gesamtzahlen from "./gesamtzahlen/Gesamtzahlen.vue";
import Zeit from "./zeit/Zeit.vue";
import Beziehungen from "./beziehungen/Beziehungen.vue";
</script>
<template>
   <div>
      <Gesamtzahlen v-if="statistic === 'gesamtzahlen'"/>
      <Zeit v-if="statistic === 'zeit'"/> 
      <Beziehungen v-if="statistic === 'beziehungen'"/> 
   </div>
</template>
<script>
export default {
   props: {
      statistic: {
         type: String, required: true
      }
   },
   data(){
      return{
         
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