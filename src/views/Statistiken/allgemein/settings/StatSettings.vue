<!-- @format -->
<script setup>
import Settings, { SettingBlock, SettingModel } from "../../../../components/settings/Settings.vue";
import KLP from "@/structs/KeyLabelPair.js";
</script>
<template>
   <Settings :settings="settings" @settingChange="settingChange" />
</template>
<script>
export default {
   data() {
      return {
         settings: [
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
      settingChange(val) {
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
</script>
<style lang="scss" scoped></style>
