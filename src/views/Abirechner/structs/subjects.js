/** @format */

class Subject {
   constructor(name, field, specificField, canBeDeselectedBy, writeExamPossible, oralExamPossible, canBeLeistungskurs, examMandatory) {
      this.name = name;
      this.field = field;
      this.specificField = specificField;
      this.canBeDeselectedBy = canBeDeselectedBy;
      this.writeExamPossible = writeExamPossible;
      this.oralExamPossible = oralExamPossible;
      this.canBeLeistungskurs = canBeLeistungskurs;
      this.examMandatory = examMandatory;
   }
}
class ChoosedSubject {
   constructor(subjectName, isLeistungskurs = false, choosedFor = null) {
      this.subject = subjectName;
      this.isLeistungskurs = isLeistungskurs;
      this.choosedFor = choosedFor;
   }
}

class SubjectData {
   constructor(subName, duplicate) {
      this.name = subName;
      this.duplicate = duplicate;
   }
}

const Field = Object.freeze({
   science: "NaWi",
   language_literature_art: "Sprache-Kunst",
   society: "GeWi",
});
const SpecificField = Object.freeze({
   language: "Sprache",
   art_music: "Kunst-Musik",
   german_math: "Deutsch-Mathe",
   society: "GeWi",
   science: "NaWi",
   informatics: "Informatik",
   ethics_religion: "Etihk-Religion",
   sports: "Sport",
   astro_philo: "Astro-Philo",
});

const MATH = new Subject("Mathe", Field.science, SpecificField.german_math, [], true, true, true, true);
const GERMAN = new Subject("Deutsch", Field.language_literature_art, SpecificField.german_math, [], true, true, true, true);

const ENGLISH = new Subject("Englisch", Field.language_literature_art, SpecificField.language, [], true, true, true);
const FRENCH = new Subject("Französisch", Field.language_literature_art, SpecificField.language, [], false, true);
const RUSSIAN = new Subject("Russisch", Field.language_literature_art, SpecificField.language, [], false, true);
const LATIN = new Subject("Latein", Field.language_literature_art, SpecificField.language, [], false, true);

const ART = new Subject("Kunst", Field.language_literature_art, SpecificField.art_music, [], false, true);
const MUSIC = new Subject("Musik", Field.language_literature_art, SpecificField.art_music, [], false, true);

const HISTORY = new Subject("Geschichte", Field.society, SpecificField.art_music, [], true, true, true);

const GRW = new Subject("GRW", Field.society, SpecificField.society, [], true, true);
const GEOGRAPHY = new Subject("Geographie", Field.society, SpecificField.society, [], true, true);

const PHYSICS = new Subject("Physik", Field.science, SpecificField.science, [], true, true, true);
const CHEMISTRY = new Subject("Chemie", Field.science, SpecificField.science, [], true, true, true);
const BIOLOGY = new Subject("Biologie", Field.science, SpecificField.science, [], true, true, true);
const INFORMATICS = new Subject("Informatik", Field.science, SpecificField.informatics, [], false, true);

const RELIGION = new Subject("Religion", Field.other, SpecificField.ethics_religion, [], false, true);
const ETHICS = new Subject("Ethik", Field.other, SpecificField.ethics_religion, [], false, true);

const SPORTS = new Subject("Sport", Field.other, SpecificField.sports, [], false, false);

const ASTRONOMY = new Subject("Astronomie", Field.other, SpecificField.astro_philo, [], false, false);
const PHILOSOPHY = new Subject("Philosophie", Field.other, SpecificField.astro_philo, [], false, false);

const SubjectGetter = {
   ALL: [
      MATH,
      GERMAN,
      ENGLISH,
      FRENCH,
      LATIN,
      RUSSIAN,
      ART,
      MUSIC,
      HISTORY,
      GRW,
      GEOGRAPHY,
      PHYSICS,
      CHEMISTRY,
      BIOLOGY,
      INFORMATICS,
      RELIGION,
      ETHICS,
      SPORTS,
      ASTRONOMY,
      PHILOSOPHY,
   ],
   sciences: [],
   languages: [],
   secondLanguages: [],
   society: [],
   possibleLeistungskurse: [],
   possibleLeistungskurse2: [],
   writeExamPossible: [],
   oralExamPossible: [],
   getSubject(name) {
      return SubjectGetter.ALL.find((sub) => sub.name === name);
   },
};
SubjectGetter.sciences = SubjectGetter.ALL.filter((sub) => sub.specificField === SpecificField.science);
SubjectGetter.languages = SubjectGetter.ALL.filter((sub) => sub.specificField === SpecificField.language);
SubjectGetter.secondLanguages = SubjectGetter.languages.filter((sub) => sub.name !== "Englisch");
SubjectGetter.society = SubjectGetter.ALL.filter((sub) => sub.field === Field.society);
SubjectGetter.possibleLeistungskurse = SubjectGetter.ALL.filter((sub) => sub.canBeLeistungskurs);
SubjectGetter.possibleLeistungskurse2 = SubjectGetter.ALL.filter((sub) => sub.canBeLeistungskurs && sub.name !== "Deutsch" && sub.name !== "Mathe");
SubjectGetter.writeExamPossible = SubjectGetter.ALL.filter((sub) => sub.writeExamPossible);
SubjectGetter.oralExamPossible = SubjectGetter.ALL.filter((sub) => sub.oralExamPossible);

export {
   Subject,
   ChoosedSubject,
   SubjectData,
   Field,
   SpecificField,
   SubjectGetter,
   MATH,
   GERMAN,
   ENGLISH,
   FRENCH,
   LATIN,
   RUSSIAN,
   ART,
   MUSIC,
   HISTORY,
   GRW,
   GEOGRAPHY,
   PHYSICS,
   CHEMISTRY,
   BIOLOGY,
   INFORMATICS,
   RELIGION,
   ETHICS,
   SPORTS,
   ASTRONOMY,
   PHILOSOPHY,
};
