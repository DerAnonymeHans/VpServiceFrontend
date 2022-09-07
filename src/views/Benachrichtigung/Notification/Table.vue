<!-- @format -->

<template>
   <div v-if="table.rows.length > 0">
      <h4 class="plan-weekday" :style="{ textDecorationColor: color }">{{ table.weekday }}</h4>
      <span v-for="info in table.information" :key="info">{{ info }}<br /></span>
      <table>
         <tr>
            <th>Klasse</th>
            <th>Stunde</th>
            <th>Fach</th>
            <th>Lehrer</th>
            <th>Raum</th>
            <th>Info</th>
         </tr>
         <tr v-for="row in table.rows" :key="row" :style="{ color: row.hasChange ? color : '' }">
            <td>{{ row.row.klasse }}</td>
            <td>{{ row.row.stunde }}</td>
            <td>{{ row.row.fach }}</td>
            <td>{{ row.row.lehrer }}</td>
            <td>{{ row.row.raum }}</td>
            <td>{{ row.row.info }}</td>
         </tr>
      </table>
   </div>
</template>
<script>
class Table {
   constructor(weekday, rows, information = []) {
      this.weekday = weekday;
      this.rows = rows;
      this.information = information;
   }
}
export default {
   props: {
      color: {
         type: String,
         required: true,
      },
      table: {
         required: true,
         type: Table,
      },
   },
};

export { Table };
</script>
<style lang="scss" scoped>
table {
   width: 100%;

   tr {
      td,
      th {
         border-left: none;
         &:nth-child(2n) {
            background-color: var(--col-light);
         }
         &:nth-child(2n - 1) {
            background-color: var(--col-dark);
         }
         &:last-child {
            word-break: break-all;
         }
      }
   }
}

.plan-weekday {
   text-decoration: underline;
   text-decoration-thickness: 2px;
}
</style>
