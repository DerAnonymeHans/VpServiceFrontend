<!-- @format -->
<script setup>
import { emulateTab } from "emulate-tab";
</script>
<template>
   <div class="kurs-row">
      <div class="name">
         {{ kurs.name }}
      </div>
      <div class="points">
         <input
            type="number"
            class="input"
            min="0"
            max="15"
            v-for="i in 4"
            :class="kurs.years[i].einbringen"
            :key="i"
            :value="kurs.years[i].points"
            @keydown="(e) => onKeyDown(i, e)"
            :disabled="i > numberOfEndedYears"
         />
         <!-- <div v-for="i in 4 - numberOfEndedYears" :key="i">
            {{ kurs.years[i + numberOfEndedYears].points }}
         </div> -->
         <input
            type="number"
            class="input"
            min="0"
            max="15"
            :value="kurs.examPoints"
            @keydown="(e) => onKeyDown(5, e)"
            :disabled="numberOfEndedYears < 5"
            v-if="kurs.exam !== null"
         />
      </div>
   </div>
</template>
<script>
export default {
   props: {
      kurs: { type: Object, required: true },
      numberOfEndedYears: { type: Number, required: true },
   },
   mounted() {},
   methods: {
      onKeyDown(idx, e) {
         try {
            if (e.key === "Tab") return;
            e.preventDefault();

            let val;
            if (e.key !== "Delete" && e.key !== "Backspace") {
               val = parseInt(e.target.value + e.key);
               if (val > 15 || val < 0 || Number.isNaN(val)) {
                  return;
               }
            }
            if (idx === 5) {
               this.kurs.examPoints = val;
            } else {
               this.kurs.years[idx].points = val;
            }
            if (val > 1) {
               emulateTab();
            }
         } catch {}
      },
   },
};
</script>
<style lang="scss">
@import "@/styles/helper.scss";
@import "@/styles/variables.scss";
@import "@/styles/assets.scss";
@import "@/styles/mixins.scss";
@import "@/styles/components.scss";
@import "./colors.scss";

.kurs-row {
   display: grid;
   grid-template-columns: 100px 1fr;
   margin: $margin 0;

   .points {
      display: grid;
      width: 100%;
      grid-template-columns: repeat(4, 1fr);
      grid-row-gap: $margin * 0.5;

      > * {
         background-color: $col-medium;
         padding: $padding * 0.5;
         border-radius: $border-radius;
         margin-inline: $margin * 0.5;
         min-width: 15px;
         color: $col-text;
         font-size: 10.5pt;
      }

      input {
         border: 1px solid $col-text-sec;

         &:focus {
            // border-color: $accent;
            outline: 2px solid $accent;
         }
         &:disabled {
            border: none;
         }

         &.pflicht {
            background-color: $lila;
            color: white;
         }
         &.min1 {
            background-color: $pink;
            color: white;
         }
         &.auffüllen {
            background-color: $green;
            color: white;
         }
      }
   }
}
</style>
