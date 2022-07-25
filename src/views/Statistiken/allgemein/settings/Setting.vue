<!-- @format -->
<script setup>
import Switch, { SwitchModel } from "@/components/switch/Switch.vue";
</script>
<template>
   <div :class="mq.current" class="setting">
      <div class="content" :class="{ isSwitch: options.length > 1 }">
         <div class="text">
            <p class="name">{{ name }}</p>
            <p class="desc">{{ description }}</p>
         </div>
         <button v-if="options.length === 1" class="btn" @click="$emit('optionChange', { option: _key, value: options[0] })">
            {{ options[0] }}
         </button>
         <Switch
            v-if="options.length > 1"
            :invert="true"
            :options="options"
            :default="defaultValue"
            @switch="(to) => $emit('optionChange', { option: _key, value: to })"
         />
      </div>
   </div>
</template>
<script>
export default {
   inject: ["mq"],
   props: {
      _key: {
         type: String,
         required: true,
      },
      name: {
         type: String,
         required: true,
      },
      description: String,
      options: {
         type: Array,
         required: true, // if one item, button
      },
      defaultValue: String,
   },
};
class SettingModel {
   constructor(key, name, desc, options, defaultVal) {
      this.key = key;
      this.name = name;
      this.desc = desc;
      this.options = options;
      this.defaultVal = defaultVal;
   }
}
export { SettingModel };
</script>
<style lang="scss" scoped>
@import "@/styles/_variables.scss";
@import "@/styles/_mixins.scss";
@import "@/styles/components.scss";
.setting {
   @include box;
   .content {
      display: grid;

      .text {
         display: grid;
         .name {
            font-weight: bold;
            color: $col-dark;
         }
         .desc {
            text-align: left;
         }
      }

      button {
         width: fit-content;
         height: fit-content;
         margin: auto;
      }
   }

   &.ultrawide,
   &.desktop {
      .content {
         display: grid;
         grid-template-columns: 5fr 1fr;
         .text {
            display: grid;
            grid-template-columns: 1fr 4fr;
         }

         &.isSwitch {
            grid-template-columns: 1fr;
         }
      }
   }
   &.tablet {
   }
}
</style>
