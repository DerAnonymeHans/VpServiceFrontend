<!-- @format -->
<script setup>
import { fetchAPI, sleep } from "@/App.vue";
import MailBody from "./MailBody.vue";
</script>
<template>
   <div class="mail box" ref="mail">
      <div class="mail-head" @click="toggleOpen">
         <p class="subject">{{ subject }}</p>
         <div class="flex">
            <p class="sender">{{ senderDisplayName.length > 0 ? senderDisplayName : sender }}</p>
            <p class="datetime">{{ dateTime }}</p>
         </div>
      </div>
      <transition name="height-fade">
         <div class="mail-body-container" v-if="open">
            <hr />
            <div class="btn-container flex">
               <button class="btn-border center" v-if="isImproved" @click="toggleRawBody">
                  {{ displayRaw ? "Verbessert anzeigen" : "Original anzeigen" }}
               </button>
               <button class="btn-border center" @click="toggleAnswer">{{ isAnswering ? "Abbrechen" : "Antworten" }}</button>
            </div>
            <div v-if="isAnswering" class="answering-container">
               <input v-model="mailSubjectToSend" type="text" placeholder="Betreff" />
               <textarea v-model="mailBodyToSend" placeholder="Text"></textarea>
               <button class="btn-focus center send-btn" @click="sendAnswer">Antworten</button>
            </div>
            <div class="mail-bodies">
               <div v-if="displayRaw" v-html="rawBody"></div>
               <MailBody :number="0" :bodies="bodies" v-else />
            </div>
            <div class="btn-container flex">
               <button class="btn-border center" @click="openLernsax"><a>Lernsax öffnen</a></button>
               <button class="btn-border center" @click="closeMail">Schließen</button>
            </div>
         </div>
      </transition>
   </div>
