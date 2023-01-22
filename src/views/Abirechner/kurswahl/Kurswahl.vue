<!-- @format -->
<script setup>
import { SubjectGetter, Field, SpecificField, SubjectData } from "../structs/subjects.js";
import { KurswahlStruct } from "../structs/saveble.js";
import Switch from "@/components/switch/Switch.vue";
import KeyLabelPair from "@/structs/KeyLabelPair.js";
import IconRepo from "@/repos/IconRepo.vue";
import VerifiedIcon from "@/components/warning/VerifiedIcon.vue";
import SubjectOptions from "../components/SubjectOptions.vue";
</script>
<template>
   <div :class="mq.current" class="container">
      <section>
         <h4>Leistungskurse</h4>
         <div class="selectors">
            <div class="label-select-container">
               <div class="label">Leistungskurs 1</div>
               <select class="select" name="leistungskurs-1" :value="kurswahl.lk1" @change="(e) => selectLk1(e.target.value)">
                  <option value="Deutsch">Deutsch</option>
                  <option value="Mathe">Mathe</option>
               </select>
            </div>
            <div class="label-select-container">
               <div class="label">Leistungskurs 2</div>
               <select class="select" name="leistungskurs-2" v-model="kurswahl.lk2" @change="(e) => setAndRemoveDuplicate('lk2', e.target.value)">
                  <SubjectOptions :subjects="lk2" />
               </select>
            </div>
            <div class="label-select-container">
               <div class="label">Grundkurs (Je nach LK1)</div>
               <div>{{ kurswahl.gk1 }}</div>
            </div>
         </div>
      </section>

      <section>
         <h4>Naturwissenschaften und Sprachen</h4>
         <div class="center">
            <Switch :options="nawiLangOptions" :default="nawiLangOption" @switch="changeNawiLangOption" :invert="true" />
         </div>
         <div class="selectors">
            <div class="label-select-container" v-for="i in numberOfGkNawi" :key="i">
               <div class="label">Naturwissenschaft {{ i + (SubjectGetter.getSubject(kurswahl.lk2)?.field === Field.science ? 1 : 0) }}</div>
               <select
                  class="select"
                  name="naturwissenschaften-1"
                  :value="kurswahl[`nawi${i}`]"
                  @change="(e) => setAndRemoveDuplicate(`nawi${i}`, e.target.value)"
               >
                  <SubjectOptions :subjects="nawi" />
               </select>
            </div>

            <div class="label-select-container" v-for="i in numberOfGkLangs" :key="i">
               <div class="label">Sprache {{ i + (SubjectGetter.getSubject(kurswahl.lk2)?.specificField === SpecificField.language ? 1 : 0) }}</div>
               <select
                  class="select"
                  name="sprachen-1"
                  :value="kurswahl[`lang${i}`]"
                  @change="(e) => setAndRemoveDuplicate(`lang${i}`, e.target.value)"
               >
                  <SubjectOptions :subjects="langs" />
               </select>
            </div>
         </div>
      </section>

      <section>
         <h4>Gesellschaftswissenschaften</h4>
         <div class="selectors">
            <div class="label-select-container" v-if="isHistoryGk">
               <div class="label">Gewi 1</div>
               <div>Geschichte</div>
            </div>
            <div class="label-select-container" v-for="i in 2" :key="i">
               <div class="label">Gewi {{ i + (isHistoryGk ? 1 : 0) }}</div>
               <select
                  class="select"
                  name="gesellschaftswissenschaft-1"
                  :value="kurswahl[`gewi${i}`]"
                  @change="(e) => setAndRemoveDuplicate(`gewi${i}`, e.target.value)"
               >
                  <SubjectOptions :subjects="gewi" />
               </select>
            </div>
         </div>
      </section>

      <section>
         <h4>Andere</h4>
         <div class="selectors">
            <div class="label-select-container">
               <div class="label">Musik oder Kunst</div>
               <select
                  class="select"
                  name="musik-kunst-1"
                  :value="kurswahl[`art_music`]"
                  @change="(e) => setAndRemoveDuplicate(`art_music`, e.target.value)"
               >
                  <SubjectOptions :subjects="art_music" />
               </select>
            </div>

            <div class="label-select-container">
               <div class="label">Ethik oder Religion</div>
               <select
                  class="select"
                  name="ethik-religion-1"
                  :value="kurswahl[`reli_ethic`]"
                  @change="(e) => setAndRemoveDuplicate(`reli_ethic`, e.target.value)"
               >
                  <SubjectOptions :subjects="reli_ethic" />
               </select>
            </div>

            <div class="label-select-container">
               <div class="label">Sport</div>
               <div>Sport</div>
            </div>
         </div>
      </section>

      <VerifiedIcon :verified="correctness" />
   </div>
