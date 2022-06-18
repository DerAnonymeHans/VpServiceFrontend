<!-- @format -->

<template>
   <div :class="{ invert: isInvert }">
      <label>{{ label }}</label>
      <input :type="type" :name="name" />
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
      isInvert: { type: Boolean, required: true },
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
