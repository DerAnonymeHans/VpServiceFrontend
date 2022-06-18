<!-- @format -->

<template>
   <div class="switch-container" :class="{ invert: invert }" :style="{ 'grid-template-columns': '1fr '.repeat(options.length) }">
      <div v-for="(option, idx) of options" :key="idx" :class="{ selected: selected === idx }" @click="doSwitch(idx)">
         {{ option }}
      </div>
      <div class="switcher" :style="{ left: left, width: 100 / options.length + '%' }"></div>
   </div>
</template>
<script>
export default {
   props: {
      options: {
         type: Array,
         required: true,
      },
      default: String,
      invert: Boolean,
   },
   data() {
      return {
         selected: 0,
         left: "0",
      };
   },
   mounted() {
      const idx = this.options.indexOf(this.default);
      if (idx === -1) return;
      this.doSwitch(idx);
   },
   methods: {
      doSwitch(idx) {
         // this.selected = this.selected === 0 ? 1 : 0;
         this.selected = idx;
         this.left = (100 / this.options.length) * idx + "%";

         this.$emit("switch", this.options[this.selected]);
      },
   },
};
</script>
<style lang="scss" scoped>
@import "@/styles/helper.scss";
@import "@/styles/variables.scss";

$trans-dura: 0.5s;

.switch-container {
   background-color: $col-light;
   width: fit-content;
   border: 0.2em solid $col-light;
   border-radius: 9999px;
   position: relative;
   display: grid;
   grid-template-columns: 1fr 1fr;

   > * {
      margin-inline: $margin * 0.5;
   }

   :not(:last-child) {
      z-index: 5;
      transition: all $trans-dura ease;
      cursor: pointer;
      user-select: none;
      text-align: center;
   }

   .selected {
      color: white;
   }

   .switcher {
      position: absolute;
      width: 50%;
      height: 100%;
      background-color: $col-dark;
      border-radius: 9999px;
      margin: 0;
      transition: all $trans-dura ease;
   }

   &.invert {
      background-color: black;
      border-color: black;
      color: white;
      .selected {
         color: black;
      }
      .switcher {
         background-color: white;
      }
   }
}
</style>
