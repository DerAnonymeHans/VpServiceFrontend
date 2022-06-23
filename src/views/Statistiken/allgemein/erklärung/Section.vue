<!-- @format -->
<script setup>
import IconRepo from "@/repos/IconRepo.vue";
</script>
<template>
   <div class="section flex" :class="[isInvert ? 'invert' : '', mq.current]">
      <div class="icon">
         <IconRepo :name="svg" />
      </div>
      <div class="">
         <h3 v-if="typeof title === 'string'">{{ title }}</h3>
         <div class="content" v-html="content"></div>
      </div>
   </div>
</template>
<script>
export default {
   inject: ["mq"],
   props: {
      svg: {
         type: String,
         required: true,
      },
      content: {
         type: String,
         required: true,
      },
      title: String,
      isInvert: Boolean,
   },
};
</script>
<style lang="scss" scoped>
@import "@/styles/_variables.scss";
.section {
   height: fit-content;
   border: 2px solid $col-medium;
   padding: $padding;
   border-radius: $border-radius;
   color: $col-text;

   .icon {
      color: $accent;
   }
   h3 {
      margin-top: 0;
   }
   &.invert {
      flex-direction: row-reverse;
      text-align: right;
      .icon {
         margin-right: 0;
         margin-left: $margin;
      }
   }

   &.desktop,
   &.tablet {
      flex-direction: row;
      .icon {
         height: 10vh;
         aspect-ratio: 1;
         margin-right: $margin;
      }
   }
   &.mobile {
      flex-direction: column;
      .icon {
         $size: 30vw;
         height: $size;
         width: $size;
         margin: auto;
         margin-bottom: $margin;
      }
   }
}
</style>
