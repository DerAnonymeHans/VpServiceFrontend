import{_ as m,o as d,c as i,b as n,t as p,n as c,p as u,e as f,s as v,f as l,d as o,l as _,m as h,F as w}from"./index.17c2ebc0.js";import{I as s}from"./Input.d7105b38.js";const g=e=>(u("data-v-4a6ff4da"),e=e(),f(),e),y={class:"heading"},k={class:"user-count"},x=g(()=>n("span",{class:"user"}," Nutzer",-1)),$=g(()=>n("h4",{class:"heading-explanation"},"vertrauen auf vp.mailservice.kepler@gmail.com",-1)),C={inject:["mq"],props:{userCount:String}},S=Object.assign(C,{name:"Header",setup(e){return(a,t)=>(d(),i("header",{class:c(["head",a.mq.current])},[n("h1",y,[n("span",k,p(e.userCount),1),x]),$],2))}});var I=m(S,[["__scopeId","data-v-4a6ff4da"]]),j="/assets/mail-example-hand.851ced2c.png";const b=e=>(u("data-v-ad9c978c"),e=e(),f(),e),z={class:"text-container"},T=b(()=>n("article",null,[l(" Bist du nicht auch genervt jedesmal nach einem neuen Vertretungsplan zu schauen? Und dann musst du dich auch nochmal neu anmelden und suchst ewig nach den Zeilen die dich \xFCberhaupt betreffen... Doch dagegen gibt es ein Mittel! Indem du den VpMailservice abonnierst erh\xE4lst du mit maximal 10 min\xFCtiger Verz\xF6gerung Informationen \xFCber einen neuen Plan (nur wenn sich tats\xE4chlich etwas f\xFCr dich \xE4ndert!!), wenn vorhanden erh\xE4lst du sogar noch den vom Tag danach - und zwar auch nur die Daten die du auch brauchst."),n("br"),l(" Um das ganze noch weiter aufzuwerten, erh\xE4lst du im oberen Bild in der Email Informationen \xFCber das Wetter oder siehst andere eventabh\xE4ngige Kunstwerke. Nicht zu vergessen ist au\xDFerdem das 'Kleine aber feine Extra' mit lustigen Spr\xFCchen, interessanten Fakten oder weisen Zitaten. ")],-1)),U=b(()=>n("abbr",{title:"Quelle: https://pngimg.com/image/49158 (Bild bearbeitet - Email Screenshot eingef\xFCgt)"},[n("img",{src:j,alt:"Email"})],-1)),F={inject:["mq"],async mounted(){const e=new URLSearchParams(window.location.search);e.get("scroll")==="true"&&(await v(500),this.scrollToForm(),e.delete("scroll"),window.history.pushState("","",window.location.origin+window.location.pathname+e.toString()))},methods:{scrollToForm(){window.scrollBy({top:1e5,left:0,behavior:"smooth"})}}},M=Object.assign(F,{name:"Main",setup(e){return(a,t)=>(d(),i("main",{class:c(a.mq.current)},[n("div",z,[n("button",{class:"btn-focus",onClick:t[0]||(t[0]=r=>a.scrollToForm())},"Zum Abonnement"),T]),U],2))}});var B=m(M,[["__scopeId","data-v-ad9c978c"]]);const E=n("iframe",{id:"dummy-frame",frameborder:"0"},null,-1),N=n("div",{class:"agb"},[n("input",{type:"checkbox",id:"accept-agb",name:"accept-agb"}),n("label",{for:"accept-agb"},"Ich akzeptiere die AGB")],-1),O=n("button",{class:"btn-focus",type:"submit"},"Los gehts!",-1),q={inject:["mq"],component:{Input:s},data(){return{modalTitle:"",modalContent:"",showModal:!1}},methods:{submit(e){e.preventDefault();const a=new FormData(e.target);h("/Subscribe",{method:"POST",body:a}).then(t=>t.json()).then(t=>{t.isSuccess?(this.modalTitle="Erfolg",e.target.reset(),this.$emit("newUser")):this.modalTitle="Fehlschlag",this.modalContent=t.message,this.showModal=!0})}}},V=Object.assign(q,{name:"Form",setup(e){return(a,t)=>(d(),i("div",{class:c(["form-container",a.mq.current])},[E,n("form",{id:"subscribe-form",onSubmit:t[0]||(t[0]=(...r)=>a.submit&&a.submit(...r)),target:"dummy-frame"},[o(s,{type:"text",label:"Anrede/Name",name:"name"}),o(s,{type:"text",label:"Email",name:"mail"}),o(s,{type:"number",label:"Klassenstufe",name:"grade"}),N,O],32),o(_,{isOpen:a.showModal,onClose:t[1]||(t[1]=r=>a.showModal=!a.showModal),title:a.modalTitle,content:a.modalContent,buttons:[]},null,8,["isOpen","title","content"])],2))}}),A={inject:["fetchAPI"],data(){return{userCount:"#"}},async mounted(){this.getUserCount()},methods:{getUserCount(){h("/GetUserCount").then(e=>e.json()).then(e=>{e.isSuccess&&(this.userCount=e.body)})},newUser(){window.scrollBy({top:-99999,left:0,behavior:"smooth"}),setTimeout(this.getUserCount,1e3)}}},H=Object.assign(A,{name:"Index",setup(e){return(a,t)=>(d(),i(w,null,[o(I,{userCount:a.userCount},null,8,["userCount"]),o(B),o(V,{onNewUser:t[0]||(t[0]=r=>a.newUser())})],64))}});export{H as default};
