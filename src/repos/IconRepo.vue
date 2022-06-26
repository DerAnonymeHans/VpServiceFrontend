<!-- @format -->

<script setup>
import Delete from "@/assets/icons/delete.svg?component";
import Gesamtzahlen from "@/assets/icons/gesamtzahlen.svg?component";
import Beziehungen from "@/assets/icons/beziehungen.svg?component";
import Durchschnitt from "@/assets/icons/durchschnitt.svg?component";
import Relativ from "@/assets/icons/relativ.svg?component";
import Vergleich from "@/assets/icons/vergleich.svg?component";
import Zeit from "@/assets/icons/zeit.svg?component";
import Save from "@/assets/icons/save.svg?component";
import Close from "@/assets/icons/close.svg?component";
import Settings from "@/assets/icons/settings.svg?component";
import Info from "@/assets/icons/info.svg?component";
import Help from "@/assets/icons/help.svg?component";
import Code from "@/assets/icons/code.svg?component";
import Quotes from "@/assets/icons/quotes.svg?component";
import Table from "@/assets/icons/table.svg?component";
import StatCreation from "@/assets/icons/statCreation.svg?component";
import Thunder from "@/assets/icons/thunder.svg?component";
import Label from "@/assets/icons/label.svg?component";
import Lock from "@/assets/icons/lock.svg?component";
</script>
<template>
   <Gesamtzahlen v-if="name === 'gesamtzahlen'" />
   <Beziehungen v-if="name === 'beziehungen'" />
   <Durchschnitt v-if="name === 'durchschnitt'" />
   <Relativ v-if="name === 'relativ'" />
   <Vergleich v-if="name === 'vergleich'" />
   <Zeit v-if="name === 'zeit'" />
   <Save v-if="name === 'save'" />
   <Delete v-if="name === 'delete'" />
   <Close v-if="name === 'close'" />
   <Settings v-if="name === 'settings'" />
   <Info v-if="name === 'info'" />
   <Help v-if="name === 'help'" />
   <Quotes v-if="name === 'quotes'" />
   <Code v-if="name === 'code'" />
   <Table v-if="name === 'table'" />
   <StatCreation v-if="name === 'statCreation'" />
   <Thunder v-if="name === 'thunder'" />
   <Label v-if="name === 'label'" />
   <Label v-if="name === 'beschreibungen'" />
   <Lock v-if="name === 'lock'" />
   <Lock v-if="name === 'logout'" />
</template>
<script>
export default {
   props: {
      name: {
         type: String,
         required: true,
      },
   },
};
</script>
<style lang="scss">
svg {
   transition: all 0.5s ease;
}
</style>
