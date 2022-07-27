<!-- @format -->

<script setup>
import EntityType from "../enums/EntityType.js";
</script>
<template>
   <div class="name-select-container">
      <div class="name-select-delete dont-print" @click="deleteSelf()"></div>
      <div class="select-wrapper">
         <select :value="selectedName === undefined ? options[0] : selectedName" @input="onSelect">
            <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
         </select>
      </div>
      <div class="name-select-type-change dont-print" @click="nextType()" :style="{ 'background-color': entityType.color }"></div>
   </div>
</template>
<script>
export default {
   props: {
      defaultName: String,
      defaultType: Object,
   },
   inject: ["fetchStat"],
   data() {
      return {
         entityType: EntityType.TEACHER,
         selectedName: null,
         options: [],
      };
   },
   mounted() {
      if (typeof this.defaultType === "object") this.changeEntityType(this.defaultType, false);
      else if (typeof sessionStorage.getItem("entity-type") !== "number") return this.changeEntityType(EntityType.TEACHER);
      else this.changeEntityType(sessionStorage.getItem("entity-type"));
      this.selectedName = this.defaultName;
   },
   methods: {
      async getOptions() {
         this.options = await this.fetchStat(`/Names/${this.entityType.idx}`);
         // if only numbers
         if (parseInt(this.options[0]) == this.options[0]) {
            this.options = this.options.sort((a, b) => a - b);
         } else {
            this.options = this.options.sort();
         }
         this.onSelect({ target: { value: this.selectedName !== undefined ? this.selectedName : this.options[0] } });
      },
      changeEntityType(type, isUpdate = true) {
         this.entityType = type;
         this.getOptions();
         this.selectedName = undefined;
         if (isUpdate) this.$emit("typeChange", this.entityType);
      },
      nextType() {
         const keys = Object.keys(EntityType);
         // entitype idx go from 0 to length, thats why they - incremented - can be used as the idx of the new key
         this.changeEntityType(EntityType[keys[this.entityType.idx + 1 < keys.length ? this.entityType.idx + 1 : 0]]);
      },
      onSelect(e) {
         this.selectedName = e.target.value;
         this.$emit("select", this.selectedName);
      },
      deleteSelf() {
         this.$emit("delete");
      },
   },
};
</script>
<style lang="scss" scoped>
@import "@/styles/_variables.scss";
$border-width: 2px;
.name-select-container {
   border: $border-width solid $col-dark;
   display: flex;
   width: 100%;
   align-items: center;
   border-radius: $border-radius;
   height: 1.2em;
   overflow: hidden;

   .name-select-delete {
      border-right: $border-width solid $col-dark;
      height: 100%;
      aspect-ratio: 1 / 1;
      background-color: $col-dark;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      &::before {
         content: "";
         position: absolute;
         background-color: $col-light;
         height: 20%;
         width: 80%;
         border-radius: $border-radius;
      }
   }

   .select-wrapper {
      position: relative;
      color: $col-light;
      background-color: currentColor;
      padding: $padding * 0.2;
      width: 100%;
      &:hover {
         color: darken($col-light, 10%);
      }
      select {
         cursor: pointer;
         border-radius: $border-radius;
         padding-right: $padding;
         border: none;
         background: none;
         width: 100%;
         appearance: none;
         user-select: none;

         &:focus,
         &:hover {
            outline: none;
            background: none;
         }
      }
   }

   .name-select-type-change {
      border-left: $border-width solid $col-dark;
      height: 100%;
      aspect-ratio: 1 / 1;
      background-color: red;
      margin-right: 0;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;
      margin-left: auto;

      @mixin arrow-part {
         content: "";
         position: absolute;
         background-color: $col-dark;
         width: 10%;
         height: 50%;
      }

      &::before {
         @include arrow-part;
         transform: rotate(-45deg);
         top: 10%;
      }
      &::after {
         @include arrow-part;
         transform: rotate(45deg);
         bottom: 10%;
      }
   }
}

@media print {
   * {
      font-size: 8pt;
   }
}
</style>
