<!-- @format -->

<script setup>
import NavItems from "./NavItems.vue";
import { MqResponsive } from "vue3-mq";
</script>

<template>
   <nav :class="`${mq.current} ${isNavOpen ? 'nav-open' : 'nav-closed'}`">
      <!-- <NavItems v-if="false"/> -->
      <div class="nav-item-container">
         <NavItems v-if="mq.tabletPlus || isNavOpen" @select="toggleMenu()" />
      </div>

      <MqResponsive target="mobile" class="hamburger-container">
         <div class="hamburger-icon" :class="`${isNavOpen ? 'close' : 'open'}`" @click="toggleMenu()">
            <div></div>
            <div></div>
            <div></div>
         </div>
      </MqResponsive>
   </nav>
</template>
<script>
export default {
   inject: ["mq"],
   components: {
      NavItems,
      MqResponsive,
   },
   data() {
      return {
         isNavOpen: false,
      };
   },
   methods: {
      toggleMenu() {
         this.isNavOpen = !this.isNavOpen;
      },
   },
};
</script>
<style lang="scss">
@import "@/styles/_variables.scss";
@import "@/styles/assets.scss";
nav {
   background-color: $col-dark;
   display: flex;
   height: 9vh;
   align-items: center;
   position: fixed;
   box-sizing: border-box;
   transition: height 0.5s ease;
   z-index: 1000;
   top: 0;

   .nav-item-container {
      display: flex;
      width: 100%;
   }

   &.mobile {
      padding: $padding;
      width: 100vw;
      .hamburger-container {
         width: max(5%, 2em);
         margin-left: auto;
         transition: all 0.8s ease;
      }

      .nav-item-container {
         flex-direction: column;
         text-align: center;
         opacity: 0;
         transition: opacity 0.5s ease;

         > div {
            margin-bottom: $margin;
            font-size: x-large;
         }
      }

      &.nav-open {
         height: 50vh;
         .hamburger-container {
            transform: rotate(270deg);
         }
         .nav-item-container {
            opacity: 1;
         }
      }
   }

   &.desktop,
   &.tablet,
   &.ultrawide {
      padding: $padding;
      width: 100%;
      .nav-item-container {
         align-items: center;

         > div {
            margin: 0 $margin;

            &:last-child {
               border: 1px solid $col-medium;
               padding: $padding * 0.3;
               border-radius: $border-radius;
               margin-left: auto;
            }
         }
      }
   }
}
</style>
