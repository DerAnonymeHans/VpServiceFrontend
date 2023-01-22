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
import Account from "@/assets/icons/account.svg?component";
import Email from "@/assets/icons/email.svg?component";
import DataSet from "@/assets/icons/dataset.svg?component";
import Dialpad from "@/assets/icons/dialpad.svg?component";
import Graduation from "@/assets/icons/graduation.svg?component";
import Verified from "@/assets/icons/verified.svg?component";
import Warning from "@/assets/icons/warning.svg?component";
</script>
<template>
   <Verified v-if="name === 'verified'" />
   <Warning v-if="name === 'warning'" />
   <DataSet v-if="name === 'kurswahl'" />
   <Dialpad v-else-if="name === 'punkte'" />
   <Graduation v-else-if="name === 'abifächer'" />
   <Gesamtzahlen v-else-if="name === 'gesamtzahlen'" />
   <Beziehungen v-else-if="name === 'beziehungen'" />
   <Durchschnitt v-else-if="name === 'durchschnitt'" />
   <Relativ v-else-if="name === 'relativ'" />
   <Vergleich v-else-if="name === 'vergleich'" />
   <Zeit v-else-if="name === 'zeit'" />
   <Save v-else-if="name === 'save'" />
   <Delete v-else-if="name === 'delete'" />
   <Close v-else-if="name === 'close'" />
   <Settings v-else-if="name === 'settings'" />
   <Info v-else-if="name === 'info'" />
   <Help v-else-if="name === 'help'" />
   <Quotes v-else-if="name === 'quotes'" />
   <Code v-else-if="name === 'code'" />
   <Table v-else-if="name === 'table'" />
   <StatCreation v-else-if="name === 'statCreation'" />
   <Thunder v-else-if="name === 'thunder'" />
   <Label v-else-if="name === 'label'" />
   <Label v-else-if="name === 'beschreibungen'" />
   <Lock v-else-if="name === 'lock'" />
   <Lock v-else-if="name === 'logout'" />
   <Account v-else-if="name === 'account'" />
   <Email v-else-if="name === 'email'" />
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
