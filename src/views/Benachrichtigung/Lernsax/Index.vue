<!-- @format -->
<script setup>
import { fetchAPI, sleep } from "@/App.vue";
import ScrollSelector, { Item } from "@/components/navigation/ScrollSelector.vue";
import LernsaxSettings from "./settings/LernsaxSettings.vue";
</script>
<template>
   <div class="lernsax-page" :class="mq.current">
      <div class="scroll-selector center">
         <ScrollSelector @select="(item) => switchPage(item.key)" :default="page" :items="items" />
      </div>
      <div class="content-space">
         <LernsaxSettings v-if="page === 'settings'" :methodOnMount="settingsMethodOnMount" />
      </div>
   </div>
</template>
<script>
export default {
   inject: ["mq"],
   data() {
      return {
         page: typeof localStorage.getItem("lernsax-page") !== "string" ? "" : localStorage.getItem("lernsax-page"),
         items: [new Item("Einstellungen", "settings"), new Item("Email", "email")],
         settingsMethodOnMount: {},
      };
   },
   async beforeMount() {
      const hasCreds = await this.hasValidCredentials();
      if (!hasCreds) {
         await sleep(500);
         this.settingsMethodOnMount = { option: "change-creds", value: "" };
         this.switchPage("settings");
         await sleep(500);
         this.settingsMethodOnMount = null;
      }
   },
   methods: {
      switchPage(page) {
         localStorage.setItem("lernsax-page", page);
         this.page = page;
      },
      async hasValidCredentials() {
         const res = await fetchAPI("/Lernsax/HasValidCredentials").then((res) => res.json());
         return res.isSuccess ? res.body : false;
      },
   },
};
</script>
<style lang="scss" scoped>
@import "@/styles/_variables.scss";
@import "@/styles/helper.scss";

.lernsax-page {
   .scroll-selector {
      background-color: $col-dark;
      padding: $padding * 0.5 0;
      height: max(5vh, 100px);
      width: 100%;
   }

   &.ultrawide {
   }

   &.ultrawide,
   &.desktop {
   }

   &.tablet {
   }

   &.mobile {
   }
}
</style>
