<!-- @format -->

<script setup>
import { RouterLink, RouterView } from "vue-router";
import Navbar from "@/components/navigation/Navbar.vue";
import Footer from "@/components/footer/Footer.vue";
</script>

<template>
   <Navbar />
   <RouterView />
   <Footer />
</template>

<script>
export default {
   beforeMount() {
      if (window.location.origin === "http://kepleraner.herokuapp.com")
         window.location = "https://kepleraner.herokuapp.com" + window.location.pathname + window.location.search;

      const params = new URLSearchParams(window.location.search);
      sessionStorage.setItem("cached-stat-user", params.get("stat-user"));
      sessionStorage.setItem("cached-stat-pw", params.get("stat-pw"));
   },
};
const URL = import.meta.env.VITE_API_URL;
console.log(URL);
const fetchAPI = (path, obj = {}) => fetch(URL + path, obj);

const sleep = (ms) => new Promise((resolve, reject) => setTimeout(resolve, ms));

export { fetchAPI, sleep };
</script>

<style lang="scss">
@import "@/styles/variables";
html {
   height: 100%;
}
body {
   margin: 0;
   height: fit-content;
   font-family: "Gadugi", sans-serif;
}
::selection {
   background-color: $accent;
   color: $col-light;
}
article {
   text-align: justify;
   column-gap: $margin * 2;
   padding: $padding;
   color: $col-text;
   font-size: 1.15em;
   line-height: 1.5em;
   column-width: 300px;
}
table {
   td,
   th {
      border-left: $margin solid #fff0;
   }

   tr > td:first-child {
      border: 0px;
   }
}

::-webkit-scrollbar {
   width: 10px;
   background-color: $col-dark;
}
::-webkit-scrollbar-thumb {
   background-color: lighten($col-dark, 40%);

   &:hover {
      background-color: lighten($col-dark, 60%);
   }
}
</style>
