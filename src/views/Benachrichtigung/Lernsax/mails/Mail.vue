<!-- @format -->
<script setup>
import { fetchAPI, sleep } from "@/App.vue";
</script>
<template>
   <div class="mail box" ref="mail">
      <div class="mail-head" @click="toggleOpen">
         <p class="subject">{{ subject }}</p>
         <div class="flex">
            <p class="sender">{{ sender }}</p>
            <p class="datetime">{{ dateTime }}</p>
         </div>
      </div>
      <div class="mail-body-container" v-if="open">
         <hr />
         <div class="mail-body" v-html="body"></div>
         <button class="btn-border center close-btn" @click="closeMail">Schließen</button>
      </div>
   </div>
</template>
<script>
export default {
   props: {
      open: { type: Boolean, required: true },
      subject: { type: String, required: true },
      sender: { type: String, required: true },
      dateTime: { type: String, required: true },
      id: { type: String, required: true },
      preLoad: { type: Boolean, required: true },
   },
   data() {
      return {
         body: "",
      };
   },
   async mounted() {
      await sleep(1000);
      this.preLoad && this.loadBody();
   },
   methods: {
      async toggleOpen() {
         const isOpening = !this.open;
         isOpening && this.loadBody();
         this.$emit("toggleOpen", { id: this.id, isClosing: this.open, isOpening: !this.open });

         await sleep(100);
         if (isOpening) {
            window.scrollBy({ top: this.$refs.mail.getBoundingClientRect().top - window.innerHeight * 0.1, behavior: "smooth" });
         }
      },
      async loadBody() {
         try {
            this.body = await this.getFromDb(this.id);
            return;
         } catch {}

         const res = await fetchAPI(`/Lernsax/Service/Mail/MailBody/${this.id}`).then((res) => res.json());
         if (res.isSuccess) {
            this.body = res.body;
            window.lernsaxDB.transaction(["mails"], "readwrite").objectStore("mails").add({ mail: this.body, mailId: this.id });
            return;
         }
         this.body = "***Leider ist etwas schief gelaufen.*** (<- nicht die eigentliche Email)";
      },
      async closeMail() {
         window.scrollBy({ top: this.$refs.mail.getBoundingClientRect().top - window.innerHeight * 0.1, behavior: "smooth" });
         this.toggleOpen();
      },
      getFromDb(mailId) {
         return new Promise(async (resolve, reject) => {
            const request = await window.lernsaxDB.transaction(["mails"]).objectStore("mails").get(mailId);

            request.onsuccess = (e) => {
               if (e.target.result === undefined) return reject();
               resolve(e.target.result.mail);
            };
            request.onerror = (e) => {
               reject();
            };
         });
      },
   },
};
</script>
<style lang="scss" scoped>
@import "@/styles/_variables.scss";
.box {
   padding: $padding * 0.5;
}

.mail {
   margin-bottom: $margin * 0.5;
   p {
      margin: $margin * 0.2 0;
   }
   .subject {
      font-weight: bold;
      color: $accent;
   }
   .flex {
      .sender {
      }
      .datetime {
         font-style: italic;
         margin-left: auto;
      }
   }

   .close-btn {
      margin: $margin 0;
   }
}
</style>
