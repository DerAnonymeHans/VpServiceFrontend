<!-- @format -->
<script setup>
import { SubjectGetter, Field, SpecificField, SubjectData } from "../structs/subjects.js";
import { KurswahlStruct, ExamStruct, EinbringenStruct } from "../structs/saveble.js";
import Switch from "@/components/switch/Switch.vue";
import KeyLabelPair from "@/structs/KeyLabelPair.js";
import IconRepo from "@/repos/IconRepo.vue";
import Modal from "@/components/modal/Modal.vue";
import Kurs from "./Kurs.vue";
</script>
<template>
   <div>
      <div class="messages">
         <div class="message" v-for="message in messages" :key="message">{{ message }}</div>
      </div>

      <div class="number-of-ended-years center">
         <span>Beendete Halbjahre:</span>
         <select class="select" :value="numberOfEndedYears" @change="(e) => (numberOfEndedYears = parseInt(e.target.value))">
            <option v-for="i in 4" :key="i" :value="i">{{ i }}</option>
            <option :value="5">4 + Prüfung</option>
         </select>
      </div>

      <section>
         <h4>Prüfungsfächer</h4>
         <p>
            In diesen Fächern müssen alle Halbjahre eingebracht werden. Die Punkte der Leistungskurse zählen doppelt.<br /><span
               v-if="numberOfEndedYears === 5"
               >Trage im fünften Feld deine Prüfungsnote ein.</span
            >
         </p>
         <div class="kurs" v-for="kurs in examKurse" :key="kurs.name">
            <Kurs v-bind:kurs="kurs" :numberOfEndedYears="numberOfEndedYears" />
         </div>
      </section>

      <section>
         <h4>Andere Grundkurse</h4>
         <div class="legend">
            <p><span class="square lila" />Pflichteinbringungen</p>
            <p><span class="square pink" />Mindestens 1</p>
            <p><span class="square green" />Auffüllen</p>
         </div>
         <div class="kurs" v-for="kurs in nonExamKurse" :key="kurs.name">
            <Kurs v-bind:kurs="kurs" :numberOfEndedYears="numberOfEndedYears" />
         </div>
      </section>

      <section>
         <h4>Schnitt berechnen</h4>
         <p v-if="numberOfEndedYears !== 4">Nicht belegte Halbjahre werden mit Hilfe des Durchschnitts der vorherigen Halbjahre ausgerechnet</p>
         <div class="center">
            <button class="btn-focus" @click="calculateAbischnitt">Abischnitt berechnen</button>
         </div>
         <div class="schnitt" v-if="schnitt.note !== null">
            <p>Block I: {{ schnitt.block1 }}</p>
            <p>Block II: {{ schnitt.block2 }}</p>
            <p>Block I + II: {{ schnitt.block1 + schnitt.block2 }}</p>
            <p>Punktzahl: {{ schnitt.punkte }}</p>
            <div class="flex-n-margin center">
               <h2 class="schnitt">Abinote: {{ schnitt.note }}</h2>
            </div>
         </div>
      </section>

      <Modal :isOpen="showModal" @close="showModal = !showModal" :title="modalTitle" :content="modalContent" :buttons="[]"></Modal>
   </div>
