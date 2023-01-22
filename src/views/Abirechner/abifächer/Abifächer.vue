<!-- @format -->

<script setup>
import { SubjectGetter, Field, SpecificField, SubjectData } from "../structs/subjects.js";
import { KurswahlStruct, ExamStruct } from "../structs/saveble.js";
import Switch from "@/components/switch/Switch.vue";
import KeyLabelPair from "@/structs/KeyLabelPair.js";
import IconRepo from "@/repos/IconRepo.vue";
import Modal from "@/components/modal/Modal.vue";
import VerifiedIcon from "@/components/warning/VerifiedIcon.vue";
import SubjectOptions from "../components/SubjectOptions.vue";
</script>
<template>
   <div>
      <section>
         <h4>Schriftliche Prüfungen</h4>
         <div class="selectors">
            <div class="label-select-container">
               <div class="label">P1</div>
               <div>{{ exams.p1 }}</div>
            </div>
            <div class="label-select-container">
               <div class="label">P2</div>
               <div>{{ exams.p2 }}</div>
            </div>
            <div class="label-select-container">
               <div class="label">P3</div>
               <select class="select" name="p3-1" :value="exams.p3" @change="(e) => setAndRemoveDuplicate(`p3`, e.target.value)">
                  <SubjectOptions :subjects="p3s" />
               </select>
            </div>
         </div>
      </section>

      <section>
         <h4>Mündliche Prüfungen</h4>
         <div class="selectors">
            <div class="label-select-container">
               <div class="label">P4</div>
               <select class="select" name="p4" :value="exams.p4" @change="(e) => setAndRemoveDuplicate(`p4`, e.target.value)">
                  <SubjectOptions :subjects="p4s" />
               </select>
            </div>
            <div class="label-select-container">
               <div class="label">P5</div>
               <select class="select" name="p5" :value="exams.p5" @change="(e) => setAndRemoveDuplicate(`p5`, e.target.value)">
                  <SubjectOptions :subjects="p5s" />
               </select>
            </div>
         </div>
      </section>
      <Modal :isOpen="showModal" @close="showModal = !showModal" :title="modalTitle" :content="modalContent" :buttons="[]"></Modal>
      <VerifiedIcon :verified="correctness" />
   </div>
</template>
<script>
export default {
   data() {
      return {
         kurswahl: KurswahlStruct(),
         exams: ExamStruct(),
         p3s: [],
         p4s: [],
         p5s: [],

         correctness: false,

         showModal: false,
         modalTitle: "",
         modalContent: "",
      };
   },
   mounted() {
      this.load();
      this.calculateAll();
   },
   methods: {
      calculateAll() {
         this.getAllGroups();
         this.removeWrongExams();
         this.checkCorrectness();
         if (this.correctness) this.save();
      },
      setAndRemoveDuplicate(key, value) {
         for (const entry of Object.entries(this.exams)) {
            if (entry[1] === value && entry[0] !== key) {
               this.exams[entry[0]] = "";
            }
         }
         this.exams[key] = value;
         this.calculateAll();
      },
      isDuplicate(subName) {
         return Object.values(this.exams).includes(subName);
      },
      getAllGroups() {
         const chosenSubsWithoutLk = Object.entries(this.kurswahl).filter((entry) => !entry[0].startsWith("lk"));
         const filterUnchosenSubjects = (sub) => chosenSubsWithoutLk.findIndex((entry) => entry[1] === sub.name) !== -1;

         this.p3s = SubjectGetter.writeExamPossible
            .filter(filterUnchosenSubjects)
            .map((sub) => new SubjectData(sub.name, this.isDuplicate(sub.name)));

         this.p4s = (() => {
            if (this.exams.p3 !== this.kurswahl.gk1) return [new SubjectData(this.kurswahl.gk1, false)];
            let oralSubs = SubjectGetter.oralExamPossible.filter(filterUnchosenSubjects);
            return oralSubs;
         })().map((sub) => new SubjectData(sub.name, this.isDuplicate(sub.name)));

         this.p5s = (() => {
            let oralSubs = SubjectGetter.oralExamPossible.filter((sub) => filterUnchosenSubjects(sub) && sub.name !== this.kurswahl.gk1);
            const missingFields = (() => {
               const fields = Object.values(Field);
               for (const subName of Object.values(this.exams).slice(0, 4)) {
                  const sub = SubjectGetter.getSubject(subName);
                  if (sub === undefined) continue;
                  fields.includes(sub.field) && fields.splice(fields.indexOf(sub.field), 1);
               }
               return fields;
            })();
            const missingScienceOrLang = !Object.values(this.exams).some((subName) => {
               const sub = SubjectGetter.getSubject(subName);
               if (!sub) return false;
               return (sub.specificField === SpecificField.language || sub.specificField === SpecificField.science) && sub.name !== "Deutsch";
            });
            if (missingFields.length > 0) oralSubs = oralSubs.filter((sub) => missingFields.includes(sub.field));
            if (missingScienceOrLang)
               oralSubs = oralSubs.filter((sub) => sub.specificField === SpecificField.language || sub.specificField === SpecificField.science);
            return oralSubs;
         })().map((sub) => new SubjectData(sub.name, this.isDuplicate(sub.name)));
      },
      removeWrongExams() {
         for (let i = 3; i <= 5; i++) {
            if (!this[`p${i}s`].find((subData) => subData.name === this.exams[`p${i}`]) && this.exams[`p${i}`].length > 0) {
               this.exams[`p${i}`] = "";
            }
         }
      },
      checkCorrectness() {
         this.correctness = Object.values(this.exams).every((exam) => exam.length !== 0);
      },
      save() {
         localStorage.setItem("abifächer", JSON.stringify(this.exams));
      },
      load() {
         try {
            const stored = JSON.parse(localStorage.getItem("kurswahl"));
            if (stored === undefined || stored === null) throw new Error("Keine Kurswahl");
            for (const key in stored) {
               this.kurswahl[key] = stored[key];
            }
            this.exams.p1 = this.kurswahl.lk1;
            this.exams.p2 = this.kurswahl.lk2;
         } catch {
            this.modalTitle = "Fehlende Kurswahl";
            this.modalContent = "Bitte gib zuerst deine Kurse an, bevor du deine Abifächer wählen kannst.";
            this.showModal = true;
         }

         try {
            const stored = JSON.parse(localStorage.getItem("abifächer"));
            if (stored === undefined) return;
            for (const key in stored) {
               this.exams[key] = stored[key];
            }
         } catch {}
      },
   },
};
</script>
<style lang="scss">
@import "@/styles/helper.scss";
@import "@/styles/variables.scss";
@import "@/styles/assets.scss";
@import "@/styles/mixins.scss";

section {
   @include section;
   @import "@/styles/components.scss";
}
option.duplicate {
   color: red;
}
</style>
