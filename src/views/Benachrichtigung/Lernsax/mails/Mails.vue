<!-- @format -->
<script setup>
import { fetchAPI, sleep } from "@/App.vue";
import Mail from "./Mail.vue";
import Input from "@/components/input/Input.vue";
</script>
<template>
   <div class="content">
      <Input
         label="Suchen..."
         :isInvert="scheme === 'lightmode'"
         @focus="startSearching"
         @blur="(e) => e.target.value.length === 0 && endSearching()"
         @input="inputSearch"
      />
      <transition name="height-fade" mode="out-in">
         <div class="search-options" v-if="isSearching">
            <div class="flex search-buttons">
               <button class="btn" @click="searchBodies">Im Text suchen</button>
               <button class="btn" @click="endSearching">Abbrechen</button>
            </div>
         </div>
      </transition>
      <div class="mails">
         <p class="no-mails-found" v-if="renderedMailHeads.length === 0">Es wurden keine Emails gefunden...</p>
         <div v-for="mailHead in renderedMailHeads" :key="mailHead.id">
            <fieldset v-if="typeof mailHead.timeLabel === 'string'">
               <legend>{{ mailHead.timeLabel }}</legend>
            </fieldset>
            <Mail
               :sender="mailHead.sender"
               :subject="mailHead.subject"
               :dateTime="mailHead.dateTime"
               :id="mailHead.id"
               :open="mailHead.open"
               :wasOpen="mailHead.wasOpen"
               :preLoad="mailHead.preLoad"
               @toggleOpen="handleToggleOpen"
            />
         </div>
      </div>
      <footer>
         <button class="btn scroll-top-btn" @click="scrollToTop">Nach oben</button>
      </footer>
   </div>
</template>
<script>
export default {
   inject: ["colorScheme"],
   data() {
      return {
         allMailHeads: JSON.parse(localStorage.getItem("ls-service-mail-heads")),
         renderedMailHeads: JSON.parse(localStorage.getItem("ls-service-mail-heads")),
         isSearching: false,
         searchString: "",
      };
   },
   beforeMount() {
      this.loadMailHeads();
   },
   mounted() {},
   computed: {
      scheme() {
         return this.colorScheme();
      },
   },
   methods: {
      async loadMailHeads() {
         const res = await fetchAPI("/Lernsax/Service/Mail/Heads").then((res) => res.json());
         let lastLabel;
         for (let i = 0; i < res.body.length; i++) {
            const head = res.body[i];
            head.open = false;
            head.wasOpen = false;
            head.preLoad = i < 3;

            const date = new Date(Date.parse(head.dateTime));

            let label;
            if (date.addDays(1).valueOf() > Date.now()) label = "heute";
            else if (date.addDays(2).valueOf() === Date.now()) label = "gestern";
            else if (date.addDays(8).valueOf() > Date.now()) label = "diese Woche";
            else if (date.addDays(31).valueOf() > Date.now()) label = "älter als eine Woche";
            else if (date.addDays(365).valueOf() > Date.now()) label = "älter als ein Monat";
            else label = "älter als ein Jahr";

            if (label !== lastLabel) {
               lastLabel = label;
               head.timeLabel = label;
            }

            head.dateTime = new Intl.DateTimeFormat("de-DE", { dateStyle: "short", timeStyle: "short" }).format(date);
         }
         this.renderedMailHeads = res.body;
         this.allMailHeads = res.body;
         localStorage.setItem("ls-service-mail-heads", JSON.stringify(this.allMailHeads));
      },

      startSearching(e) {
         this.isSearching = true;
         e.target.value.length > 0 && this.inputSearch(e.target.value);
      },
      inputSearch(val) {
         if (typeof val !== "string" || !this.isSearching) return;
         this.searchString = val;
         val = val.toLowerCase();
         this.renderedMailHeads = this.allMailHeads.filter(
            (head) => head.subject.toLowerCase().includes(val) || head.sender.toLowerCase().includes(val) || head.dateTime.toLowerCase().includes(val)
         );
      },
      endSearching() {
         this.isSearching = false;
         this.renderedMailHeads = [...this.allMailHeads];
      },
      async searchBodies() {
         window.dispatchEvent(new Event("startloading"));
         const form = new FormData();
         form.append("search", this.searchString.toLowerCase());
         try {
            const res = await fetchAPI("/Lernsax/Service/Mail/SearchBody", { method: "POST", body: form }).then((res) => res.json());
            window.dispatchEvent(new Event("endloading"));
            if (res.isSuccess) {
               console.log(this.allMailHeads);
               this.renderedMailHeads = res.body.map((id) => this.allMailHeads.find((head) => head.id === id));
               return;
            }
         } catch {}
         this.renderedMailHeads = [];
         window.dispatchEvent(new Event("endloading"));
      },
      async handleToggleOpen(e) {
         this.renderedMailHeads = this.renderedMailHeads.map((head) => {
            head.wasOpen = false;
            if (head.open) {
               head.wasOpen = e.setWasOpen;
            }
            head.open = false;
            if (e.isOpening && e.id === head.id) {
               head.open = true;
            }
            return head;
         });
      },
      scrollToTop() {
         window.scrollTo({ top: 0, behavior: "smooth" });
      },
   },
};

Date.prototype.addDays = function (days) {
   let date = new Date(this.valueOf());
   date.setDate(date.getDate() + days);
   return date;
};
</script>
<style lang="scss" scoped>
@import "@/styles/_variables.scss";
.content {
   padding-bottom: $padding * 4;
   header {
      background-color: $col-dark;
   }
   footer {
      width: 100%;
      display: grid;
      place-items: center;
      margin: 8vh 0;
      position: static;
      background: none;
   }
   fieldset {
      border: none;
      border-top: 1px dotted var(--col-dark);
      legend {
         margin: auto;
         color: var(--font);
      }
   }
   .btn {
      background-color: var(--bg-medium);
      color: var(--font);
      border: 2px solid var(--col-light);
   }
   .search-options {
      .search-buttons {
         padding: $padding;
         margin: auto;
         width: fit-content;

         > * {
            margin-inline: $margin * 0.5;
         }
      }
   }
   .no-mails-found {
      margin: auto;
      width: fit-content;
      color: var(--font);
      background-color: var(--bg-medium);
      padding: $padding;
      border-radius: $border-radius;
   }
}
</style>
<style lang="scss">
.height-fade-enter-active,
.height-fade-leave-active {
   transition: all 0.5s;
   max-height: 500px;
}
.height-fade-enter-from,
.height-fade-leave-to {
   opacity: 0;
   max-height: 0px;
}
</style>
