<!-- @format -->
<script setup>
import IconRepo from "@/repos/IconRepo.vue";
</script>
<template>
   <Transition name="modal">
      <div v-show="isOpen" class="modal-container" :class="mq.current">
         <div class="flex head">
            <h3>{{ title }}</h3>
            <button class="btn-svg" @click="close()"><IconRepo name="close" /></button>
         </div>
         <div class="content" v-html="content"></div>
         <slot></slot>
         <div v-for="button in buttons" :key="button.name" class="button-container">
            <button :class="button.className" @click="close(button.onClick)">{{ button.text }}</button>
         </div>
      </div>
   </Transition>
</template>
<script>
export default {
   props: {
      buttons: Array,
      title: String,
      content: String,
      isOpen: {
         type: Boolean,
         required: true,
      },
   },
   inject: ["mq"],
   data() {
      return {
         clickTime: null,
      };
   },
   mounted() {},
   updated() {
      if (this.isOpen) {
         this.clickTime = Date.now();
         window.addEventListener("click", this.onClick);
      } else {
         window.removeEventListener("click", this.onClick);
      }
   },
   methods: {
      onClick(e) {
         if(this.mq.tabletMinus) return;
         if (this.clickTime === null) {
            this.clickTime = Date.now();
            return;
         }
         if (this.clickTime > Date.now() - 10) return;
         const isModal = (el) => {
            if (el.classList.contains("modal-container")) return true;
            if (el.id === "app") return false;
            return isModal(el.parentElement);
         };
         if (isModal(e.target)) return;
         this.clickTime = null;
         this.close();
      },
      close(callback) {
         if (typeof callback === "function") callback();
         this.$emit("close");
      },
   },
};

class Button {
   constructor(text, className, onClick = () => {}) {
      this.text = text;
      this.className = className;
      this.onClick = onClick;
   }
}
export { Button };
</script>
<style lang="scss">
@import "@/styles/variables";
@import "@/styles/components";
@import "@/styles/helper";
.modal-container {
   position: fixed;
   height: fit-content;
   z-index: 500;
   background-color: $col-light;
   border-radius: $border-radius;
   padding: $padding;
   box-shadow: 0px 0px 0.5em 0.5em rgba($col-dark, 0.1);
   border-top: 1em solid $accent;
   box-sizing: border-box;
   overflow: auto;

   .head {
      :last-child {
         margin-left: auto;
      }
   }

   .content {
      overflow: auto;
   }

   .button-container {
      margin-top: $margin;
   }

   &.modal-enter-active,
   &.modal-leave-active {
      transition: all 0.3s ease;
   }

   &.modal-enter-from,
   &.modal-leave-to {
      opacity: 0;
      transform: translateY(50px);
   }

   &.ultrawide {
      width: 30vw;
      top: 20vh;
      left: 35vw;
      max-height: 60vh;
      .content {
         max-height: 35vh;
      }
   }
   &.desktop {
      width: 40vw;
      top: 20vh;
      left: 30vw;
      max-height: 60vh;
      .content {
         max-height: 35vh;
      }
   }
   &.tablet {
      width: 70vw;
      top: 30vh;
      left: 15vw;
      max-height: 55vh;
      .content {
         max-height: 30vh;
      }
   }
   &.mobile {
      width: 90vw;
      bottom: 5vh;
      left: 5vw;
      max-height: 70vh;
      .content {
         max-height: 55vh;
      }
   }
}
</style>
