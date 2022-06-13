<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from '@/components/navigation/Navbar.vue'
import Footer from '@/components/footer/Footer.vue';

</script>

<template>
  <Navbar />
  <RouterView />
  <Footer />
</template>

<script>
export default {
  
}
const URL = import.meta.env.VITE_API_URL;
const fetchAPI = (path, obj={}) => fetch(URL + path, obj)

const sleep = (ms) => new Promise((resolve, reject) => setTimeout(resolve, ms))

export { fetchAPI, sleep }
</script>

<style lang="scss">
@import "@/styles/variables";
html{
  height: 100%;
}
body{ 
  margin: 0;
  height: fit-content;
  font-family: 'Gadugi', sans-serif;
  // font-family: Arial;

}
article{
  background-color: $bg-medium;
  border-radius: $border-radius;
  text-align: justify;
  column-gap: $margin * 2;
  padding: $padding;
  color: $color-text;
  font-size: 1.2em;
  line-height: 1.5em;
  column-width: 300px;
}

</style>
