import{_ as u,o,c as i,b as a,F as w,g as _,t as s,k as v,n as p,d,l as x,w as g,p as y,e as k,m as I}from"./index.dc289299.js";import{I as S}from"./Input.6aec511c.js";const T={inject:["mq"],props:{title:{type:Object,required:!0},isInvert:Boolean,text:String},data(){return{invert:this.isInvert?"invert":""}}},z={class:"heading-container"},C={key:0,class:"colored"},F={key:1},D={key:0,class:"content-container"},M={key:1,class:"content-container"};function $(n,t,e,r,f,c){return o(),i("section",{class:p([c.mq.current,f.invert])},[a("div",z,[(o(!0),i(w,null,_(e.title,l=>(o(),i("div",{key:l},[l.isColored?(o(),i("h2",C,s(l.value),1)):(o(),i("h2",F,s(l.value),1))]))),128))]),e.isInvert&&c.mq.desktop?(o(),i("div",D,[v(n.$slots,"default"),a("article",null,s(e.text),1)])):(o(),i("div",M,[a("article",null,s(e.text),1),v(n.$slots,"default")]))],2)}var h=u(T,[["render",$]]);const q={props:{type:{type:String,required:!0},label:{type:String,required:!0},name:String,isInvert:{type:Boolean,required:!0},defaultRows:Number}},B=["name","rows"];function V(n,t,e,r,f,c){return o(),i("div",{class:p({invert:e.isInvert})},[a("label",null,s(e.label),1),a("textarea",{name:e.name,rows:e.defaultRows},null,8,B)],2)}var b=u(q,[["render",V],["__scopeId","data-v-41151761"]]);const m=n=>(y("data-v-284594de"),n=n(),k(),n),A=m(()=>a("iframe",{id:"dummy",style:{display:"none",opacity:"0"}},null,-1)),E=m(()=>a("div",{class:"center margin-vert"},[a("button",{class:"btn-focus"},"Vorschlagen")],-1)),j=m(()=>a("div",{class:"center margin-vert"},[a("button",{class:"btn-focus"},"Senden")],-1)),N={data(){return{kleinAberFeinText:"Das kleine aber feine Extra ist ein wichtiger Bestandteil der Mails. Durch interessante Fakten, lustige Spr\xFCche oder weise Zitate wird die Email um ein Vielfaches aufgewertet. Deshalb ist es wichtig, dass es stets Nachschub an kleinen Extras gibt... und daf\xFCr bist auch DU verantwortlich. Also, suche etwas und schlage es doch vor.",aufmerksamMachenText:"Wenn dir etwas auff\xE4llt, bspw ein Bug oder unerwartetes Verhalten, dann kannst du es hier melden. Wenn du Verbesserungsvorschl\xE4ge hast oder gar Ideen f\xFCr ganz neue Features dann schreib diese bitte auch hier. Durch Feedback kann Kepleraner immer besser werden, also trau dich und schreib etwas (nat\xFCrlich ganz anonym).",showModal:!1,modalTitle:"",modalContent:""}},methods:{submit(n){n.preventDefault();const t=n.target.attributes.action.nodeValue,e=new FormData(n.target);I(t,{method:"POST",body:e}).then(r=>r.json()).then(r=>{r.isSuccess?(this.modalTitle="Erfolg",n.target.reset()):this.modalTitle="Fehlschlag",this.modalContent=r.message,this.showModal=!0})}}},P=Object.assign(N,{__name:"Index",setup(n){return(t,e)=>(o(),i("main",null,[d(x,{isOpen:t.showModal,onClose:e[0]||(e[0]=r=>t.showModal=!t.showModal),title:t.modalTitle,content:t.modalContent,buttons:[]},null,8,["isOpen","title","content"]),A,d(h,{title:[{value:"Klein aber\xA0"},{value:"fein",isColored:!0}],isInvert:!1,text:t.kleinAberFeinText},{default:g(()=>[a("form",{action:"/ProposeSmallExtra",onSubmit:e[1]||(e[1]=(...r)=>t.submit&&t.submit(...r)),target:"dummy"},[d(b,{isInvert:!0,label:"Text",name:"text"}),d(S,{isInvert:!0,label:"Autor (optional)",type:"text",name:"author"}),E],32)]),_:1},8,["text"]),d(h,{title:[{value:"Aufmerksam\xA0",isColored:!0},{value:"machen"}],isInvert:!0,text:t.aufmerksamMachenText},{default:g(()=>[a("form",{action:"/Proposal",onSubmit:e[2]||(e[2]=(...r)=>t.submit&&t.submit(...r)),target:"dummy"},[d(b,{isInvert:!0,label:"Text",name:"text",defaultRows:7}),j],32)]),_:1},8,["text"])]))}});var O=u(P,[["__scopeId","data-v-284594de"]]);export{O as default};
