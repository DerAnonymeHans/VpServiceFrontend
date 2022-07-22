<!-- @format -->

<template>
   <section :class="[mq.current, invert]">
      <div class="heading-container">
         <div v-for="titleObj of title" :key="titleObj">
            <h2 v-if="titleObj.isColored" class="colored">{{ titleObj.value }}</h2>
            <h2 v-else>{{ titleObj.value }}</h2>
         </div>
      </div>
      <div class="content-container" v-if="isInvert && mq.desktop">
         <slot></slot>
         <article>
            {{ text }}
         </article>
      </div>
      <div class="content-container" v-else>
         <article>
            {{ text }}
         </article>
         <slot></slot>
      </div>
   </section>
</template>
<script>
export default {
   inject: ["mq"],
   props: {
      title: {
         type: Object,
         required: true,
      },
      isInvert: Boolean,
      text: String,
   },
   data() {
      return {
         invert: this.isInvert ? "invert" : "",
      };
   },
};
</script>
<style lang="scss">
@import "@/styles/helper";
@import "@/styles/variables.scss";
@import "@/styles/mixins.scss";
section {
   margin-bottom: $margin * 5;
   .heading-container {
      display: flex;
      background-color: $col-dark;
      justify-content: flex-end;
      padding: $padding;
      border-radius: 0 0 $border-radius 0;
      h2 {
         color: $col-light;
         margin: 0;
      }
      .colored {
         color: $accent;
      }
   }

   .content-container {
      margin: $margin * 2 auto;

      article {
         @include box;
      }
   }

   &.invert {
      .heading-container {
         justify-content: flex-start;
         margin-left: auto;
         border-radius: 0 0 0 $border-radius;
      }
   }

   &.ultrawide {
      .heading-container {
         width: 65vw;
         font-size: 1.3vw;
         line-height: 2vw;
      }
      .content-container {
         width: 50vw;
         display: grid;
         grid-template-columns: 1fr 1fr;
         grid-gap: $margin * 3;
      }
   }
   &.desktop {
      .heading-container {
         width: 75vw;
         font-size: 2vw;
         line-height: 2vw;
      }
      .content-container {
         width: 60vw;
         display: grid;
         grid-template-columns: 1fr 1fr;
         grid-gap: $margin * 3;
      }
   }
   &.tablet {
      .heading-container {
         width: 80vw;
         font-size: 3vw;
         line-height: 3vw;
      }
      .content-container {
         width: 80vw;
      }
   }
   &.mobile {
      .heading-container {
         width: 70vw;
         font-size: 5vw;
         line-height: 5vw;
      }
      .content-container {
         width: 90vw;
      }
   }
}
</style>
