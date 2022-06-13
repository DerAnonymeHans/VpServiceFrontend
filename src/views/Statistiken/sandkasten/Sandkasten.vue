<script setup>
import Gesamtzahlen from "./gesamtzahlen/Gesamtzahlen.vue";
</script>
<template>
   <div>
      <Gesamtzahlen v-if="statistic === 'gesamtzahlen'"/>
      <div v-else>Hallo</div>
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
<style lang="">
   
</style>