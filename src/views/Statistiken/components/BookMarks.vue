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
            <div
               v-for="option in options"
               :key="option"
               :class="{ selected: option.name === selectedOption }"
               @click="selectOption(option.name)"
               @dblclick="
                  () => {
                     selectOption(option.name);
                     load();
                  }
               "
            >
               {{ decodeURIComponent(option.name) }}
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
               encodeURIComponent("Fächer"),
               `[{"type":{"idx":1,"name":"Fach","color":"#ff007a","key":"SUBJECT"},"name":"MA"},{"type":{"idx":1,"name":"Fach","color":"#ff007a","key":"SUBJECT"},"name":"DE"},{"type":{"idx":1,"name":"Fach","color":"#ff007a","key":"SUBJECT"},"name":"EN"},{"type":{"idx":1,"name":"Fach","color":"#ff007a","key":"SUBJECT"},"name":"GE"},{"type":{"idx":1,"name":"Fach","color":"#ff007a","key":"SUBJECT"},"name":"BIO"},{"type":{"idx":1,"name":"Fach","color":"#ff007a","key":"SUBJECT"},"name":"CH"},{"type":{"idx":1,"name":"Fach","color":"#ff007a","key":"SUBJECT"},"name":"PH"},{"type":{"idx":1,"name":"Fächer","color":"#ff007a","key":"SUBJECT"},"name":"GEO"},{"type":{"idx":1,"name":"Fächer","color":"#ff007a","key":"SUBJECT"},"name":"INF"},{"type":{"idx":1,"name":"Fächer","color":"#ff007a","key":"SUBJECT"},"name":"MU"},{"type":{"idx":1,"name":"Fächer","color":"#ff007a","key":"SUBJECT"},"name":"KU"},{"type":{"idx":1,"name":"Fächer","color":"#ff007a","key":"SUBJECT"},"name":"FR"},{"type":{"idx":1,"name":"Fächer","color":"#ff007a","key":"SUBJECT"},"name":"LA"},{"type":{"idx":1,"name":"Fächer","color":"#ff007a","key":"SUBJECT"},"name":"RU"},{"type":{"idx":1,"name":"Fächer","color":"#ff007a","key":"SUBJECT"},"name":"REE"},{"type":{"idx":1,"name":"Fächer","color":"#ff007a","key":"SUBJECT"},"name":"ERE"},{"type":{"idx":1,"name":"Fächer","color":"#ff007a","key":"SUBJECT"},"name":"ETH"}]`
            ),
            new Option(
               encodeURIComponent("Hauptfächer"),
               `[{"type":{"idx":1,"name":"Fach","color":"#ff007a","key":"SUBJECT"},"name":"MA"},{"type":{"idx":1,"name":"Fach","color":"#ff007a","key":"SUBJECT"},"name":"DE"},{"type":{"idx":1,"name":"Fach","color":"#ff007a","key":"SUBJECT"},"name":"EN"},{"type":{"idx":1,"name":"Fach","color":"#ff007a","key":"SUBJECT"},"name":"GE"},{"type":{"idx":1,"name":"Fach","color":"#ff007a","key":"SUBJECT"},"name":"BIO"},{"type":{"idx":1,"name":"Fach","color":"#ff007a","key":"SUBJECT"},"name":"CH"},{"type":{"idx":1,"name":"Fach","color":"#ff007a","key":"SUBJECT"},"name":"PH"}]`
            ),
            new Option(
               encodeURIComponent("Nebenfächer"),
               `[{"type":{"idx":1,"name":"Fach","color":"#ff007a","key":"SUBJECT"},"name":"ERE"},{"type":{"idx":1,"name":"Fach","color":"#ff007a","key":"SUBJECT"},"name":"ETH"},{"type":{"idx":1,"name":"Fach","color":"#ff007a","key":"SUBJECT"},"name":"GEO"},{"type":{"idx":1,"name":"Fach","color":"#ff007a","key":"SUBJECT"},"name":"GRW"},{"type":{"idx":1,"name":"Fach","color":"#ff007a","key":"SUBJECT"},"name":"INF"},{"type":{"idx":1,"name":"Fach","color":"#ff007a","key":"SUBJECT"},"name":"KU"},{"type":{"idx":1,"name":"Fach","color":"#ff007a","key":"SUBJECT"},"name":"MU"},{"type":{"idx":1,"name":"Fach","color":"#ff007a","key":"SUBJECT"},"name":"SPO"},{"type":{"idx":1,"name":"Fach","color":"#ff007a","key":"SUBJECT"},"name":"REE"}]`
            ),
            new Option(
               encodeURIComponent("Fremdsprachen"),
               `[{"type":{"idx":1,"name":"Fächer","color":"#ff007a","key":"SUBJECT"},"name":"EN"},{"type":{"idx":1,"name":"Fächer","color":"#ff007a","key":"SUBJECT"},"name":"LA"},{"type":{"idx":1,"name":"Fächer","color":"#ff007a","key":"SUBJECT"},"name":"RU"},{"type":{"idx":1,"name":"Fächer","color":"#ff007a","key":"SUBJECT"},"name":"FR"}]`
            ),
            new Option(
               encodeURIComponent("Leistungskurse 11"),
               `[{"type":{"idx":2,"name":"Kurs","color":"#7800ff","key":"KURS"},"name":"JG11/ BIO123"},{"type":{"idx":2,"name":"Kurs","color":"#7800ff","key":"KURS"},"name":"JG11/ DE123"},{"type":{"idx":2,"name":"Kurs","color":"#7800ff","key":"KURS"},"name":"JG11/ DE223"},{"type":{"idx":2,"name":"Kurs","color":"#7800ff","key":"KURS"},"name":"JG11/ EN123"},{"type":{"idx":2,"name":"Kurs","color":"#7800ff","key":"KURS"},"name":"JG11/ EN223"},{"type":{"idx":2,"name":"Kurs","color":"#7800ff","key":"KURS"},"name":"JG11/ GE123"},{"type":{"idx":2,"name":"Kurs","color":"#7800ff","key":"KURS"},"name":"JG11/ MA123"},{"type":{"idx":2,"name":"Kurs","color":"#7800ff","key":"KURS"},"name":"JG11/ MA223"},{"type":{"idx":2,"name":"Kurs","color":"#7800ff","key":"KURS"},"name":"JG11/ PH123"}]`
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
         let name = [...document.getElementsByName("save-selector-name")][0].value;
         if (name.length === 0) return;
         name = encodeURIComponent(name);
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
         const keys = this.optionKeys();
         const idx = keys.indexOf(this.selectedOption);
         if (idx === -1) return;
         keys.splice(idx, 1);
         localStorage.setItem("saved-selector-keys", keys.join("|"));
         localStorage.removeItem("saved-selector-" + this.selectedOption);
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
   // max-height: 50vh;
   // overflow-y: auto;
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
         background-color: $col-dark;
         color: $col-light;
         border-radius: $border-radius;
         display: flex;
         flex-direction: column;
         max-height: min(30vh, 200px);
         overflow-y: auto;

         > div {
            cursor: pointer;
            user-select: none;
            padding: $padding * 0.5;
            border-radius: $border-radius;

            &:hover,
            &:focus,
            &.selected {
               background-color: lighten($col-dark, 20%);
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
