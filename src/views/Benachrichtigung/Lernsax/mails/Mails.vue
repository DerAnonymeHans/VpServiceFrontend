<!-- @format -->
<script setup>
import { fetchAPI } from "@/App.vue";
import Mail from "./Mail.vue";
</script>
<template>
   <div class="content">
      <div class="mails">
         <div v-for="mailHead in heads" :key="mailHead.id">
            <fieldset v-if="typeof mailHead.timeLabel === 'string'">
               <legend>{{ mailHead.timeLabel }}</legend>
            </fieldset>
            <Mail
               :sender="mailHead.sender"
               :subject="mailHead.subject"
               :dateTime="mailHead.dateTime"
               :id="mailHead.id"
               :open="mailHead.open"
               :preLoad="mailHead.preLoad"
               @toggleOpen="handleToggleOpen"
            />
         </div>
      </div>
      <div class="bottom">
         <button class="btn scroll-top-btn" @click="scrollToTop">Nach oben</button>
      </div>
   </div>
</template>
<script>
export default {
   data() {
      return {
         heads: JSON.parse(localStorage.getItem("ls-service-mail-heads")),
      };
   },
   beforeMount() {
      this.loadMailHeads();
   },
   methods: {
      async loadMailHeads() {
         const res = await fetchAPI("/Lernsax/Service/Mail/Heads").then((res) => res.json());
         let lastLabel;
         const todaysDate = new Date(Date.now()).getDate();
         for (let i = 0; i < res.body.length; i++) {
            const head = res.body[i];
            head.open = false;
            head.preLoad = i < 3;

            const date = new Date(Date.parse(head.dateTime));

            let label;
            if (date.getDate() === todaysDate) label = "heute";
            else if (date.addDays(1).getDate() === todaysDate) label = "gestern";
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
         this.heads = res.body;
         localStorage.setItem("ls-service-mail-heads", JSON.stringify(this.heads));
      },
      handleToggleOpen(e) {
         this.heads = this.heads.map((head) => {
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

   .bottom {
      width: 100%;
      display: grid;
      place-items: center;
      margin: 8vh 0;
   }

   fieldset {
      border: none;
      border-top: 1px dotted $col-text;
      legend {
         margin: auto;
         color: $col-text;
      }
   }
}
</style>
