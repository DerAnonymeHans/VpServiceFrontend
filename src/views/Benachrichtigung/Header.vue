<!-- @format -->

<script setup>
import { fetchAPI } from "@/App.vue";
</script>

<template>
   <header class="head" :class="mq.current">
      <h1 class="heading">
         <span class="user-count">{{ userCount }}</span>
         <span class="user"> Nutzer</span>
      </h1>
      <h4 class="heading-explanation">vertrauen auf vp.mailservice.kepler@gmail.com</h4>
   </header>
</template>
<script>
export default {
   inject: ["mq"],
   props: {
      userCount: String,
   },
};
</script>
<style scoped lang="scss">
@import "@/styles/_variables.scss";
header {
   background-color: $col-dark;
   padding: $padding * 2;
   margin-top: 8vh;
   text-align: center;

   .heading {
      margin: 0;

      .user-count {
         color: $accent;
      }
      .user {
         color: $col-light;
         font-weight: lighter;
      }
   }
   h4 {
      color: $col-text-sec;
      margin: 0;
   }

   &.ultrawide {
      .heading {
         font-size: 5vw;
      }
   }
   &.desktop {
      .heading {
         font-size: 5vw;
      }
   }
   &.tablet {
      .heading {
         font-size: 8vw;
      }
   }
   &.mobile {
      .heading {
         display: flex;
         flex-direction: column;
         justify-content: center;

         .user-count {
            font-size: 30vw;
            line-height: 30vw;
         }
         .user {
            margin-bottom: 1em;
         }
      }
   }
}
</style>
