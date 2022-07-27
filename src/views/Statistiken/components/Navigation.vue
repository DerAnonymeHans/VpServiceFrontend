<!-- @format -->

<script setup>
import Switch from "@/components/switch/Switch.vue";
import ScrollSelector, { Item } from "./ScrollSelector.vue";
import KeyLabelPair from "@/structs/KeyLabelPair.js";
</script>
<template>
   <div class="nav-container dont-print" :class="mq.current">
      <div class="center">
         <Switch :options="pages" :default="page" @switch="changePage" />
      </div>
      <div class="center">
         <select class="select-invert year-select" :value="defaultYear" @change="(e) => changeYear(e.target.value)">
            <option v-for="year in years" v-bind:key="year.short" :value="year.short">{{ year.long }}</option>
         </select>
      </div>
      <div class="scroll-selector vert-center">
         <ScrollSelector
            @select="
               (item) => {
                  statistic = item.key;
               }
            "
            :default="statistic"
            :items="items"
         />
      </div>
   </div>
</template>
<script>
export default {
   inject: ["page", "statistic", "year", "mq", "fetchStat"],
   data() {
      return {
         pages: [
            new KeyLabelPair("allgemein", "Allgemein"),
            new KeyLabelPair("sandkasten", "Sandkasten"),
            new KeyLabelPair("ranglisten", "Ranglisten"),
         ],
         itemsContainer: {
            allgemein: [new Item("Erklärungen", "info"), new Item("Einstellungen", "settings"), new Item("Logout", "logout")],
            sandkasten: [
               new Item("Gesamtzahlen", "gesamtzahlen"),
               new Item("Nach Zeit", "zeit"),
               new Item("Beziehungen", "beziehungen"),
               new Item("Relativ", "relativ"),
               new Item("Im Vergleich", "vergleich"),
               // new Item("Durchschnitte", "durchschnitt"),
            ],
            ranglisten: [
               new Item("Gesamtzahlen", "gesamtzahlen"),
               new Item("Nach Zeit", "zeit"),
               new Item("Beziehungen", "beziehungen"),
               new Item("Relativ", "relativ"),
               new Item("Beschreibungen", "beschreibungen"),
            ],
         },
         items: [],
         years: [],
         defaultYear: "21",
      };
   },
   async mounted() {
      this.changePage(this.page);
      this.years = await this.getYears();
      this.defaultYear = this.year;
   },
   methods: {
      changePage(newPage) {
         this.page = newPage;
         this.items = this.itemsContainer[newPage];
      },
      changeYear(year) {
         this.year = year;
         this.defaultYear = year;
      },
      async getYears() {
         const res = await this.fetchStat("/Years", false);
         return res.map((short) => {
            return { short: short, long: `${short}/${parseInt(short) + 1}` };
         });
      },
   },
};
</script>
<style lang="scss" scoped>
@import "@/styles/helper.scss";
@import "@/styles/variables.scss";
.nav-container {
   // padding-top: 12vh;
   padding-bottom: $padding;
   background-color: $col-dark;

   .year-select {
      margin-top: $margin;
   }

   .scroll-selector {
      margin: $margin auto;
      width: 100%;
      display: flex;
      justify-content: center;
   }

   &.desktop,
   &.ultrawide {
      .scroll-selector {
         height: max(6vh, 100px);
      }
      .year-select {
         width: max(5%, 80px);
      }
   }
   &.tablet {
      .scroll-selector {
         height: max(5vh, 100px);
      }
      .year-select {
         width: max(10%, 80px);
      }
   }
   &.mobile {
      .scroll-selector {
         height: max(5vh, 100px);
      }
      .year-select {
         width: 30%;
      }
   }
}
</style>
