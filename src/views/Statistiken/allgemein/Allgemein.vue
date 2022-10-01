<!-- @format -->

<script setup>
import Erklaerung from "./erklärung/Erklärung.vue";
import Logout from "./logout/Logout.vue";
import Settings from "./settings/StatSettings.vue";
</script>
<template>
   <div>
      <Erklaerung v-if="statistic === 'info'" />
      <Logout v-if="statistic === 'logout'" />
      <Settings v-if="statistic === 'settings'" />
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
