<script setup>
import { computed } from "vue";
import Navigation from "./navigation/Navigation.vue";
</script>

<template>
   <main>
      <Navigation />

      <div>{{page}}</div>
      <div>{{statistic}}</div>
   </main>
</template>

<script>
export default {
   data() {
      return {
         page: "Sandkasten",
         statistic: "gesamtzahlen",
      };
   },
   provide() {
      return {
         page: computed({
            get: () => {
               if(typeof sessionStorage.getItem('stat-page') !== "string") return this.page;
               return sessionStorage.getItem('stat-page')
            },
            set: (val) => {
               sessionStorage.setItem("stat-page", val)
               this.page = val;
            },
         }),
         statistic: computed({
            get: () => {
               if(typeof sessionStorage.getItem('stat-name') !== "string") return this.statistic;
               return sessionStorage.getItem('stat-name')
            },
            set: (val) => {
               sessionStorage.setItem("stat-name", val)
               this.statistic = val;
            },
         }),
      };
   },
   methods: {

   }
};
</script>

<style lang="scss" scoped></style>
