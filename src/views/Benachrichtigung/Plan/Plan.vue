<!-- @format -->

<template>
   <div class="box plan-box" :style="{ borderTopColor: color }">
      <h4 class="weekday" :style="{ textDecorationColor: color }">{{ plan.affectedWeekday }}</h4>
      <div class="announcements border-box" v-if="plan.announcements.length > 0">
         <span v-for="info in plan.announcements" :key="info">{{ info }}<br /></span>
      </div>
      <div class="missing-teachers border-box">Es fehlen: {{ plan.missingTeachers.join(",") }}</div>
      <table v-if="plan.rows?.length > 0">
         <tr>
            <th>Klasse</th>
            <th>Stunde</th>
            <th>Fach</th>
            <th>Lehrer</th>
            <th>Raum</th>
            <th>Info</th>
         </tr>
         <tr v-for="row in plan.rows" :key="row" :style="{ color: row.hasChange ? (row.isDeleted ? 'red' : color) : '' }">
            <td>{{ row.row.klasse }}</td>
            <td>{{ row.row.stunde }}</td>
            <td>{{ row.row.fach }}</td>
            <td>{{ row.row.lehrer }}</td>
            <td>{{ row.row.raum }}</td>
            <td>{{ row.row.info }}</td>
         </tr>
      </table>
      <p class="center" v-else>Keine Änderungen...</p>
   </div>
</template>
<script>
class Plan {
   constructor(affectedDate, affectedWeekday, originDate, originTime, announcements, missingTeachers, rows) {
      this.affectedDate = affectedDate;
      this.affectedWeekday = affectedWeekday;
      this.originDate = originDate;
      this.originTime = originTime;
      this.announcements = announcements;
      this.missingTeachers = missingTeachers;
      this.rows = rows;
   }
}
export default {
   props: {
      color: {
         type: String,
         required: true,
      },
      plan: {
         required: true,
         type: Plan,
      },
   },
};

export { Plan };
</script>
<style lang="scss" scoped>
@import "@/styles/_variables.scss";
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

.plan-box {
   padding-inline: $padding * 0.1;
   border-top-width: $border-radius !important;
   border-top-style: solid !important;
}

.weekday {
   text-decoration: underline;
   text-decoration-thickness: 2px;
}

.border-box {
   border: 1px solid var(--col-dark);
   border-radius: $border-radius;
   margin: $margin * 0.5;
   padding: $padding * 0.5;
}

.announcements {
   text-align: center;
}
</style>
