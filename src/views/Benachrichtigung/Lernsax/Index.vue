<!-- @format -->
<script setup>
import { fetchAPI, sleep } from "@/App.vue";
import ScrollSelector, { Item } from "@/components/navigation/ScrollSelector.vue";
import LernsaxSettings from "./settings/LernsaxSettings.vue";
import LernsaxMails from "./mails/Mails.vue";
</script>
<template>
   <div class="lernsax-page" :class="mq.current">
      <div class="scroll-selector center">
         <ScrollSelector @select="(item) => switchPage(item.key)" :default="page" :items="items" />
      </div>
      <div class="content-space">
         <LernsaxSettings
            v-if="page === 'settings'"
            :methodOnMount="settingsMethodOnMount"
            @changeColorScheme="(e) => $emit('changeColorScheme', e)"
         />
         <LernsaxMails v-if="page === 'email'" :methodOnMount="settingsMethodOnMount" />
      </div>
   </div>
</template>
<script>
export default {
   inject: ["mq"],
   data() {
      return {
         page: "",
         items: [new Item("Einstellungen", "settings"), new Item("Email", "email")],
         settingsMethodOnMount: {},
      };
   },
   async beforeMount() {
      this.page = this.getPage();

      const hasCreds = await this.hasValidCredentials();
      if (!hasCreds) {
         await sleep(500);
         this.settingsMethodOnMount = { option: "change-creds", value: "" };
         this.switchPage("settings");
         await sleep(500);
         this.settingsMethodOnMount = null;
      }
      this.dbSetup();
   },
   methods: {
      getPage() {
         const params = new URLSearchParams(window.location.search);
         const action = params.get("action");
         if (action !== null) {
            params.delete("action");
            window.history.pushState("", "", window.location.origin + window.location.pathname + "?" + params.toString());
            return action;
         }
         return typeof localStorage.getItem("lernsax-page") !== "string" ? "" : localStorage.getItem("lernsax-page");
      },
      switchPage(page) {
         localStorage.setItem("lernsax-page", page);
         this.page = page;
      },
      async hasValidCredentials() {
         const res = await fetchAPI("/Lernsax/HasValidCredentials").then((res) => res.json());
         return res.isSuccess ? res.body : false;
      },
      dbSetup() {
         let request = window.indexedDB.open("LernsaxDB", 1);
         request.onerror = (e) => {
            return resolve();
         };
         request.onsuccess = (e) => {
            window.lernsaxDB = e.target.result;
         };
         request.onupgradeneeded = (e) => {
            window.lernsaxDB = e.target.result;
            const store = window.lernsaxDB.createObjectStore("mails", { keyPath: "mailId" });
            store.createIndex("mailBody", "mailBody", { unique: false });
         };
      },
   },
};
</script>
<style lang="scss" scoped>
@import "@/styles/_variables.scss";
@import "@/styles/helper.scss";

.lernsax-page {
   background-color: var(--bg);
   min-height: 100vh;
   .scroll-selector {
      background-color: $col-dark;
      padding: $padding * 0.5 0;
      height: max(5vh, 100px);
      width: 100%;
   }

   // &.ultrawide {
   // }

   // &.ultrawide,
   // &.desktop {
   // }

   // &.tablet {
   // }

   // &.mobile {
   // }
}
</style>
