
class ColorRepo{
   static COLORS = [      
      "#5d8aa8",
      "#e32636",
      "#efdecd",
      "#ffbf00",
      "#9966cc",
      "#a4c639",
      "#cd9575",
      "#915c83",
      "#008000",
      "#00ffff",
      "#4b5320",
      "#e9d66b",
      "#b2beb5",
      "#ff2052",
      "#007fff",
      "#89cff0",
      "#f4c2c2",
      "#fae7b5",
      "#ffe135",
      "#848482",
      "#98777b",
      "#ffe4c4",
      "#fe6f5e",
      "#0000ff",
      "#8a2be2",
      "#8a2be2",
      "#b5a642",
      "#66ff00",
      "#bf94e4",
      "#c32148",
      "#cd7f32",
      "#e7feff",
      "#5f9ea0",
      "#a3c1ad",
      "#36454f",
   ]
   static get(count, offset=0){
      if(count <= 2 && offset === 0){
         return ["#ff8ded", "#000"].slice(0, count);
      }
      return ColorRepo.COLORS.slice(offset, offset + count)
   }
}

export default ColorRepo;
