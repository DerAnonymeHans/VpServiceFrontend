<!-- @format -->

<template>
   <div :class="{ showIndentation: number > 0 }">
      <div>
         <div class="body-head" v-if="head !== null" v-html="head"></div>
         <div class="body-body" v-html="body"></div>
      </div>
      <MailBody :number="number + 1" :bodies="bodies.slice(1)" v-if="bodies.length > 1" />
   </div>
</template>
<script>
export default {
   props: {
      number: { type: Number, required: true },
      bodies: { type: Array, required: true },
   },
   data() {
      return {
         head: "",
         body: "",
      };
   },
   updated() {
      this.loadHeadAndBody();
   },
   mounted() {
      this.loadHeadAndBody();
   },
   methods: {
      loadHeadAndBody() {
         const body = this.bodies[0];
         if (this.number === 0) {
            this.head = null;
            this.body = body?.replaceAll("\r\n", "<br>");
            return;
         }
         const splitted = body.split("\r\n");
         this.head = this.improveHead(splitted.slice(1, 7).join("|"));
         this.body = splitted
            .slice(7)
            .join("<br>")
            .split("<br>" + ">".repeat(this.number))
            .join("<br>")
            .slice(this.number - 1);
      },
      improveHead(headRaw) {
         const stringSurroundedBy = (string, start, end) => {
            const startIdx = string.indexOf(start);
            return string.slice(startIdx + start.length, string.indexOf(end, startIdx + start.length));
         };
         let splitted = headRaw.split("|");
         if (splitted.length === 1) splitted = headRaw.split("\r\n");
         const from = stringSurroundedBy(splitted[0], 'From: "', '"');
         const to = stringSurroundedBy(splitted[2], 'To: "', '"');
         const dateTime = splitted[1].slice(9);
         const subject = splitted[3].slice(9);
         return `
            <b>${subject}</b><br>
            Von <u>${from}</u> an <u>${to}</u><br>
            ${dateTime}
         `;
      },
   },
};
</script>
<style lang="scss" scoped>
@import "@/styles/_variables.scss";
.showIndentation {
   border-left: 1px solid rgba($accent, 0.5);
   margin-left: $margin * 0.2;
   margin-top: $margin;
   padding-left: $padding * 0.4;
}
.body-head {
   opacity: 0.4;
   font-style: italic;
}
</style>
