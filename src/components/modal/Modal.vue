<!-- @format -->

<template>
   <Transition name="modal">
      <div v-show="isOpen" class="modal-container" :class="mq.current">
         <h3>{{ title }}</h3>
         <div v-html="content"></div>
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
   inject: ['mq'],
   data() {
      return {
         buttons: [...this.buttons, new Button("Schließen", "btn", this.close)],
         clickCount: 0
      };
   },
   updated() {
      if(this.isOpen){
         window.addEventListener("click", this.onClick)
      }else{
         window.removeEventListener("click", this.onClick)
      }
   },
   methods: {
      onClick(e){
         if(this.clickCount === 0){
            this.clickCount++;
            return;
         }
         const isModal = (el) => {
            if(el.classList.contains("modal-container")) return true;
            if(el.id === "app") return false;
            return isModal(el.parentElement);
         }
         if(isModal(e.target)) return;
         this.clickCount = 0;
         this.close();
      },
      close(callback) {
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
.modal-container {
   position: fixed;   
   height: fit-content;   
   z-index: 500;
   background-color: $bg-light;
   border-radius: $border-radius;
   padding: $padding;
   box-shadow: 0px 0px 0.5em 0.5em rgba($bg-dark, 0.1);
   border-top: 1em solid $accent;
   box-sizing: border-box;

   .button-container {
      margin-top: $margin;
   }

   &.modal-enter-active,
   &.modal-leave-active {
      transition: all .3s ease;
   }

   &.modal-enter-from,
   &.modal-leave-to {
      opacity: 0;
      transform: translateY(50px)
   }

   &.desktop{
      width: 40vw;
      top: 20vh;
      left: 30vw;
   }
   &.tablet{
      width: 70vw;
      top: 30vh;
      left: 15vw;
   }
   &.mobile{
      width: 90vw;
      bottom: 5vh;
      left: 5vw;
   }
}




</style>
