<!-- @format -->

<template>
   <div :class="{ invert: isInvert }">
      <label>{{ label }}</label>
      <input :id="id" :type="type" :name="name" :value="value" :min="min" :max="max" />
   </div>
</template>
<script>
export default {
   props: {
      type: {
         type: String,
         required: true,
      },
      label: {
         type: String,
         required: true,
      },
      name: String,
      defaultValue: String,
      isInvert: { type: Boolean, required: true },
      min: Number,
      max: Number,
      id: String,
   },
   data() {
      return {
         value: "",
      };
   },
   updated() {
      console.log(this.defaultValue);
      if (this.defaultValue != "null") this.value = this.defaultValue;
   },
};
</script>
<style lang="scss" scoped>
@import "@/styles/_variables.scss";
div {
   display: flex;
   flex-direction: column;
   > * {
      transition: all 0.3s ease;
   }
   label {
      color: $col-text-sec;
   }
   &:focus-within {
      > label {
         color: $col-light;
         font-size: larger;
      }
   }
   input {
      border-radius: $border-radius;
      border: none;
      padding: $padding * 0.5;

      &:focus {
         outline: none;
      }
   }

   &.invert {
      label {
         color: $col-dark;
      }
      input {
         background-color: $col-dark;
         color: $col-light;
      }
   }
}
</style>
