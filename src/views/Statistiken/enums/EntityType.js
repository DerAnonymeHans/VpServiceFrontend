/** @format */

class Type {
   constructor(idx, name, color, key) {
      this.idx = idx;
      this.name = name;
      this.color = color;
      this.key = key;
   }
}
class EntityType {
   static TEACHER = new Type(0, "Lehrer", "#ff4700", "TEACHER");
   static SUBJECT = new Type(1, "Fächer", "#ff007a", "SUBJECT");
   static KURS = new Type(2, "Kurse", "#7800ff", "KURS");
   static GRADE = new Type(3, "Klassenstufen", "#005cff", "GRADE");
   static CLASS = new Type(4, "Klassen", "#00c1ff", "CLASS");
   static KEPLER = new Type(5, "Kepler", "#ff8ded", "KEPLER");
}

export default EntityType;
