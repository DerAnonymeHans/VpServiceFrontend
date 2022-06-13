<template>
   <div>
      Gesamtzahlen
   </div>
</template>
<script>
export default {
   inject: ["fetchStat"],
   async mounted(){
      const res = await this.fetchStat("/Names/0")
      console.log(res);
   }
}
</script>
<style lang="scss" scoped>
   
</style>