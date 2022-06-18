<!-- @format -->

<script setup>
import NameSelector from "./NameSelector.vue";
import EntityType from "../enums/EntityType.js";
import IconRepo from "@/repos/IconRepo.vue";
import Modal from "@/components/modal/Modal.vue";
import Bookmarks from "./BookMarks.vue";
</script>
<template>
   <div class="name-selectors-container" :class="mq.current">
      <div class="actions">
         <button class="btn-svg" @click="showBookmarks = true"><IconRepo name="save" /></button>
         <button class="btn-svg" @click="deleteAll()"><IconRepo name="delete" /></button>
      </div>
      <div class="selectors">
         <NameSelector
            v-for="selector of selectors"
            :key="selector"
            :defaultType="selector.type"
            :defaultName="selector.name"
            @select="(val) => onSelect(selector, val)"
            @delete="deleteSelector(selector)"
            @typeChange="(type) => this.onTypeChange(selector, type)"
         />
         <button class="name-selectors-add btn" @click="addSelector"></button>
      </div>
      <slot></slot>
      <div class="submit-btn-container">
         <button class="btn-focus vert-center" @click="$emit('selector-change', selectors)">Diagramm erstellen</button>
      </div>
      <Modal :isOpen="showBookmarks" @close="showBookmarks = !showBookmarks" :title="modalTitle" :content="''" :buttons="[]">
         <Bookmarks @load="getSelectors()" />
      </Modal>
   </div>
</template>
<script>
export default {
   inject: ["mq"],
   data() {
      return {
         selectors: [new Selector(EntityType.TEACHER)],
         showBookmarks: false,
         modalTitle: "Lesezeichen",
      };
   },
   beforeMount() {
      this.getSelectors();
   },
   methods: {
      getSelectors() {
         const selectors = JSON.parse(sessionStorage.getItem("cached-selectors"));
         if (!Array.isArray(selectors)) return;
         this.selectors = selectors;
      },
      onSelect(selector, val) {
         selector.name = val;
         this.selectorChange();
      },
      onTypeChange(selector, type) {
         selector.type = type;
         selector.name = undefined;
         sessionStorage.setItem("entity-type", type.key);
         this.selectorChange();
      },
      addSelector() {
         let type = sessionStorage.getItem("entity-type");
         if (typeof type !== "string") type = EntityType.TEACHER;
         else type = EntityType[type];
         this.selectors = [...this.selectors, new Selector(type)];
         this.selectorChange();
      },
      deleteSelector(selector) {
         this.selectors.splice(this.selectors.indexOf(selector), 1);
         this.selectors = this.selectors;
         this.selectorChange();
      },
      deleteAll() {
         this.selectors = [];
         this.selectorChange();
      },
      selectorChange() {
         sessionStorage.setItem("cached-selectors", JSON.stringify(this.selectors));
      },
   },
};
class Selector {
   constructor(type, name = undefined) {
      this.type = type;
      this.name = name;
   }
}
</script>
<style lang="scss" scoped>
@import "@/styles/_variables.scss";
@import "@/styles/components.scss";
@import "@/styles/helper.scss";
.name-selectors-container {
   width: 100%;
   background-color: $col-medium;
   padding: $padding;
   border-radius: $border-radius;
   box-sizing: border-box;

   .actions {
      width: fit-content;
      margin-left: auto;
   }

   .selectors {
      display: grid;
      grid-gap: $margin;
      grid-template-columns: repeat(auto-fit, max(10vw, 150px));
      // justify-content: center;

      .name-selectors-add {
         width: 1em;
         position: relative;
         display: flex;
         justify-content: center;
         align-items: center;
         padding: $padding * 0.8;

         @mixin plus-part {
            content: "";
            position: absolute;
            width: 3px;
            height: 60%;
            background-color: $col-light;
            border-radius: $border-radius;
         }

         &::before {
            @include plus-part;
         }
         &::after {
            @include plus-part;
            transform: rotate(90deg);
         }
      }
   }

   .submit-btn-container {
      display: flex;
      justify-content: center;
      margin: $margin 0;
      button {
         padding: $padding $padding * 2;
      }
   }

   &.mobile {
      grid-template-columns: 1fr 1fr;
   }
}
</style>
