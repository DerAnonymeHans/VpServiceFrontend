<template>
   <div class="switch-container" :style="{'grid-template-columns': '1fr '.repeat(options.length)}" >
      <div v-for="(option, idx) of options" :key="idx" :class="{selected: selected === idx}" @click="doSwitch(idx)">
         {{option}}
      </div>
      <div class="switcher" :style="{left: left, width: 100 / options.length + '%'}"></div>
   </div>
</template>
<script>
export default {
   props: {
      options: {
         type: Array, required: true
      },
      default: String
   },
   data(){
      return{
         selected: 0,
         left: '0'
      }
   },
   mounted(){
      const idx = this.options.indexOf(this.default)
      if(idx === -1) return;
      this.doSwitch(idx);
      
   },
   methods: {
      doSwitch(idx){
         // this.selected = this.selected === 0 ? 1 : 0;
         this.selected = idx;
         this.left = 100 / this.options.length * idx + '%';

         this.$emit('switch', this.options[this.selected])
      }
   }
}
</script>
<style lang="scss" scoped>
@import "@/styles/_variables.scss";
@import "@/styles/helper.scss";

$trans-dura: .5s;
.switch-container{
   background-color: $bg-light;
   width: fit-content;
   border: .2em solid $bg-light;
   border-radius: 9999px;
   position: relative;
   display: grid;
   grid-template-columns: 1fr 1fr;

   > * {
      margin-inline: $margin * .5;
   }

   :not(:last-child){
      z-index: 5;
      transition: all $trans-dura ease;
      cursor: pointer;
      user-select: none;
      text-align: center;
   }

   .selected{
      color: white;
   }

   .switcher{
      position: absolute;
      width: 50%;
      height: 100%;
      background-color: $bg-dark;
      border-radius: 9999px;
      margin: 0;
      transition: all $trans-dura ease;
   }
}

</style>