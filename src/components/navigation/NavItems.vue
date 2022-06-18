<!-- @format -->

<template>
   <div>
      <RouterLink to="/" @click="$emit('select')">Startseite</RouterLink>
   </div>
   <div>
      <RouterLink to="/Statistiken" @click="$emit('select')">Statistiken</RouterLink>
   </div>
   <div>
      <RouterLink to="/Benachrichtigung" @click="$emit('select')">Benachrichtigung</RouterLink>
   </div>
   <div>
      <RouterLink to="/Mitmachen" @click="$emit('select')">Mitmachen</RouterLink>
   </div>
</template>
<script>
export default {};
</script>
<style lang="scss">
@import "@/styles/_variables.scss";
a {
   color: $col-text-sec;
   text-decoration: none;
}

.router-link-active {
   color: $col-light;
}
</style>
