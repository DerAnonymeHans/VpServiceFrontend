import{S as v}from"./KeyLabelPair.ca6819e9.js";import{_ as m,o as c,c as i,b as r,t as s,a as l,j as b,n as u,g,F as f}from"./index.8e60bec0.js";const p={class:"text"},h={class:"name"},k={class:"desc"},y={inject:["mq"],props:{_key:{type:String,required:!0},name:{type:String,required:!0},description:String,options:{type:Array,required:!0},defaultValue:String}},x=Object.assign(y,{__name:"Setting",setup(t){return(n,e)=>(c(),i("div",{class:u([n.mq.current,"setting"])},[r("div",{class:u(["setting-content",{isSwitch:t.options.length>1}])},[r("div",p,[r("p",h,s(t.name),1),r("p",k,s(t.description),1)]),t.options.length===1?(c(),i("button",{key:0,class:"btn",onClick:e[0]||(e[0]=a=>n.$emit("optionChange",{option:t._key,value:t.options[0].key}))},s(t.options[0].label),1)):l("",!0),t.options.length>1?(c(),b(v,{key:1,invert:!0,options:t.options,default:t.defaultValue,onSwitch:e[1]||(e[1]=a=>n.$emit("optionChange",{option:t._key,value:a}))},null,8,["options","default"])):l("",!0)],2)],2))}});var _=m(x,[["__scopeId","data-v-cec8682c"]]);const w={props:{settings:{type:Array,required:!0}}};class q{constructor(n,e){this.title=n,this.settings=e}}class ${constructor(n,e,a,o,d){this.key=n,this.name=e,this.desc=a,this.options=o,this.defaultVal=d}}const S=Object.assign(w,{__name:"Settings",setup(t){return(n,e)=>(c(!0),i(f,null,g(t.settings,a=>(c(),i("div",{class:"box",key:a.title},[r("h2",null,s(a.title),1),(c(!0),i(f,null,g(a.settings,o=>(c(),b(_,{key:o.key,_key:o.key,name:o.name,description:o.desc,options:o.options,defaultValue:o.defaultVal,onOptionChange:e[0]||(e[0]=d=>n.$emit("settingChange",d))},null,8,["_key","name","description","options","defaultValue"]))),128))]))),128))}});var j=m(S,[["__scopeId","data-v-32ce7dcf"]]);export{j as S,q as a,$ as b};
