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
            this.body = body;
            return;
         }
         const indexBreaks = body.indexOf("<br> <br> <br>");
         this.head = this.improveHead(body.slice(0, indexBreaks));
         this.body = body.slice(indexBreaks + 9);
      },
      improveHead(headRaw) {
         console.log(headRaw);
         const stringSurroundedBy = (string, start, end) => {
            const startIdx = string.indexOf(start);
            return string.slice(startIdx + start.length, string.indexOf(end, startIdx + start.length));
         };
         const splitted = headRaw.split("<br>");
         const from = stringSurroundedBy(splitted[1], "From: &quot;", "&quot;");
         const to = stringSurroundedBy(splitted[3], "To: &quot;", "&quot;");
         const dateTime = splitted[2].slice(7);
         const subject = splitted[4].slice(10);
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
