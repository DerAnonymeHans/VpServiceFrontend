<!-- @format -->

<script setup>
import Switch from "@/components/switch/Switch.vue";
import ScrollSelector, { Item } from "./ScrollSelector.vue";
</script>
<template>
   <div class="nav-container" :class="mq.current">
      <div class="center">
         <Switch
            :options="['Sandkasten', 'Ranglisten']"
            :default="page"
            @switch="
               (newpage) => {
                  page = newpage;
               }
            "
         />
      </div>
      <div class="scroll-selector vert-center">
         <ScrollSelector 
            @select="
               (item) => {
                  statistic = item.key
               }
            " 
            :default="statistic"
            :items="[
               new Item('Gesamtzahlen', 'gesamtzahlen'),
               new Item('Nach Zeit', 'zeit'),
               new Item('Beziehungen', 'beziehungen'),
               new Item('Relativ', 'relativ'),
               new Item('Im Vergleich', 'vergleich'),
               new Item('Durchschnitte', 'durchschnitt'),
            ]"
         />
      </div>
   </div>
</template>
<script>
export default {
   inject: ["page", "statistic", "mq"],
   methods: {},
};
</script>
<style lang="scss" scoped>
@import "@/styles/_variables.scss";
@import "@/styles/helper.scss";
.nav-container {
   padding-top: 12vh;
   padding-bottom: $padding;
   background-color: $bg-dark;

   .scroll-selector {
      margin: $margin auto;
      width: 100%;
      display: flex;
      justify-content: center;
   }

   &.desktop {
      .scroll-selector {
         height: max(6vh, 100px);
      }
   }
   &.tablet {
      .scroll-selector {
         height: max(5vh, 100px);
      }
   }
   &.mobile {
      .scroll-selector {
         height: max(5vh, 100px);
      }
   }
}
</style>