</template>
<script>
export default {
   inject: ["mq"],
   data() {
      return {
         kurswahl: KurswahlStruct(),
         nawiLangOptions: [new KeyLabelPair("3-nawi", "3 Nawi, 1 Sprache"), new KeyLabelPair("2-nawi", "2 Nawi, 2 Sprachen")],
         nawiLangOption: "3-nawi",
         numberOfGkNawi: 3,
         numberOfGkLangs: 1,
         lk2: [],
         nawi: [],
         langs: [],
         gewi: [],
         art_music: [],
         reli_ethic: [],
         isHistoryGk: true,
         correctness: false,
      };
   },
   mounted() {
      this.load();
      this.calculateAll(false);
   },
   methods: {
      calculateAll(save = true) {
         this.getAllGroups();
         this.getNumberOfGkNawiAndLangs();
         this.checkCorrectNess();
         if (this.correctness && save) this.save();
      },
      setAndRemoveDuplicate(key, value) {
         for (const entry of Object.entries(this.kurswahl)) {
            if (entry[1] === value && entry[0] !== key) {
               this.kurswahl[entry[0]] = "";
            }
         }
         this.kurswahl[key] = value;
         this.calculateAll();
      },
      isDuplicate(value) {
         for (const entry of Object.entries(this.kurswahl)) {
            if (entry[1] === value) return true;
         }
         return false;
      },
      getAllGroups() {
         this.lk2 = SubjectGetter.possibleLeistungskurse2.map((sub) => new SubjectData(sub.name, this.isDuplicate(sub.name)));
         this.nawi = [...SubjectGetter.sciences, SubjectGetter.getSubject("Informatik")].map(
            (sub) => new SubjectData(sub.name, this.isDuplicate(sub.name))
         );
         this.langs = SubjectGetter.languages.map((sub) => new SubjectData(sub.name, this.isDuplicate(sub.name)));
         this.gewi = [
            ...SubjectGetter.society.filter((sub) => sub.name !== "Geschichte"),
            SubjectGetter.getSubject("Astronomie"),
            SubjectGetter.getSubject("Philosophie"),
            SubjectGetter.getSubject("Informatik"),
         ].map((sub) => new SubjectData(sub.name, this.isDuplicate(sub.name)));

         this.art_music = [SubjectGetter.getSubject("Musik"), SubjectGetter.getSubject("Kunst")].map(
            (sub) => new SubjectData(sub.name, this.isDuplicate(sub.name))
         );

         this.reli_ethic = [SubjectGetter.getSubject("Ethik"), SubjectGetter.getSubject("Religion")].map(
            (sub) => new SubjectData(sub.name, this.isDuplicate(sub.name))
         );

         this.isHistoryGk = this.kurswahl.lk2 !== "Geschichte";
         if (this.isHistoryGk) this.kurswahl.history = "Geschichte";
         else this.kurswahl.history = "";
      },
      selectLk1(val) {
         this.kurswahl.lk1 = val;
         this.kurswahl.gk1 = this.kurswahl.lk1 === "Mathe" ? "Deutsch" : "Mathe";
      },
      changeNawiLangOption(val) {
         this.nawiLangOption = val;
         if (val === "3-nawi") {
            this.kurswahl.lang2 = "";
         }
         if (val === "2-nawi") {
            this.kurswahl.nawi3 = "";
         }
         this.calculateAll();
      },
      getNumberOfGkNawiAndLangs() {
         const newNawiNumber =
            (this.nawiLangOption === "3-nawi" ? 3 : 2) - (SubjectGetter.getSubject(this.kurswahl.lk2)?.field === Field.science ? 1 : 0);

         if (newNawiNumber < this.numberOfGkNawi) {
            this.kurswahl.nawi3 = "";
         }
         this.numberOfGkNawi = newNawiNumber;

         const newLangNumber =
            (this.nawiLangOption === "3-nawi" ? 1 : 2) -
            (SubjectGetter.getSubject(this.kurswahl.lk2)?.specificField === SpecificField.language ? 1 : 0);
         if (newLangNumber < this.numberOfGkLangs) {
            this.kurswahl.lang2 = "";
         }
         this.numberOfGkLangs = newLangNumber;
      },
      checkCorrectNess() {
         this.correctness = (() => {
            if (this.kurswahl.lk1.length === 0 || this.kurswahl.lk2.length === 0) return false;
            if (this.numberOfGkNawi === 1 && this.kurswahl.nawi1.length === 0) return false;
            if (this.numberOfGkNawi === 2 && (this.kurswahl.nawi1.length === 0 || this.kurswahl.nawi2.length === 0)) return false;
            if (
               this.numberOfGkNawi === 3 &&
               (this.kurswahl.nawi1.length === 0 || this.kurswahl.nawi2.length === 0 || this.kurswahl.nawi3.length === 0)
            )
               return false;

            if (this.numberOfGkLangs === 1 && this.kurswahl.lang1.length === 0) return false;
            if (this.numberOfGkLangs === 2 && (this.kurswahl.lang1.length === 0 || this.kurswahl.lang2.length === 0)) return false;
            if (this.kurswahl.art_music.length === 0) return false;
            if (this.kurswahl.reli_ethic.length === 0) return false;
            if (this.kurswahl.gewi1.length === 0 || this.kurswahl.gewi2.length === 0) return false;
            return true;
         })();
      },
      save() {
         const kurswahlCopy = { ...this.kurswahl };
         for (const key in kurswahlCopy) {
            if (kurswahlCopy[key].length > 0) continue;
            delete kurswahlCopy[key];
         }
         localStorage.setItem("kurswahl", JSON.stringify(kurswahlCopy));
         localStorage.setItem("abifächer", undefined);
         localStorage.setItem("einbringen", undefined);
      },
      load() {
         try {
            const stored = JSON.parse(localStorage.getItem("kurswahl"));
            if (stored === undefined) return;
            for (const key in stored) {
               this.kurswahl[key] = stored[key];
            }
         } catch {}
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

section {
   @include section;
}

option.duplicate {
   color: red;
}
</style>
