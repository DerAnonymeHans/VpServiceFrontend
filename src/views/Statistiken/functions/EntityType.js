class EntityType{
   static TEACHER = new Type(0, "Lehrer")
   static SUBJECT = new Type(1, "Fach")
   static KURS = new Type(2, "Kurs")
   static GRADE = new Type(3, "Klassenstufe")
   static CLASS = new Type(4, "Klasse")
   static KEPLER = new Type(4, "Kepler")
}

class Type{
   constructor(idx, string){
      this.idx = idx;
      this.string = string;
   }
}

export default EntityType;