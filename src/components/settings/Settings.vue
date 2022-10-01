<!-- @format -->
<script setup>
import Setting from "./Setting.vue";
</script>
<template>
   <div class="box" v-for="block in settings" :key="block.title">
      <h2>{{ block.title }}</h2>
      <Setting
         v-for="setting in block.settings"
         v-bind:key="setting.key"
         :_key="setting.key"
         :name="setting.name"
         :description="setting.desc"
         :options="setting.options"
         :defaultValue="setting.defaultVal"
         @optionChange="(val) => $emit('settingChange', val)"
      />
   </div>
</template>
<script>
export default {
   props: {
      settings: { type: Array, required: true },
   },
};

class SettingBlock {
   constructor(title, settings) {
      this.title = title;
      this.settings = settings;
   }
}

class SettingModel {
   constructor(key, name, desc, options, defaultVal) {
      this.key = key;
      this.name = name;
      this.desc = desc;
      this.options = options;
      this.defaultVal = defaultVal;
   }
}

export { SettingBlock, SettingModel };
</script>
<style lang="scss" scoped>
@import "@/styles/_variables.scss";
.box {
   margin-bottom: $margin;
   h2 {
      text-align: center;
      color: $col-dark;
      margin-top: 0;
   }
   > * {
      &:not(:last-child) {
         margin-bottom: $margin;
      }
   }
}
</style>
