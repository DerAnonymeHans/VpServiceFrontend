import{_ as c,o,c as i,b as n,t as h,n as m,p,e as b,g as f,f as _,h as w,d as s,M as I,F as S}from"./index.0b9c7c13.js";const g=e=>(p("data-v-526d7112"),e=e(),b(),e),x={class:"heading"},C={class:"user-count"},j=g(()=>n("span",{class:"user"}," Nutzer",-1)),F=g(()=>n("h4",{class:"heading-explanation"},"vertrauen auf vp.mailservice.kepler@gmail.com",-1)),T={inject:["mq"],data(){return{userCount:"#"}},mounted(){f("/GetUserCount").then(e=>e.json()).then(e=>{e.isSuccess?this.userCount=e.body:this.userCount="#"})}},q=Object.assign(T,{name:"Header",setup(e){return(a,t)=>(o(),i("header",{class:m(["head",a.mq.current])},[n("h1",x,[n("span",C,h(a.userCount),1),j]),F],2))}});var v=c(q,[["__scopeId","data-v-526d7112"]]),z="/assets/mail-example-hand.851ced2c.png";const M={inject:["mq"],methods:{scrollToForm(){window.scrollBy({top:1e5,left:0,behavior:"smooth"})}}},y=e=>(p("data-v-b67e728a"),e=e(),b(),e),k={class:"text-container"},B=y(()=>n("article",null,[_(" Bist du nicht auch genervt jedesmal nach einem neuen Vertretungsplan zu schauen? Und dann musst du dich auch nochmal neu anmelden und suchst ewig nach den Zeilen die dich \xFCberhaupt betreffen... Doch dagegen gibt es ein Mittel! Indem du den VpMailservice abonnierst erh\xE4lst du mit maximal 10 min\xFCtiger Verz\xF6gerung Informationen \xFCber einen neuen Plan (nur wenn sich tats\xE4chlich etwas f\xFCr dich \xE4ndert!!), wenn vorhanden erh\xE4lst du sogar noch den vom Tag danach - und zwar auch nur die Daten die du auch brauchst."),n("br"),_(" Um das ganze noch weiter aufzuwerten, erh\xE4lst du im oberen Bild in der Email Informationen \xFCber das Wetter oder siehst andere eventabh\xE4ngige Kunstwerke. Nicht zu vergessen ist au\xDFerdem das 'Kleine aber feine Extra' mit lustigen Spr\xFCchen, interessanten Fakten oder weisen Zitaten. ")],-1)),E=y(()=>n("img",{src:z,alt:"Email"},null,-1));function N(e,a,t,r,d,l){return o(),i("main",{class:m(l.mq.current)},[n("div",k,[n("button",{class:"btn-focus",onClick:a[0]||(a[0]=Z=>l.scrollToForm())},"Zum Abonnement"),B]),E],2)}var $=c(M,[["render",N],["__scopeId","data-v-b67e728a"]]);const O={props:{type:{type:String,required:!0},label:{type:String,required:!0},name:String}},V=["type","name"];function D(e,a,t,r,d,l){return o(),i("div",null,[n("label",null,h(t.label),1),n("input",{type:t.type,name:t.name},null,8,V)])}var u=c(O,[["render",D],["__scopeId","data-v-0c4e9fb6"]]);const A=n("iframe",{id:"dummy-frame",frameborder:"0"},null,-1),H=n("button",{class:"btn-focus",type:"submit"},"Los gehts!",-1),K={inject:["mq"],component:{Input:u},data(){return{modalTitle:"",modalContent:""}},methods:{submit(e){e.preventDefault();const a=new FormData(e.target);f("/Subscribe",{method:"POST",body:a}).then(t=>t.json()).then(t=>{t.isSuccess?(this.modalTitle="Erfolg",e.target.reset()):this.modalTitle="Fehlschlag",this.modalContent=t.message,this.showModal=!0})}}},P=Object.assign(K,{name:"Form",setup(e){const a=w(!1);return(t,r)=>(o(),i("div",{class:m(["form-container",t.mq.current])},[A,n("form",{id:"subscribe-form",onSubmit:r[0]||(r[0]=(...d)=>t.submit&&t.submit(...d)),target:"dummy-frame"},[s(u,{type:"text",label:"Anrede/Name",name:"name"}),s(u,{type:"text",label:"Email",name:"mail"}),s(u,{type:"number",label:"Klassenstufe",name:"grade"}),H],32),s(I,{isOpen:a.value,onClose:r[1]||(r[1]=d=>a.value=!a.value),title:t.modalTitle,content:t.modalContent,buttons:[]},null,8,["isOpen","title","content"])],2))}}),U={components:{Header:v,Main:$}},L=Object.assign(U,{name:"Index",setup(e){return(a,t)=>(o(),i(S,null,[s(v),s($),s(P)],64))}});export{L as default};
