<!-- @format -->

<template>
   <optgroup label="Nicht verwendet">
      <option v-for="sub in subjects.filter((sub) => !sub.duplicate)" :key="sub.name" :value="sub.name" :class="{ duplicate: sub.duplicate }">
         {{ sub.name }}
      </option>
   </optgroup>
   <optgroup label="Bereits verwendet">
      <option v-for="sub in subjects.filter((sub) => sub.duplicate)" :key="sub.name" :value="sub.name" :class="{ duplicate: sub.duplicate }">
         {{ sub.name }}
      </option>
   </optgroup>
</template>
<script>
export default {
   props: {
      subjects: { type: Array, required: true },
   },
};
</script>
<style lang=""></style>
