<!-- @format -->

<script setup>
import { ref } from "vue";
import Input from "@/components/input/Input.vue";
import Modal from "@/components/modal/Modal.vue";
import { fetchAPI } from "@/App.vue";
</script>
<template>
   <div class="form-container" :class="mq.current">
      <iframe id="dummy-frame" frameborder="0"></iframe>
      <form id="subscribe-form" @submit="submit" target="dummy-frame">
         <Input type="text" label="Anrede/Name" name="name" />
         <Input type="text" label="Email" name="mail" />
         <Input type="number" label="Klassenstufe" name="grade" />
         <div class="agb">
            <input type="checkbox" id="accept-agb" name="accept-agb" />
            <label for="accept-agb">Ich akzeptiere die AGB</label>
         </div>
         <button class="btn-focus" type="submit">Los gehts!</button>
      </form>
      <Modal :isOpen="showModal" @close="showModal = !showModal" :title="modalTitle" :content="modalContent" :buttons="[]" />
   </div>
</template>
<script>
export default {
   inject: ["mq"],
   component: {
      Input,
   },
   data() {
      return {
         modalTitle: "",
         modalContent: "",
         showModal: false,
      };
   },
   methods: {
      submit(e) {
         e.preventDefault();
         const formdata = new FormData(e.target);
         fetchAPI("/Subscribe", { method: "POST", body: formdata })
            .then((res) => res.json())
            .then((res) => {
               if (res.isSuccess) {
                  this.modalTitle = "Erfolg";
                  e.target.reset();
                  this.$emit("newUser");
               } else this.modalTitle = "Fehlschlag";

               this.modalContent = res.message;
               this.showModal = true;
            });
      },
   },
};
</script>
<style lang="scss">
@import "@/styles/_variables.scss";

.form-container {
   width: 100%;
   background-color: $col-dark;

   form {
      display: flex;
      flex-direction: column;
      margin: auto;
      padding: $padding * 2 0;

      > * {
         margin: $margin * 0.5 0;
      }
      button {
         width: 50%;
         margin: $margin auto;
      }

      .agb {
         color: white;
      }
   }

   &.desktop {
      form {
         width: 30vw;
      }
   }
   &.tablet {
      form {
         width: 60vw;
      }
   }
   &.mobile {
      form {
         width: 80vw;
      }
   }
}

#dummy-frame {
   display: none;
   opacity: 0;
}
</style>