</template>
<script>
export default {
   data() {
      return {
         kurswahl: KurswahlStruct(),
         exams: ExamStruct(),
         einbringen: EinbringenStruct(),
         messages: [],

         numberOfEndedYears: 1,

         schnitt: { block1: 0, block2: 0, note: null, punkte: null },

         showModal: false,
         modalTitle: "",
         modalContent: "",
      };
   },
   computed: {
      examKurse: function () {
         const kurse = [];
         for (const key in this.einbringen) {
            if (this.einbringen[key].exam !== null) {
               kurse.push(this.einbringen[key]);
            }
         }
         kurse.sort((a, b) => a - b);
         return kurse;
      },
      nonExamKurse: function () {
         const kurse = [];
         for (const key in this.einbringen) {
            if (this.einbringen[key].exam === null) {
               kurse.push(this.einbringen[key]);
            }
         }
         return kurse;
      },
   },
   mounted() {
      this.load();
   },
   methods: {
      calculateAbischnitt() {
         try {
            this.checkAndFillInputs();
            this.makePflichtEinbringungen();
            this.makeAuffüllenEinbringungen();
            this.calculateSchnitt();
            this.save();
         } catch (e) {
            this.modalTitle = "Problem";
            this.modalContent = e.message;
            this.showModal = true;
            console.error(e);
         }
      },
      sumYears(yearsObject) {
         return Object.values(yearsObject)
            .map((year) => year.points)
            .reduce((prev, curr) => prev + curr, 0);
      },
      checkAndFillInputs() {
         for (const key in this.einbringen) {
            const kurs = this.einbringen[key];
            let averagePoints = 0;
            for (let i = 1; i <= this.numberOfEndedYears; i++) {
               if (typeof kurs.years[i].points === "number") {
                  averagePoints += kurs.years[i].points;
                  continue;
               }
               throw new Error(`Ups, du scheinst vergessen zu haben beim Fach ${kurs.name} das ${i}. Halbjahr auszufüllen`);
            }
            averagePoints = Math.round(averagePoints / this.numberOfEndedYears);

            for (let i = this.numberOfEndedYears + 1; i <= 4; i++) {
               kurs.years[i].points = averagePoints;
            }
            if (kurs.exam !== null) {
               kurs.examPoints = averagePoints;
            }
         }
      },
      makePflichtEinbringungen() {
         const bringeAlleJahreEin = (kurs) => {
            for (const key in kurs.years) {
               kurs.years[key].einbringen = "pflicht";
            }
         };
         const bringeNJahreEin = (kurs, jahre, typ = "pflicht") => {
            const years = Object.values(kurs.years);
            // NOTE: sorting is for some reason alwas ascending
            years.sort((a, b) => a.points - b.points);
            for (let i = 0; i < jahre; i++) {
               years[3 - i].einbringen = typ;
            }
         };

         if (this.einbringen.art_music.exam === null) bringeNJahreEin(this.einbringen.art_music, 2);
         if (this.einbringen.reli_ethic.exam === null) bringeNJahreEin(this.einbringen.reli_ethic, 2);

         {
            const bringeSpracheEin = () => {
               if (this.einbringen.lang1 !== undefined && this.einbringen.lang1?.exam !== null) return;
               if (this.einbringen.lang2 !== undefined && this.einbringen.lang2?.exam !== null) return;
               if (SubjectGetter.getSubject(this.kurswahl.lk2).specificField === SpecificField.language) return;

               let averageGewi2 = -1;
               if (this.einbringen.lang2) {
                  averageGewi2 = this.sumYears(this.einbringen.lang2.years);
               }

               let averageGewi1 = this.sumYears(this.einbringen.lang1.years);

               let langIdx = 1;
               if (averageGewi1 < averageGewi2) langIdx = 2;
               bringeAlleJahreEin(this.einbringen[`lang${langIdx}`]);
            };
            bringeSpracheEin();

            const bringeGeschichteEin = () => {
               if (SubjectGetter.getSubject(this.kurswahl.lk2).name === "Geschichte") return;
               if (this.einbringen.history.exam !== null) return;
               bringeAlleJahreEin(this.einbringen.history);
            };
            bringeGeschichteEin();

            const bringeNawiEin = () => {
               let countOfEingebrachteNawis = 0;
               if (SubjectGetter.getSubject(this.kurswahl.lk2).specificField === SpecificField.science) {
                  countOfEingebrachteNawis++;
               }
               let nawis = [];
               for (let i = 1; i <= 3; i++) {
                  if (this.einbringen[`nawi${i}`] === undefined) break;
                  if (this.einbringen[`nawi${i}`].exam === null) {
                     nawis.push(this.einbringen[`nawi${i}`]);
                     continue;
                  }
                  countOfEingebrachteNawis++;
               }

               nawis = nawis
                  .sort((a, b) => {
                     return this.sumYears(a.years) - this.sumYears(b.years);
                  })
                  .reverse();

               for (let i = 0; countOfEingebrachteNawis < 2; i++) {
                  bringeAlleJahreEin(nawis[i]);
                  countOfEingebrachteNawis++;
               }
            };
            bringeNawiEin();

            const bringeGewiEin = () => {
               if (this.einbringen.gewi1.exam !== null || this.einbringen.gewi2.exam !== null) return;

               let averageGewi1 = this.sumYears(this.einbringen.gewi1.years),
                  averageGewi2 = this.sumYears(this.einbringen.gewi2.years);

               let gewiIdx = 1;
               if (averageGewi1 < averageGewi2) gewiIdx = 2;
               bringeNJahreEin(this.einbringen[`gewi${gewiIdx}`], 2);
            };
            bringeGewiEin();
         }

         for (const key in this.einbringen) {
            const kurs = this.einbringen[key];
            if (kurs.exam !== null) continue;
            if (Object.values(kurs.years).some((year) => year.einbringen.length > 0)) continue;
            bringeNJahreEin(kurs, 1, "min1");
         }
      },
      makeAuffüllenEinbringungen() {
         let yearCount = 40 - 5 * 4;
         const uneingebrachte = [];
         for (const key in this.einbringen) {
            const kurs = this.einbringen[key];
            if (kurs.exam !== null) continue;

            for (let i = 1; i <= 4; i++) {
               if (kurs.years[i].einbringen.length > 0) {
                  yearCount--;
                  continue;
               }
               uneingebrachte.push({ kursKey: key, year: kurs.years[i] });
            }
         }
         uneingebrachte.sort((a, b) => a.year.points - b.year.points).reverse();

         for (let i = 0; i < yearCount; i++) {
            uneingebrachte[i].year.einbringen = "auffüllen";
         }
      },
      calculateSchnitt() {
         let points = 0;
         for (const key in this.einbringen) {
            const kurs = this.einbringen[key];
            for (const year in kurs.years) {
               if (kurs.years[year].einbringen.length === 0 && kurs.exam === null) continue;
               console.log(key, kurs.years[year].points * (key.startsWith("lk") ? 2 : 1));
               points += kurs.years[year].points * (key.startsWith("lk") ? 2 : 1);
            }
         }

         this.schnitt.block1 = Math.round((points / (40 + 8)) * 40);
         this.schnitt.block2 = this.examKurse.reduce((prev, curr) => prev + curr.examPoints * 4, 0);

         this.schnitt.punkte = Math.round((points / (40 + 8)) * 100) / 100;
         const gesamtPunkte = this.schnitt.block1 + this.schnitt.block2;

         this.schnitt.note = (() => {
            if (gesamtPunkte >= 823) return "1,0";
            if (gesamtPunkte >= 805) return "1,1";
            if (gesamtPunkte >= 787) return "1,2";
            if (gesamtPunkte >= 769) return "1,3";
            if (gesamtPunkte >= 751) return "1,4";
            if (gesamtPunkte >= 733) return "1,5";
            if (gesamtPunkte >= 715) return "1,6";
            if (gesamtPunkte >= 697) return "1,7";
            if (gesamtPunkte >= 679) return "1,8";
            if (gesamtPunkte >= 661) return "1,9";
            if (gesamtPunkte >= 643) return "2,0";
            if (gesamtPunkte >= 625) return "2,1";
            if (gesamtPunkte >= 607) return "2,2";
            if (gesamtPunkte >= 589) return "2,3";
            if (gesamtPunkte >= 571) return "2,4";
            if (gesamtPunkte >= 553) return "2,5";
            if (gesamtPunkte >= 535) return "2,6";
            if (gesamtPunkte >= 517) return "2,7";
            if (gesamtPunkte >= 499) return "2,8";
            if (gesamtPunkte >= 481) return "2,9";
            if (gesamtPunkte >= 463) return "3,0";
            if (gesamtPunkte >= 445) return "3,1";
            if (gesamtPunkte >= 427) return "3,2";
            if (gesamtPunkte >= 409) return "3,3";
            if (gesamtPunkte >= 391) return "3,4";
            if (gesamtPunkte >= 373) return "3,5";
            if (gesamtPunkte >= 355) return "3,6";
            if (gesamtPunkte >= 337) return "3,7";
            if (gesamtPunkte >= 319) return "3,8";
            if (gesamtPunkte >= 301) return "3,9";
            if (gesamtPunkte === 300) return "4,0";
            return "Nicht bestanden :(";
         })();
      },
      save() {
         const toSave = {};
         for (const key in this.einbringen) {
            toSave[key] = [];
            for (let i = 1; i <= this.numberOfEndedYears && i < 5; i++) {
               toSave[key].push(this.einbringen[key].years[i].points);
            }
            if (this.numberOfEndedYears === 5) toSave[key].push(this.einbringen[key].examPoints);
         }
         localStorage.setItem("einbringen", JSON.stringify(toSave));
      },
      load() {
         let modalContent = "";
         try {
            const stored = JSON.parse(localStorage.getItem("kurswahl"));
            if (stored === undefined || stored === null) throw new Error("Keine Kurswahl");
            this.kurswahl = stored;
         } catch {
            modalContent = "Gib erst deine Kurse an bevor du deine Punkte eintragen kannst. ";
         }

         try {
            const stored = JSON.parse(localStorage.getItem("abifächer"));
            if (stored === undefined || stored === null) throw new Error("Keine Abifächer");
            for (const key in stored) {
               this.exams[key] = stored[key];
            }
         } catch {
            modalContent += "Gib erst deine Abifächer an bevor du deine Punkte eintragen kannst.";
         }

         try {
            const stored = JSON.parse(localStorage.getItem("einbringen"));
            if (stored === undefined || stored === null) throw new Error();

            for (let key in stored) {
               this.numberOfEndedYears = stored[key].length;
               for (let i = 0; i < stored[key].length && i < 4; i++) {
                  this.einbringen[key].years[i + 1].points = stored[key][i];
               }
               if (stored.length === 5) this.einbringen[key].examPoints = stored[key][4];
            }
         } catch {}

         for (const key in this.einbringen) {
            if (!Object.keys(this.kurswahl).includes(key)) {
               delete this.einbringen[key];
               continue;
            }
            this.einbringen[key].name = this.kurswahl[key];
            const examEntry = Object.entries(this.exams).filter((entry) => entry[1] === this.kurswahl[key])[0];
            this.einbringen[key].exam = examEntry ? (parseInt(examEntry[0][1]) < 4 ? "write" : "oral") : null;
         }
         if (modalContent.length > 0) {
            this.modalTitle = "Fehlende Daten";
            this.modalContent = modalContent;
            this.showModal = true;
         }
      },
   },
};
</script>
<style lang="scss" scoped>
@import "@/styles/helper.scss";
@import "@/styles/variables.scss";
@import "@/styles/assets.scss";
@import "@/styles/mixins.scss";
@import "@/styles/components.scss";
@import "./colors.scss";

section {
   @include section;
}

option.duplicate {
   color: red;
}

.number-of-ended-years {
   > * {
      margin-inline: $margin;
   }

   select {
      width: 80px;
   }
}

.legend {
   display: grid;
   grid-template-columns: repeat(auto-fill, 230px);

   p {
      display: flex;
      align-items: center;
      margin: $margin * 0.5 0;
      .square {
         width: $padding;
         height: $padding;
         margin-right: $margin * 0.5;

         &.lila {
            background-color: $lila;
         }
         &.pink {
            background-color: $pink;
         }
         &.green {
            background-color: $green;
         }
      }
   }
}
</style>
