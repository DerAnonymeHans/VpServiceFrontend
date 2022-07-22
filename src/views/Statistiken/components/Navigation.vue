<!-- @format -->

<script setup>
import Switch from "@/components/switch/Switch.vue";
import ScrollSelector, { Item } from "./ScrollSelector.vue";
</script>
<template>
   <div class="nav-container" :class="mq.current">
      <div class="center">
         <Switch :options="['Allgemein', 'Sandkasten', 'Ranglisten']" :default="page" @switch="changePage" />
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
   inject: ["page", "statistic", "mq"],
   data() {
      return {
         itemsContainer: {
            Allgemein: [new Item("Erklärungen", "info"), new Item("Einstellungen", "settings"), new Item("Logout", "logout")],
            Sandkasten: [
               new Item("Gesamtzahlen", "gesamtzahlen"),
               new Item("Nach Zeit", "zeit"),
               new Item("Beziehungen", "beziehungen"),
               new Item("Relativ", "relativ"),
               new Item("Im Vergleich", "vergleich"),
               // new Item("Durchschnitte", "durchschnitt"),
            ],
            Ranglisten: [
               new Item("Gesamtzahlen", "gesamtzahlen"),
               new Item("Nach Zeit", "zeit"),
               new Item("Beziehungen", "beziehungen"),
               new Item("Relativ", "relativ"),
               new Item("Beschreibungen", "beschreibungen"),
            ],
         },
         items: [],
      };
   },
   mounted() {
      this.changePage(this.page);
   },
   methods: {
      changePage(newPage) {
         this.page = newPage;
         this.items = this.itemsContainer[newPage];
      },
   },
};
</script>
<style lang="scss" scoped>
@import "@/styles/helper.scss";
@import "@/styles/variables.scss";
.nav-container {
   padding-top: 12vh;
   padding-bottom: $padding;
   background-color: $col-dark;

   .scroll-selector {
      margin: $margin auto;
      width: 100%;
      display: flex;
      justify-content: center;
   }

   &.ultrawide {
      .scroll-selector {
         height: max(7vh, 100px);
      }
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
