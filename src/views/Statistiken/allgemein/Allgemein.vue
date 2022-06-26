<!-- @format -->

<script setup>
import Erklaerung from "./erklärung/Erklärung.vue";
import Logout from "./logout/Logout.vue";
</script>
<template>
   <div>
      <Erklaerung v-if="statistic === 'info'" />
      <Logout v-if="statistic === 'logout'" />
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
