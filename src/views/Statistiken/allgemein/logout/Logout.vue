<!-- @format -->

<template>
   <button class="btn" @click="logout">Ausloggen</button>
</template>
<script>
export default {
   inject: ["isLoggedIn"],
   beforeMount() {},
   methods: {
      logout() {
         document.cookie = "statAuth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
         this.isLoggedIn = false;
      },
   },
};
</script>
<style lang="scss" scoped>
@import "@/styles/_variables.scss";
</style>
