<!-- @format -->

<script setup>
import IconRepo from "@/repos/IconRepo.vue";
import Input from "@/components/input/Input.vue";
import Modal from "@/components/modal/Modal.vue";
import { fetchAPI } from "@/App.vue";
</script>
<template>
   <div class="login-container" :class="mq.current">
      <iframe id="dummy" style="display: none; opacity: 0"></iframe>
      <div class="icon">
         <IconRepo name="lock" />
      </div>
      <article class="explanation">
         In den Statistiken findest du Daten wie welche Lehrer/Fächer/Klassen/Klassenstufen/Kurse den meisten Ausfall haben, in welchen Fächern deine
         Klasse wie viel Vertretung hatte, wann du viel Ausfall hattest und wie du mit deinem Ausfall im Schulvergleich dastehst und noch viel mehr.
         <br />
         Damit sich nur schulinterne Personen die Statistiken anschauen können - aus datenschutzrechtlichen Gründen - sind sie passwortgeschützt.
         Passwort und Nutzername gleichen sich dabei mit denen der Schulwebseite.
      </article>
      <form class="form" id="login-form" @submit="submit">
         <Input type="text" label="Nutzername" name="name" :isInvert="true" :defaultValue="username" />
         <Input type="password" label="Passwort" name="pw" :isInvert="true" :defaultValue="password" />
         <div>
            <input type="checkbox" id="accept-agb" name="accept-agb" />
            <label for="accept-agb">Ich akzeptiere die AGB</label>
         </div>
         <div class="button-container">
            <button class="btn-focus" type="submit">Einloggen</button>
         </div>
      </form>
      <Modal :isOpen="showModal" @close="showModal = !showModal" :title="modalTitle" :content="modalContent" :buttons="[]" />
   </div>
</template>
<script>
export default {
   inject: ["isLoggedIn", "mq"],
   data() {
      return {
         showModal: false,
         modalTitle: "",
         modalContent: "",
         username: "",
         password: "",
      };
   },
   async beforeMount() {
      try {
         let res = await fetchAPI("/Statistic/IsLoggedIn", { credentials: "include" }).then((res) => res.json());
         if (res === true) this.isLoggedIn = true;
      } catch {}

      const username = sessionStorage.getItem("cached-stat-user"),
         password = sessionStorage.getItem("cached-stat-pw");
      console.log(username, password);
      if (username !== null) this.username = username;
      if (password !== null) this.password = password;
   },
   methods: {
      submit(e) {
         e.preventDefault();
         const formdata = new FormData(e.target);
         fetchAPI("/Statistic/Login", { method: "POST", body: formdata, credentials: "include" })
            .then((res) => res.json())
            .then((res) => {
               console.log(res);
               if (res.isSuccess) {
                  this.modalTitle = "Erfolg";
                  this.isLoggedIn = true;
                  e.target.reset();
               } else this.modalTitle = "Fehlschlag";

               this.modalContent = res.message;
               this.showModal = true;
            });
      },
   },
};
</script>
<style lang="scss" scoped>
@import "@/styles/_variables.scss";
@import "@/styles/_mixins.scss";
.login-container {
   @include box;
   margin-top: 12vh;
   .icon {
      height: 20vh;
      aspect-ratio: 1;
      margin: auto;
      color: $accent;
   }
   .explanation {
      background: none !important;
      columns: 1;
      word-break: break-word;
   }
   .form {
      margin: $margin auto;

      .button-container {
         display: flex;
         justify-content: center;
         margin-top: $margin;
      }
   }

   &.desktop {
      .form {
         width: 50%;
      }
   }
   &.tablet {
      .form {
         width: 70%;
      }
   }
   &.mobile {
      .form {
         width: 100%;
      }
   }
}
</style>
