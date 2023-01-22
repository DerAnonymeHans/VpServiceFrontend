/** @format */

const _KurswahlStruct = {
   lk1: "Mathe",
   lk2: "",
   gk1: "Deutsch",
   lang1: "",
   lang2: "",
   nawi1: "",
   nawi2: "",
   nawi3: "",
   art_music: "",
   reli_ethic: "",
   gewi1: "",
   gewi2: "",
   history: "Geschichte",
   sports: "Sport",
};
function KurswahlStruct() {
   return { ..._KurswahlStruct };
}

const _HalbJahrData = {
   points: null,
   einbringen: "",
};
function HalbJahrData() {
   return { ..._HalbJahrData };
}

function EinbringenStruct() {
   const kurspunkte = {};
   for (const key in _KurswahlStruct) {
      kurspunkte[key] = {
         name: "",
         exam: null,
         examPoints: null,
         years: { 1: HalbJahrData(), 2: HalbJahrData(), 3: HalbJahrData(), 4: HalbJahrData() },
      };
   }
   return kurspunkte;
}

const _ExamStruct = {
   p1: "",
   p2: "",
   p3: "",
   p4: "",
   p5: "",
};
function ExamStruct() {
   return { ..._ExamStruct };
}

export { KurswahlStruct, ExamStruct, EinbringenStruct };
