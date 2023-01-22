<!-- @format -->

<script setup>
import IconRepo from "@/repos/IconRepo.vue";
</script>
<template>
   <div class="verified-icon" :class="verified ? 'verified' : 'warning'">
      <IconRepo :name="verified ? 'verified' : 'warning'" />
   </div>
</template>
<script>
export default {
   props: {
      verified: { type: Boolean, required: true },
   },
};
</script>
<style lang="scss">
@import "@/styles/variables.scss";
.verified-icon {
   height: min(100px, max(10vh, 10vw));
   position: fixed;
   bottom: $margin;
   right: $margin;
   aspect-ratio: 1;

   &.verified {
      color: $success;
   }
   &.warning {
      color: $warning;
   }
}
</style>
