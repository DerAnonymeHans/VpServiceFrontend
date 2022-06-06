<template>
   <div>
      <label>{{label}}</label>
      <input :type="type" :name="name">
   </div>
</template>
<script>
export default {
   props: {
      type: {
         type: String, required: true
      },
      label: {
         type: String, required: true
      },
      name: String,
   }
}
</script>
<style lang="scss" scoped>
@import "@/styles/_variables.scss";
div{
   display: flex;
   flex-direction: column;
   > *{
      transition: all .3s ease;
   }
   label{
      color: $color-header-sec;
   }
   &:focus-within{
      > label{
         color: $color-header-prim;
         font-size: larger;
      }
   }
   input{
      border-radius: $border-radius;
      border: none;
      padding: $padding * .5;

      &:focus{
         outline: none;
      }
   }
}
</style>