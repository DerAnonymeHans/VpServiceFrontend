<script setup>
import NameSelector from "./NameSelector.vue";
import EntityType from "../functions/EntityType.js";
</script>
<template>
   <div class="name-selectors-container" :class="mq.current">
      <div class="selectors">
         <NameSelector 
            v-for="selector of selectors" :key="selector"
            :defaultType="selector.type"
            :defaultName="selector.name"
            @select="(val) => onSelect(selector, val)"
            @delete="deleteSelector(selector)"
            @typeChange="(type) => this.onTypeChange(selector, type)"
         />
         <button class="name-selectors-add btn" @click="addSelector"></button>

      </div>
      <slot></slot>
      <div class="submit-btn-container">
         <button class="btn-focus vert-center" @click="$emit('selector-change', selectors)">Diagramm erstellen</button> 
      </div>
   </div>
</template>
<script>
export default {
   inject: ["mq"],
   data(){
      return{
         selectors: [new Selector(EntityType.TEACHER)]
      }
   },
   beforeMount(){
      const selectors = JSON.parse(sessionStorage.getItem("saved-selectors"))
      if(!Array.isArray(selectors)) return
      this.selectors = selectors
   },
   methods: {
      onSelect(selector, val){
         selector.name = val;
         this.selectorChange();
      },
      onTypeChange(selector, type){
         selector.type = type;
         selector.name = undefined;
         sessionStorage.setItem("entity-type", type.key);
         this.selectorChange();
      },
      addSelector(){
         let type = sessionStorage.getItem("entity-type")
         if(typeof type !== "string") type = EntityType.TEACHER;
         else type = EntityType[type]
         this.selectors = [...this.selectors, new Selector(type)];
         this.selectorChange();
      },
      deleteSelector(selector){
         this.selectors.splice(this.selectors.indexOf(selector), 1)
         this.selectors = this.selectors;
         this.selectorChange();
      },
      selectorChange(){
         sessionStorage.setItem("saved-selectors", JSON.stringify(this.selectors))
      }
   }
}
class Selector{
   constructor(type, name=undefined){
      this.type = type
      this.name = name
   }
}
</script>
<style lang="scss" scoped>
@import "@/styles/_variables.scss";
@import "@/styles/components.scss";
@import "@/styles/helper.scss";
.name-selectors-container{
   width: 100%;
   background-color: $bg-medium;
   padding: $padding;
   border-radius: $border-radius;
   box-sizing: border-box;

   .selectors{
      display: grid;
      grid-gap: $margin;
      grid-template-columns: repeat(auto-fit, max(10vw, 150px));
      justify-content: center;    
      
      .name-selectors-add{
      width: 1em;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: $padding *.8;

      @mixin plus-part{
         content: "";
         position: absolute;
         width: 3px;
         height: 60%;
         background-color: $bg-light;
         border-radius: $border-radius;
      }

      &::before{
         @include plus-part;         
      }
      &::after{
         @include plus-part;
         transform: rotate(90deg);
      }
   }
   }

   .submit-btn-container{
      display: flex;
      justify-content: center;
      margin: $margin 0;
      button{
         padding: $padding $padding * 2
      }
   }

   &.mobile{
      grid-template-columns: 1fr 1fr;
   }

   
}

</style>