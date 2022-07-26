<!-- @format -->
<script setup>
import Setting, { SettingModel } from "./Setting.vue";
import KLP from "@/structs/KeyLabelPair.js";
</script>
<template>
   <div class="box" v-for="block in settingBlocks" :key="block.title">
      <h2>{{ block.title }}</h2>
      <Setting
         v-for="setting in block.settings"
         v-bind:key="setting.key"
         :_key="setting.key"
         :name="setting.name"
         :description="setting.desc"
         :options="setting.options"
         :defaultValue="setting.defaultVal"
         @optionChange="optionChange"
      />
   </div>
</template>
<script>
export default {
   data() {
      return {
         settingBlocks: [
            new SettingBlock("Cache Einstellungen", [
               new SettingModel("all-cache", "Cache", "Hier kannst du alle gecacheten Daten (siehe untere beiden Punkte) löschen.", [
                  new KLP("delete", "Löschen"),
               ]),
               new SettingModel(
                  "stat-cache",
                  "Statistik Cache",
                  "Alle Daten die vom Server geladen werden, werden, um die Performance zu steigern und Datenvolumen zu sparen, lokal gecached. Das kann dazu führen, das die angezeigten Daten nicht immer aktuell sind. Normalerweise werden die Daten nach Beenden der Browsersitzung gelöscht, hier kannst du sie aber manuell löschen.",
                  [new KLP("delete", "Löschen")]
               ),
               new SettingModel(
                  "selection-cache",
                  "Auswahl Cache",
                  "Jede Auswahl die du triffst wird gecached, so das sie auch, nachdem du die Seite neulädst noch die selbe ist. Hier kannst du diese Cache löschen.",
                  [new KLP("delete", "Löschen")]
               ),
            ]),
            new SettingBlock("Nutzungserfahrung", [
               new SettingModel(
                  "stat-scroll",
                  "Scrolling",
                  "Hier kannst du entscheiden ob nach klicken des 'Diagramm erstellen' Knopfes, der Bildschirm zum Diagramm gescrollt werden soll.",
                  [new KLP("true", "Scrollen"), new KLP("false", "Nicht scrollen")],
                  localStorage.getItem("stat-scroll")
               ),
            ]),
         ],
      };
   },
   methods: {
      optionChange(val) {
         switch (val.option) {
            case "stat-cache":
               this.deleteStatCache();
               break;
            case "selection-cache":
               this.deleteSelectionCache();
               break;
            case "all-cache":
               this.deleteStatCache();
               this.deleteSelectionCache();
               break;
            case "stat-scroll":
               this.toggleStatScroll(val.value);
               break;
         }
      },
      deleteStatCache() {
         window.statDB.transaction(["cached-data"], "readwrite").objectStore("cached-data").clear();
      },
      deleteSelectionCache() {
         sessionStorage.clear();
      },
      toggleStatScroll(val) {
         localStorage.setItem("stat-scroll", val);
      },
   },
};
class SettingBlock {
   constructor(title, settings) {
      this.title = title;
      this.settings = settings;
   }
}
</script>
<style lang="scss" scoped>
@import "@/styles/_variables.scss";
.box {
   margin-bottom: $margin;
   h2 {
      text-align: center;
      color: $col-dark;
      margin-top: 0;
   }
   > * {
      &:not(:last-child) {
         margin-bottom: $margin;
      }
   }
}
</style>
