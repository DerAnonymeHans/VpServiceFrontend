<!-- @format -->

<script setup>
import IconRepo from "@/repos/IconRepo.vue";
</script>
<template>
   <div class="scroll-selector-container flex" :class="mq.current">
      <div class="item" v-for="(item, idx) of items" :key="idx" :class="{ selected: idx === selected }" @click="onClick(idx)">
         <IconRepo :name="item.key" />
         <div>{{ item.name }}</div>
      </div>
   </div>
</template>
<script>
export default {
   data() {
      return {
         selected: 0,
         mydefault: this.default,
      };
   },
   inject: ["mq"],
   props: {
      items: {
         type: Array,
         required: true,
      },
      default: String,
   },
   mounted() {
      setTimeout(() => {
         const idx = this.items.findIndex((item) => item.key === this.mydefault);
         if (idx === -1) return;
         this.onClick(idx);
      }, 0);
   },

   updated() {
      const idx = this.items.findIndex((item) => item.key === this.mydefault);
      if (idx === -1) {
         this.onClick(0);
         return;
      }
   },
   methods: {
      onClick(idx) {
         this.selected = idx;
         this.mydefault = this.items[this.selected].key;
         this.$emit("select", this.items[this.selected]);
      },
   },
};
class Item {
   constructor(name, key) {
      this.name = name;
      this.key = key;
   }
}
export { Item };
</script>
<style lang="scss" scoped>
@import "@/styles/_variables.scss";
.scroll-selector-container {
   height: 100%;
   width: fit-content;
   overflow-y: auto;

   .item {
      color: white;
      height: 100%;
      background-color: rgba($col-light, 0.15);
      padding: $padding;
      border-radius: $border-radius;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      margin-inline: $margin;
      transition: all 0.5s ease;

      > * {
         &:last-child {
            margin-top: auto;
            height: fit-content;
            white-space: nowrap;
         }
      }

      &.selected {
         color: $accent;
         background-color: rgba($col-light, 0.2);
      }
      &:hover {
         background-color: rgba($col-light, 0.2);
      }
   }

   &.desktop {
      .item {
         width: max(8vw, 150px);
      }
   }
   &.tablet {
      .item {
         width: max(15vw, 150px);
      }
   }
   &.mobile {
      .item {
         width: 150px;
      }
   }
}
</style>
