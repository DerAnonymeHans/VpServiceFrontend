<!-- @format -->
<script setup>
import { fetchAPI } from "@/App.vue";
</script>
<template>
   <div class="flex box">
      <button class="btn" @click="logout">Ausloggen</button>
   </div>
</template>
<script>
export default {
   inject: ["isLoggedIn"],
   beforeMount() {},
   methods: {
      async logout() {
         await fetchAPI("/Statistic/Logout", { method: "POST", credentials: "include" });
         this.isLoggedIn = false;
      },
   },
};
</script>
<style lang="scss" scoped>
@import "@/styles/_variables.scss";
.flex {
   justify-content: center;
}
</style>
