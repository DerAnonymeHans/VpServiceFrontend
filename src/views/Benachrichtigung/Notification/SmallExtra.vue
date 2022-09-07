<!-- @format -->

<template>
   <blockquote :style="{ borderColor: color }" v-html="text"></blockquote>
   <p v-if="author?.length > 0">~{{ author }}</p>
</template>
<script>
export default {
   props: {
      color: {
         type: String,
         required: true,
      },
      text: {
         type: String,
         required: true,
      },
      author: String,
   },
};
</script>
<style lang="scss" scoped>
@import "@/styles/_variables.scss";
blockquote {
   border-left: 3px solid $accent;
   margin: 0;
   padding-left: $padding;
}
p {
   text-align: right;
   margin-right: $margin * 3;
}
</style>