</template>
<script>
export default {
   props: {
      open: { type: Boolean, required: true },
      subject: { type: String, required: true },
      sender: { type: String, required: true },
      senderDisplayName: { type: String },
      dateTime: { type: String, required: true },
      id: { type: String, required: true },
      preLoad: { type: Boolean, required: true },
      wasOpen: { type: Boolean, required: true },
   },
   data() {
      return {
         rawBody: "",
         bodies: [],
         isImproved: false,
         displayRaw: false,
         isAnswering: false,
         mailBodyToSend: "",
         mailSubjectToSend: "",
      };
   },
   async mounted() {
      await sleep(1000);
      this.preLoad && this.loadBody();
      this.mailSubjectToSend = "Re:" + this.subject;
      console.log(this.subject);
   },
   updated() {
      if (this.wasOpen) {
         this.closeMail(false);
      }
   },
   methods: {
      async toggleOpen() {
         const isOpening = !this.open;

         isOpening && this.loadBody();

         this.$emit("toggleOpen", {
            id: this.id,
            isClosing: this.open,
            isOpening: !this.open,
            setWasOpen: true,
         });

         await sleep(550);
         if (isOpening) {
            window.scrollBy({ top: this.$refs.mail.getBoundingClientRect().top - window.innerHeight * 0.1, behavior: "smooth" });
         }
      },
      async closeMail(toggle = true) {
         const rect = this.$refs.mail.getBoundingClientRect();
         const scrollToTop = rect.top - window.innerHeight * 0.1;
         const scrollByHeight = -(this.$refs.mail.getBoundingClientRect().height - 80);
         let scrollBy = Math.abs(scrollToTop) < Math.abs(scrollByHeight) ? scrollToTop : scrollByHeight;

         if (this.$refs.mail.offsetTop + rect.height > document.documentElement.scrollHeight - rect.height && toggle) {
            scrollBy = scrollByHeight;
         }
         window.scrollBy({ top: scrollBy, behavior: "smooth" });

         toggle &&
            this.$emit("toggleOpen", {
               id: this.id,
               isClosing: this.open,
               isOpening: !this.open,
               setWasOpen: false,
            });
      },
      async loadBody() {
         this.displayRaw = localStorage.getItem("ls-service-mail-displayRaw") === "true" ? true : false;
         try {
            this.rawBody = await this.getFromDb(this.id);
            this.bodies = this.splitRawBody(this.rawBody);
            return;
         } catch {
            if (!navigator.onLine) {
               this.rawBody = "Die Email kann nicht geladen werden, weil du offline bist.";
               this.bodies = [this.rawBody];
               return;
            }
         }

         const res = await fetchAPI(`/Lernsax/Service/Mail/MailBody/${this.id}`).then((res) => res.json());
         if (res.isSuccess) {
            this.rawBody = res.body;
            this.bodies = this.splitRawBody(this.rawBody);
            window.lernsaxDB.transaction(["mails"], "readwrite").objectStore("mails").add({ mail: this.rawBody, mailId: this.id });
            return;
         }
         this.rawBody = "***Leider ist etwas schief gelaufen. Bitte öffne die Email in Lernsax.***";
         this.bodies = [];
      },
      splitRawBody(rawBody) {
         const bodies = rawBody.replaceAll("<q>", "").replaceAll("</q>", "").split("-----Original Message-----");
         for (let i = 1; i < bodies.length; i++) {
            bodies[i] = bodies[i].replaceAll(`<br>${"&gt;".repeat(i)}`, "<br>");
         }
         if (bodies.length > 1) this.isImproved = true;
         return bodies;
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
      openLernsax() {
         window.open("https://www.lernsax.de/wws/9.php#/wws/105592.php");
      },
      toggleRawBody() {
         localStorage.setItem("ls-service-mail-displayRaw", !this.displayRaw);
         this.displayRaw = !this.displayRaw;
      },
      toggleAnswer() {
         this.isAnswering = !this.isAnswering;
      },
      async sendAnswer() {
         const res = await fetchAPI(`/Lernsax/Service/Mail/Send`, {
            method: "POST",
            body: JSON.stringify({
               receiver: this.sender,
               subject: this.mailSubjectToSend,
               body: this.mailBodyToSend,
            }),
         }).then((res) => res.json());
         if (res.isSuccess) {
            this.$emit("showModal", { title: "Erfolg", content: "Die Email wurde erfolgreich versendet." });
            this.mailBodyToSend = "";
            this.mailSubjectToSend = "";
            return;
         }
         this.$emit("showModal", { title: "Fehlschlag", content: res.message });
      },
   },
};
</script>
<style lang="scss" scoped>
@import "@/styles/_variables.scss";
.box {
   padding: $padding * 0.5;
   background-color: var(--bg-medium);
   border-color: var(--bg-medium);
}

.mail {
   margin-bottom: $margin * 0.5;
   color: var(--font);
   p {
      margin: $margin * 0.2 0;
   }
   hr {
      border-color: var(--col-light);
   }
   .subject {
      font-weight: bold;
      color: $accent;
   }
   .flex {
      .datetime {
         font-style: italic;
         margin-left: auto;
      }
   }

   .btn-container {
      margin-top: $margin * 0.5;

      > * {
         margin-right: $margin * 0.5;

         &:last-child {
            margin-right: 0;
         }
      }
   }
   .btn-border {
      background-color: var(--bg-medium);
      border-color: var(--col-light);
      color: var(--font);
   }
}

.answering-container {
   margin: $margin;
   margin-inline: 0;
   textarea,
   input {
      width: 100%;
      box-sizing: border-box;
      background: var(--bg-medium);
      border: 2px solid var(--col-light);
      font-size: 11pt;
      color: var(--font);
      font-family: Arial, Helvetica, sans-serif;
      resize: vertical;

      &:focus {
         outline: 1px solid $accent;
      }
   }
   input {
      height: 2em;
      margin-bottom: $margin;
   }
   textarea {
      height: 50vh;
   }
   .send-btn {
      width: fit-content;
      padding: $padding * 0.5;
      padding-inline: $padding;
      margin: auto;
   }
}
</style>
