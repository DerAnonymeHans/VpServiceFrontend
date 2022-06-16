<script setup>
import Delete from "@/assets/icons/delete.svg?component";
import Gesamtzahlen from "@/assets/icons/gesamtzahlen.svg?component";
import Beziehungen from "@/assets/icons/beziehungen.svg?component";
import Durchschnitt from "@/assets/icons/durchschnitt.svg?component";
import Relativ from "@/assets/icons/relativ.svg?component";
import Vergleich from "@/assets/icons/vergleich.svg?component";
import Zeit from "@/assets/icons/zeit.svg?component";
import Save from "@/assets/icons/save.svg?component";
</script>
<template>
   <Gesamtzahlen v-if="name === 'gesamtzahlen'" />
   <Beziehungen v-if="name === 'beziehungen'"/>
   <Durchschnitt v-if="name === 'durchschnitt'"/>
   <Relativ v-if="name === 'relativ'"/>
   <Vergleich v-if="name === 'vergleich'"/>
   <Zeit v-if="name === 'zeit'"/>   
   <Save v-if="name === 'save'"/>   
   <Delete v-if="name === 'delete'"/>   
</template>
<script>
export default {
   props: {
      name: {
         type: String, required: true
      }
   }
}
</script>
<style lang="scss">
   svg{
      transition: all .5s ease;
   }
</style>