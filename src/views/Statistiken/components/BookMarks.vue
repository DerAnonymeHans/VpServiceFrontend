<!-- @format -->

<script setup>
import Input from "@/components/input/Input.vue";
</script>
<template>
   <div class="bookmarks">
      <div class="save-container">
         <Input type="text" label="Speichern als" :isInvert="true" name="save-selector-name" />
         <button class="btn save-btn" @click="saveOption()">Speichern</button>
      </div>
      <hr />
      <div class="load-container">
         <div class="select-container">
            <div v-for="option in options" :key="option" :class="{ selected: option.name === selectedOption }" @click="selectOption(option.name)">
               {{ option.name }}
            </div>
         </div>
         <div class="flex-n-margin buttons">
            <button class="btn load-btn" @click="load()">Laden</button>
            <button class="btn-border" @click="deleteOption()">Löschen</button>
         </div>
      </div>
   </div>
</template>
<script>
export default {
   data() {
      return {
         preDefinedOptions: [
            new Option(
               "Klassenstufen",
               `[{"type":{"idx":3,"name":"Klassenstufe","color":"#005cff","key":"GRADE"},"name":"5"},{"type":{"idx":3,"name":"Klassenstufe","color":"#005cff","key":"GRADE"},"name":"6"},{"type":{"idx":3,"name":"Klassenstufe","color":"#005cff","key":"GRADE"},"name":"7"},{"type":{"idx":3,"name":"Klassenstufe","color":"#005cff","key":"GRADE"},"name":"8"},{"type":{"idx":3,"name":"Klassenstufe","color":"#005cff","key":"GRADE"},"name":"9"},{"type":{"idx":3,"name":"Klassenstufe","color":"#005cff","key":"GRADE"},"name":"10"},{"type":{"idx":3,"name":"Klassenstufe","color":"#005cff","key":"GRADE"},"name":"11"},{"type":{"idx":3,"name":"Klassenstufe","color":"#005cff","key":"GRADE"},"name":"12"}]`
            ),
            new Option(
               "Hauptfächer",
               `[{"type":{"idx":1,"name":"Fach","color":"#ff007a","key":"SUBJECT"},"name":"MA"},{"type":{"idx":1,"name":"Fach","color":"#ff007a","key":"SUBJECT"},"name":"DE"},{"type":{"idx":1,"name":"Fach","color":"#ff007a","key":"SUBJECT"},"name":"EN"},{"type":{"idx":1,"name":"Fach","color":"#ff007a","key":"SUBJECT"},"name":"GE"},{"type":{"idx":1,"name":"Fach","color":"#ff007a","key":"SUBJECT"},"name":"BIO"},{"type":{"idx":1,"name":"Fach","color":"#ff007a","key":"SUBJECT"},"name":"CH"},{"type":{"idx":1,"name":"Fach","color":"#ff007a","key":"SUBJECT"},"name":"PH"}]`
            ),
         ],
         selectedOption: "",
         options: [],
      };
   },
   mounted() {
      this.getAllOptions();
   },
   methods: {
      getAllOptions() {
         const keys = this.optionKeys();
         const options = [];
         for (const key of keys) {
            options.push(new Option(key, localStorage.getItem("saved-selector-" + key)));
         }
         this.options = [...this.preDefinedOptions, ...options];
      },
      optionKeys() {
         const keys = localStorage.getItem("saved-selector-keys")?.split("|");
         return Array.isArray(keys) ? keys : [];
      },
      selectOption(key) {
         this.selectedOption = key;
      },
      saveOption() {
         const name = [...document.getElementsByName("save-selector-name")][0].value;
         if (name.length === 0) return;
         const keys = this.optionKeys();
         keys.push(name);
         localStorage.setItem("saved-selector-keys", keys.join("|"));
         localStorage.setItem("saved-selector-" + name, sessionStorage.getItem("cached-selectors"));
         this.getAllOptions();
      },
      load() {
         const idx = this.options.findIndex((opt) => opt.name === this.selectedOption);
         sessionStorage.setItem("cached-selectors", this.options[idx].value);
         this.$emit("load");
      },
      deleteOption() {
         const name = [...document.getElementsByName("save-selector-name")][0].value;
         const keys = this.optionKeys();
         keys.splice(keys.indexOf(this.selectedOption), 1);
         localStorage.setItem("saved-selector-keys", keys.join("|"));
         localStorage.removeItem("saved-selector-" + name);
         this.getAllOptions();
      },
   },
};
class Option {
   constructor(name, value) {
      this.name = name;
      this.value = value;
   }
}
</script>
<style lang="scss" scoped>
@import "@/styles/_variables.scss";
@import "@/styles/components.scss";
@import "@/styles/helper.scss";

.bookmarks {
   max-height: 50vh;
   overflow-y: auto;
   .save-container {
      display: flex;
      justify-content: center;
      align-items: center;

      > * {
         margin-top: auto;
         margin-bottom: 0;
         margin-inline: $margin * 0.5;
      }

      > div {
         width: 90%;
      }
   }
   .load-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      .select-container {
         width: 100%;
         background-color: $bg-dark;
         color: $bg-light;
         border-radius: $border-radius;
         display: flex;
         flex-direction: column;
         max-height: 40vh;
         overflow-y: auto;

         > div {
            cursor: pointer;
            user-select: none;
            padding: $padding * 0.5;
            border-radius: $border-radius;

            &:hover,
            &:focus,
            &.selected {
               background-color: lighten($bg-dark, 20%);
            }
         }
      }

      .buttons {
         margin-top: $margin;
         margin-bottom: $margin;
      }
   }
}
</style>
