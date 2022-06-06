<script setup>
import { fetchAPI } from "@/App.vue";
</script>

<template>
   <header class="head" :class="mq.current">
      <h1 class="heading">
         <span class="user-count">{{userCount}}</span>
         <span class="user"> Nutzer</span>
      </h1>
      <h4 class="heading-explanation">vertrauen auf vp.mailservice.kepler@gmail.com</h4>
   </header>
</template>
<script>
export default {
   inject: ['mq'],
   data(){
      return{
         userCount: '#'
      }
   },
   mounted(){
      fetchAPI("/GetUserCount")
      .then(res => res.json())
      .then(res => {
         if(res.isSuccess) this.userCount = res.body;
         else this.userCount = "#";
      })
   }
};
</script>
<style scoped lang="scss">
@import "@/styles/_variables.scss";
header {
   background-color: $bg-dark;
   padding: $padding * 2;
   margin-top: 8vh;
   text-align: center;

   .heading{
      margin: 0;

      .user-count{
         color: $accent;
      }
      .user{
         color: $color-header-prim;
         font-weight: lighter;
      }
   }
   h4{
      color: $color-header-sec;
      margin: 0;
   }

   &.desktop{
      .heading{
         font-size: 5vw;
      }
   }
   &.tablet{
      .heading{
         font-size: 8vw;
      }
   }
   &.mobile{
      .heading{
         display: flex;
         flex-direction: column;
         justify-content: center;

         .user-count{
            font-size: 30vw;
            line-height: 30vw;
         }
         .user{
            margin-bottom: 1em;
         }
      }
   }
}
</style>
