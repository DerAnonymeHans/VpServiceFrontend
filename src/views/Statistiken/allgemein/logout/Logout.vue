<!-- @format -->
<script setup>
import { fetchAPI } from "@/App.vue";
</script>
<template>
   <button class="btn" @click="logout">Ausloggen</button>
</template>
<script>
export default {
   inject: ["isLoggedIn"],
   beforeMount() {},
   methods: {
      async logout() {
         await fetchAPI("/Statistic/Logout");
         this.isLoggedIn = false;
      },
   },
};
</script>
<style lang="scss" scoped>
@import "@/styles/_variables.scss";
</style>
