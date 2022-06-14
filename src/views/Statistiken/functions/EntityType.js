class Type{
   constructor(idx, string, color, key){
      this.idx = idx;
      this.string = string;
      this.color = color;
      this.key = key;
   }
}
class EntityType{
   static TEACHER = new Type(0, "Lehrer", "#ff4700", "TEACHER")
   static SUBJECT = new Type(1, "Fach", "#ff007a", "SUBJECT")
   static KURS = new Type(2, "Kurs", "#7800ff", "KURS")
   static GRADE = new Type(3, "Klassenstufe", "#005cff", "GRADE")
   static CLASS = new Type(4, "Klasse", "#00c1ff", "CLASS")
   static KEPLER = new Type(5, "Kepler", "#ff8ded", "KEPLER")
}


export default EntityType;