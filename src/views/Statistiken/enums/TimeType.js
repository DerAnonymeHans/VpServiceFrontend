/** @format */

export default class TimeType {
   static MONTH = 0;
   static DAY = 1;
   static LESSON = 2;
}

class TimeName {
   constructor(name, key) {
      this.name = name;
      this.key = key;
   }
}

const Months = [
   new TimeName("Januar", "january"),
   new TimeName("Februar", "february"),
   new TimeName("März", "march"),
   new TimeName("April", "april"),
   new TimeName("Mai", "may"),
   new TimeName("Juni", "june"),
   new TimeName("Juli", "july"),
   new TimeName("August", "august"),
   new TimeName("September", "september"),
   new TimeName("Oktober", "october"),
   new TimeName("November", "november"),
   new TimeName("Dezember", "december"),
];

const Weekdays = [
   new TimeName("Montag", "monday"),
   new TimeName("Dienstag", "tuesday"),
   new TimeName("Mittwoch", "wednesday"),
   new TimeName("Donnerstag", "thursday"),
   new TimeName("Freitag", "friday"),
];

const Lessons = [
   new TimeName("Erste", "first"),
   new TimeName("Zweite", "second"),
   new TimeName("Dritte", "third"),
   new TimeName("Vierte", "fourth"),
   new TimeName("Fünfte", "fifth"),
   new TimeName("Sechste", "sixth"),
   new TimeName("Siebte", "seventh"),
   new TimeName("Achte", "eigth"),
];

export { Months, Weekdays, Lessons };
