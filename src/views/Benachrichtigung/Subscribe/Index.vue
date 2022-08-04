<!-- @format -->

<script setup>
import Header from "./Header.vue";
import Main from "./Main.vue";
import Form from "./Form.vue";
import { fetchAPI } from "@/App.vue";
</script>
<template>
   <Header :userCount="userCount" />
   <Main />
   <Form @newUser="newUser()" />
</template>
<script>
export default {
   inject: ["fetchAPI"],
   data() {
      return {
         userCount: "#",
      };
   },
   async mounted() {
      this.getUserCount();
   },
   methods: {
      getUserCount() {
         fetchAPI("/GetUserCount")
            .then((res) => res.json())
            .then((res) => {
               if (res.isSuccess) this.userCount = res.body;
            });
      },
      newUser() {
         window.scrollBy({ top: -99999, left: 0, behavior: "smooth" });
         setTimeout(this.getUserCount, 1000);
      },
   },
};
</script>
<style lang="scss"></style>
