var j=Object.defineProperty;var R=Object.getOwnPropertySymbols;var A=Object.prototype.hasOwnProperty,z=Object.prototype.propertyIsEnumerable;var N=(a,e,t)=>e in a?j(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t,D=(a,e)=>{for(var t in e||(e={}))A.call(e,t)&&N(a,t,e[t]);if(R)for(var t of R(e))z.call(e,t)&&N(a,t,e[t]);return a};import{_ as M,o as i,c as d,b as o,t as c,n as k,p as $,e as x,s as p,f as v,d as h,a as u,w as P,j as b,l as T,m as g,B as I,F as y,i as m,g as S,h as L,r as U}from"./index.d6061b5b.js";import{I as w}from"./Input.c0e4f574.js";import{S as E,a as C,K as f}from"./KeyLabelPair.27896a4c.js";const q=a=>($("data-v-56ac921f"),a=a(),x(),a),F={class:"heading"},K={class:"user-count"},W=q(()=>o("span",{class:"user"}," Nutzer",-1)),G=q(()=>o("h4",{class:"heading-explanation"},"vertrauen auf vp.mailservice.kepler@gmail.com",-1)),V={inject:["mq"],props:{userCount:String}},J=Object.assign(V,{__name:"Header",setup(a){return(e,t)=>(i(),d("header",{class:k(["head",e.mq.current])},[o("h1",F,[o("span",K,c(a.userCount),1),W]),G],2))}});var Q=M(J,[["__scopeId","data-v-56ac921f"]]),Z="/assets/mail-example-hand.88eedc76.png";const H=a=>($("data-v-184053a3"),a=a(),x(),a),X={class:"text-container"},Y=H(()=>o("article",null,[v(" Bist du nicht auch genervt jedesmal nach einem neuen Vertretungsplan zu schauen? Und dann musst du dich auch nochmal neu anmelden und suchst ewig nach den Zeilen die dich \xFCberhaupt betreffen... Doch dagegen gibt es ein Mittel! Indem du den Kepleraner VP Service abonnierst erh\xE4lst du mit maximal 10 min\xFCtiger Verz\xF6gerung Informationen \xFCber einen neuen Plan (nur wenn sich tats\xE4chlich etwas f\xFCr dich \xE4ndert!!), wenn vorhanden erh\xE4lst du sogar noch den vom Tag danach - und zwar auch nur die Daten die du auch brauchst."),o("br"),v(" Um das Ganze noch weiter aufzuwerten, erh\xE4lst du im oberen Bild in der Email Informationen \xFCber das Wetter oder siehst andere eventabh\xE4ngige Kunstwerke. Nicht zu vergessen ist au\xDFerdem das 'Kleine aber feine Extra' mit lustigen Spr\xFCchen, interessanten Fakten oder weisen Zitaten."),o("br"),v(" Du hast dabei die Wahl zwischen Emails, wie auf dem Bild zu sehen, oder Push Benachrichtigungen (nur f\xFCr Android) die dich auf eine Webseite \xE4hnlich des Email Bildes f\xFChren. ")],-1)),ee=H(()=>o("abbr",{title:"Quelle: https://pngimg.com/image/49158 (Bild bearbeitet - Email Screenshot eingef\xFCgt)"},[o("img",{src:Z,alt:"Email"})],-1)),te={inject:["mq"],async mounted(){const a=new URLSearchParams(window.location.search);a.get("scroll")==="true"&&(await p(500),this.scrollToForm(),a.delete("scroll"),window.history.pushState("","",window.location.origin+window.location.pathname+a.toString()))},methods:{scrollToForm(){window.scrollBy({top:1e6,left:0,behavior:"smooth"})}}},ae=Object.assign(te,{__name:"Main",setup(a){return(e,t)=>(i(),d("main",{class:k(e.mq.current)},[o("div",X,[o("div",null,[o("button",{class:"btn-focus",onClick:t[0]||(t[0]=n=>e.scrollToForm())},"Zum Abonnement"),o("button",{class:"btn",type:"button",onClick:t[1]||(t[1]=n=>e.$emit("requestHashReset"))},"Ich bin bereits angemeldet")]),Y]),ee],2))}});var oe=M(ae,[["__scopeId","data-v-184053a3"]]);const ne=o("iframe",{id:"dummy-frame",frameborder:"0"},null,-1),se={key:0,class:"center"},ie=o("div",{class:"agb"},[o("input",{type:"checkbox",id:"accept-agb",name:"accept-agb"}),o("label",{for:"accept-agb"},"Ich akzeptiere die AGB")],-1),re=o("button",{class:"btn-focus",type:"submit"},"Los gehts!",-1),le={inject:["mq","os"],component:{Input:w},data(){return{modalTitle:"",modalContent:"",modalButtons:[],showModal:!1,modalMode:"",notifyMode:"mail",anrede:"",switchModel:new C([new f("pwa","Push Nachricht"),new f("mail","Per Mail")],"mail")}},mounted(){},methods:{submit(a){a.preventDefault();const e=new FormData(a.target);e.append("notify-mode",this.notifyMode),g("/Subscribe",{method:"POST",body:e}).then(t=>t.json()).then(t=>{t.isSuccess?(this.modalTitle="Erfolg",a.target.reset(),this.$emit("newUser")):this.modalTitle="Fehlschlag",this.modalContent=t.message+(this.notifyMode==="pwa"?" Wenn die Anfrage akzeptiert wird, wirst du eine Email erhalten.":" Sobald die Anfrage akzeptiert wird, erh\xE4lst auch du die Emails."),this.modalButtons=[],this.showModal=!0})},changeAnrede(a){this.anrede=a.target.value},switchNotifyMode(a){this.notifyMode=a},enterKeyModal(){this.modalTitle="Code eingeben",this.modalContent=`Wenn du eine Anmeldungsemail mit einem Code erhalten hast, bist du hier richtig. Gib diesen Code einfach hier ein und du bist angemeldet.<br><br>
         `,this.modalButtons=[new I("Anmelden","btn",()=>{(async()=>(await p(300),this.keyEntered()))()})],this.modalMode="enterKey",this.showModal=!0},async keyEntered(){const a=document.getElementById("hashreset-key-input").value;this.$emit("keyEntered",a)}}},de=Object.assign(le,{__name:"Form",setup(a){return(e,t)=>(i(),d("div",{class:k(["form-container",e.mq.current])},[ne,o("form",{id:"subscribe-form",onSubmit:t[2]||(t[2]=(...n)=>e.submit&&e.submit(...n)),target:"dummy-frame"},[h(w,{type:"text",label:`Anrede -> Hallo ${e.anrede}!`,defaultValue:e.anrede,name:"name",onInput:t[0]||(t[0]=n=>e.anrede=n.target.value)},null,8,["label","defaultValue"]),h(w,{type:"text",label:"Email",name:"mail"}),h(w,{type:"number",label:"Klassenstufe",name:"grade",min:5,max:12}),e.os!="mac"?(i(),d("div",se,[h(E,{options:e.switchModel.options,default:e.switchModel.value,onSwitch:e.switchNotifyMode},null,8,["options","default","onSwitch"])])):u("",!0),ie,re,o("button",{class:"btn-border-invert",type:"button",onClick:t[1]||(t[1]=n=>e.$emit("requestHashReset")),style:{width:"fit-content"}}," Ich bin bereits angemeldet ")],32),h(T,{isOpen:e.showModal,onClose:t[3]||(t[3]=n=>e.showModal=!e.showModal),title:e.modalTitle,content:e.modalContent,buttons:e.modalButtons},{default:P(()=>[e.modalMode==="hashReset"?(i(),b(w,{key:0,isInvert:!0,label:"Email Addresse",id:"hashreset-mail-input"})):u("",!0)]),_:1},8,["isOpen","title","content","buttons"])],2))}}),ce={inject:["fetchAPI"],data(){return{userCount:"#"}},async mounted(){this.getUserCount()},methods:{getUserCount(){g("/GetUserCount").then(a=>a.json()).then(a=>{a.isSuccess&&(this.userCount=a.body)})},newUser(){window.scrollBy({top:-99999,left:0,behavior:"smooth"}),setTimeout(this.getUserCount,1e3)}}},he=Object.assign(ce,{__name:"Index",setup(a){return(e,t)=>(i(),d(y,null,[h(Q,{userCount:e.userCount},null,8,["userCount"]),h(oe,{onRequestHashReset:t[0]||(t[0]=n=>e.$emit("requestHashReset"))}),h(de,{onNewUser:t[1]||(t[1]=n=>e.newUser()),onRequestHashReset:t[2]||(t[2]=n=>e.$emit("requestHashReset"))})],64))}});class O{constructor(e,t,n,s,l,r,_){this.affectedDate=e,this.affectedWeekday=t,this.originDate=n,this.originTime=s,this.announcements=l,this.missingTeachers=r,this.rows=_}}const ue={props:{color:{type:String,required:!0},plan:{required:!0,type:O}}},B=a=>($("data-v-0e1c462a"),a=a(),x(),a),me={key:0,class:"announcements border-box"},ge=B(()=>o("br",null,null,-1)),fe={class:"missing-teachers border-box"},pe={key:1},be=B(()=>o("tr",null,[o("th",null,"Klasse"),o("th",null,"Stunde"),o("th",null,"Fach"),o("th",null,"Lehrer"),o("th",null,"Raum"),o("th",null,"Info")],-1)),we={key:2,class:"center"};function ve(a,e,t,n,s,l){return i(),d("div",{class:"box plan-box",style:m({borderTopColor:t.color})},[o("h4",{class:"weekday",style:m({textDecorationColor:t.color})},c(t.plan.affectedWeekday),5),t.plan.announcements.length>0?(i(),d("div",me,[(i(!0),d(y,null,S(t.plan.announcements,r=>(i(),d("span",{key:r},[v(c(r),1),ge]))),128))])):u("",!0),o("div",fe,"Es fehlen: "+c(t.plan.missingTeachers.join(",")),1),t.plan.rows.length>0?(i(),d("table",pe,[be,(i(!0),d(y,null,S(t.plan.rows,r=>(i(),d("tr",{key:r,style:m({color:r.hasChange?t.color:""})},[o("td",null,c(r.row.klasse),1),o("td",null,c(r.row.stunde),1),o("td",null,c(r.row.fach),1),o("td",null,c(r.row.lehrer),1),o("td",null,c(r.row.raum),1),o("td",null,c(r.row.info),1)],4))),128))])):(i(),d("p",we,"Keine \xC4nderungen..."))],4)}var ye=M(ue,[["render",ve],["__scopeId","data-v-0e1c462a"]]);const _e={props:{color:{type:String,required:!0},text:{type:String,required:!0},author:String}},ke=a=>($("data-v-05603039"),a=a(),x(),a),Me=ke(()=>o("h4",null,[o("b",null,"Kleines, aber feines Extra")],-1)),Se=["innerHTML"],Ce={key:0};function $e(a,e,t,n,s,l){var r;return i(),d(y,null,[Me,o("blockquote",{style:m({borderColor:t.color}),innerHTML:t.text},null,12,Se),((r=t.author)==null?void 0:r.length)>0?(i(),d("p",Ce,"~"+c(t.author),1)):u("",!0)],64)}var xe=M(_e,[["render",$e],["__scopeId","data-v-05603039"]]);const Ie={class:"data-space"},Pe=["src","alt"],Te={class:"box text-center"},Ee=v(),Re=o("br",null,null,-1),Ne={class:"plan-box"},De=o("button",{class:"btn"},[o("a",{href:"https://jkg-leipzig.de/vertretungsplan/"},"Schulseite")],-1),qe={class:"btn"},He=v("Kleines Extra beitragen"),Oe={class:"box small-extra"},Be={key:0,class:"account-logo-container"},je={class:"box"},Ae=o("div",{id:"webpushr-subscription-button","data-show-subscriber-count":"false","data-button-text":"Benachrichtigung erlauben","data-subscriber-count-text":"","data-background-color":"#ff8ded"},null,-1),ze={class:"switches"},Le={class:"box qrcode-container"},Ue=o("summary",null,"QR Code",-1),Fe=["src"],Ke={inject:["mq"],props:{isHashResetResponseModalOpen:Boolean},data(){return{imgSrc:"",qrCodeSrc:"https://localhost:5001/Notification/QrCode",globalExtra:"",grade:"",title:"",affectedDate:"",originDate:"",originTime:"",plans:[],extraText:"",extraAuthor:"",userName:"",color:"",tempMax:"",tempMin:"",modalTitle:"",modalContent:"",showModal:!1,_switches:{color:new C([new f("darkmode","Dunkelmodus"),new f("lightmode","Hellmodus")],localStorage.getItem("color-scheme")),notifyMode:new C([new f("pwa","Push Nachricht"),new f("mail","Per Mail")],"pwa")},isNotifyModeUpdated:!1,colorScheme:"darkmode"}},beforeMount(){localStorage.setItem("device-was-logged-in","true"),this.fetchData()},mounted(){this.loadColorScheme(localStorage.getItem("color-scheme")),this.loadNotifyMode()},methods:{async fetchData(){var r;this.loadCachedData();const a=!await this.isPlanNew(),e=await Promise.allSettled([this.fetchModel("Global",a),this.fetchModel("Grade",a),this.fetchModel("User",a)]),t=e[0].value,n=e[1].value,s=e[2].value;this.userName=s.userName||"Kepleraner",this.artworkName=((r=t.artwork)==null?void 0:r.name)||"",this.imgSrc=`https://localhost:5001/Notification/Artwork/${this.artworkName}/${this.userName}`,this.globalExtra=t.globalExtra||"Moin",this.tempMax=t.weather.tempMax,this.tempMin=t.weather.tempMin,this.plans=this.makePlans(t,n),this.originDate=this.plans[0].originDate,this.originTime=this.plans[0].originTime,this.affectedDate=this.plans[0].affectedDate,this.grade=n.grade,this.globalExtra=n.gradeExtra!==null?n.gradeExtra:this.globalExtra,this.extraText=s.smallExtra.text,this.extraAuthor=s.smallExtra.author,this.color=t.artwork.color,this.title=t.subject;const l=this.handleLastPlan(t,n);l!==null&&this.plans.push(l),this.ensurePlanColorContrast(),localStorage.setItem("greeting",this.userName),localStorage.setItem("last-origin-datetime",`${this.originDate}, ${this.originTime}`),localStorage.setItem("last-affected-date",this.affectedDate)},async loadCachedData(){var s;const a=await Promise.allSettled([this.fetchModel("Global",!0),this.fetchModel("Grade",!0),this.fetchModel("User",!0)]),e=a[0].value,t=a[1].value,n=a[2].value;this.title="Lade...",e!==null&&(this.globalExtra=e.globalExtra||"Moin",this.affectedDate=e.affectedDate||"",this.originDate=e.originDate||"",this.originTime=e.originTime||"",this.tempMax=e.weather.tempMax,this.tempMin=e.weather.tempMin,this.missingTeachers=((s=e.missingTeachers)==null?void 0:s.map(l=>l.trim()))||[],this.information=e.information||[],this.color=e.artwork.color),t!==null&&(this.grade=t.grade,this.globalExtra=t.gradeExtra!==null?t.gradeExtra:this.globalExtra),e!==null&&t!==null&&(this.plans=this.makePlans(e,t)),n!==null&&(this.userName=n.userName||"Kepleraner",this.extraText=n.smallExtra.text,this.extraAuthor=n.smallExtra.author)},makePlans(a,e){const t=[];for(let n=0;n<a.globalPlans.length;n++){const s=a.globalPlans[n],l=e.listOfTables[n];t.push(new O(s.affectedDate,s.affectedWeekday,s.originDate,s.originTime,s.announcements,s.missingTeachers,l))}return t},fetchModel(a,e){return new Promise(async(t,n)=>{if(e){const s=localStorage.getItem(`${a}-model`);if(s.length>0)return t(JSON.parse(s))}try{let s=await g(`/Notification/${a}Model`).then(l=>l.json());if(s.isSuccess)return localStorage.setItem(`${a}-model`,JSON.stringify(s.body)),t(s.body);this.modalTitle="Fehlschlag",this.modalContent=s.message}catch{this.modalTitle="Fehlschlag",this.modalContent="Leider ist etwas schief gelaufen"}return this.showModal=!0,n()})},handleLastPlan(a,e){let t=localStorage.getItem("last-plan-model");return t!==null&&(t=JSON.parse(t)),new Date().getDate()===parseInt(t==null?void 0:t.affectedDate.slice(0,2))?(t.affectedWeekday+=" (heute)",t):(this.setLastPlan(a,e),null)},setLastPlan(a,e){a.globalPlans=[a.globalPlans[0]],e.listOfTables=[e.listOfTables[0]];const t=this.makePlans(a,e)[0];localStorage.setItem("last-plan-model",JSON.stringify(t))},ensurePlanColorContrast(){const a=this.colorScheme==="lightmode"?500:350,e=_=>parseInt(_,16),t=_=>Math.round(_).toString(16);let n=e(this.color.slice(1,3)),s=e(this.color.slice(3,5)),l=e(this.color.slice(5,7));const r=a/(n+s+l);this.colorScheme==="darkmode"&&r<1||this.colorScheme==="lightmode"&&r>1||(n*=r,s*=r,l*=r,this.color=`#${t(n)}${t(s)}${t(l)}`)},isPlanNew(){return new Promise(async(a,e)=>{try{const t=localStorage.getItem("last-origin-datetime"),n=localStorage.getItem("last-affected-date");let s=await g(`/Notification/IsNewPlan/${encodeURIComponent(`${t}-${n}`)}`).then(l=>l.json());if(s.isSuccess)return a(s.body)}catch{}return a(!0)})},reload(){localStorage.setItem("last-origin-datetime","reload"),this.fetchData()},async loadNotifyMode(a=null){try{if(a===null){let t=await g("/User/GetNotifyMode").then(n=>n.json());t.isSuccess&&(a=t.body.toLowerCase()==="pwa"?"pwa":"mail")}}catch{}const e=D({},this._switches.notifyMode);e.value=a,delete this._switches.notifyMode,await p(0),this._switches=Object.assign(this._switches,{notifyMode:e}),await p(0),this.isNotifyModeUpdated=!0},switchMode(a,e){switch(a){case"color":this.colorScheme=e,this.loadColorScheme(e);break;case"notifyMode":this.isNotifyModeUpdated&&this.changeNotifyMode(e);break}},loadColorScheme(a){localStorage.setItem("color-scheme",a);const n=a==="lightmode"?{bg:"#fff","bg-medium":"#eee","col-light":"#ddd","col-dark":"#ccc",font:"#000"}:{bg:"#111","bg-medium":"#222","col-dark":"#333","col-light":"#444",font:"#ccc"};for(const s in n)this.$refs.page.style.setProperty(`--${s}`,n[s]);this.ensurePlanColorContrast()},async changeNotifyMode(a){if(a==="pwa"){window.dispatchEvent(new Event("allowpush"));let e=0;for(;e++,Notification.permission!=="granted";){if(Notification.permission==="denied"){alert("Wenn du die Benachrichtigung nicht akzeptiers, kannst du keine Push Nachrichten erhalten. "),this.loadNotifyMode("mail");return}e===30&&(window.dispatchEvent(new Event("allowpush")),e=0),await p(500)}}try{let e=await g(`/User/ChangeNotifyMode/${a}`,{method:"POST"}).then(t=>t.json());if(this.modalContent=e.message,e.isSuccess){this.modalTitle="Erfolg",this.showModal=!0;return}}catch{this.modalContent="Leider ist etwas schief gelaufen."}this.modalTitle="Fehlschlag",this.showModal=!0}}},We=Object.assign(Ke,{__name:"Index",setup(a){return(e,t)=>{const n=U("RouterLink");return i(),d("div",{class:k([e.mq.current,"notif-page"]),ref:"page"},[o("div",Ie,[o("img",{src:e.imgSrc,class:"artwork",alt:e.imgSrc},null,8,Pe),e.tempMax!==null?(i(),d("div",{key:0,class:"text-center",style:m({color:e.color})},c(e.tempMin)+"/"+c(e.tempMax)+"\xB0C",5)):u("",!0),o("h2",{class:"global-extra",style:m({color:e.color})},c(e.globalExtra),5),o("div",Te,[o("b",null,c(e.title),1),Ee,Re,o("i",null,"(vom "+c(e.originDate)+" um "+c(e.originTime)+" Uhr.)",1)]),o("div",Ne,[(i(!0),d(y,null,S(e.plans,s=>(i(),d("div",{key:s},[h(ye,{color:e.color,plan:s},null,8,["color","plan"])]))),128))]),o("div",{class:"box link-container",style:m({color:e.color})},[De,o("button",qe,[h(n,{to:"/Mitmachen"},{default:P(()=>[He]),_:1})])],4),o("div",Oe,[h(xe,{color:e.color,text:e.extraText,author:e.extraAuthor},null,8,["color","text","author"])])]),e.mq.tabletMinus?(i(),d("hr",{key:0,style:m({borderColor:e.color})},null,4)):u("",!0),o("div",{class:k(["user-space",a.isHashResetResponseModalOpen&&e.mq.current==="mobile"?"add-scroll-padding":""])},[e.mq.desktopPlus?(i(),d("div",Be,[o("div",{class:"account-logo",style:m({color:e.color})},[h(L,{name:"account"})],4)])):u("",!0),o("div",je,[Ae,o("div",ze,[(i(!0),d(y,null,S(e._switches,(s,l)=>(i(),b(E,{key:l,invert:!0,options:s.options,default:s.value,value:s.value,onSwitch:r=>e.switchMode(l,r)},null,8,["options","default","value","onSwitch"]))),128))]),o("button",{class:"btn",onClick:t[0]||(t[0]=()=>e.reload())},"Neuladen")])],2),o("details",Le,[Ue,o("img",{src:e.qrCodeSrc,alt:"QR Code",loading:"lazy"},null,8,Fe)]),h(T,{isOpen:e.showModal,onClose:t[1]||(t[1]=s=>e.showModal=!e.showModal),title:e.modalTitle,content:e.modalContent,buttons:[]},null,8,["isOpen","title","content"])],2)}}});const Ge={class:"content"},Ve={class:"center page-switch-container"},Je={key:0},Qe={data(){return{isLoggedIn:null,page:null,modalTitle:"",modalContent:"",showModal:!1,modalMode:"",modalButtons:[],switchModel:new C([new f("sub","Abo Seite"),new f("notif","Plan Seite")],"notif"),isHashResetResponseModalOpen:!1}},async mounted(){await this.handleHashReset(),await this.getPage(),this.open},methods:{async handleHashReset(){return new Promise(async(a,e)=>{const t=new URLSearchParams(window.location.search),n=t.get("code");return n===null||(t.delete("code"),window.history.pushState("","",window.location.origin+window.location.pathname+t.toString()),await this.resetHash(n)),a()})},async resetHash(a){return new Promise(async(e,t)=>{const n=new FormData;n.append("key",a),this.modalButtons=[],this.modalMode="hashResetResponse";let s;try{if(s=await g("/User/ResetHash",{method:"POST",body:n}).then(l=>l.json()),s.isSuccess)return this.isHashResetResponseModalOpen=!0,this.modalTitle="Anmeldung erfolgreich",this.modalContent=`<b>ACHTUNG:</b> Folge den Anweisungen um Push Nachrichten zu erhalten:<br>
                     (0. Im besten Fall nutzt du Chrome)<br>
                     1. Scrolle nach unten und w\xE4hle "Push Nachrichten" statt "Email" aus und erlaube die Benachrichtigungen.<br>
                     2. CHROME: Dr\xFCcke auf die 3 Punkte oben rechts und anschlie\xDFend auf "App installieren" (Keine Angst, das ist nur diese Webseite in App-Form - rund 0,5 MB)<br>
                     SONST: F\xFCge die Webseite zum Startbildschirm hinzu
                     `,this.showModal=!0,sessionStorage.setItem("notif-page","notif"),e();this.modalTitle="Anmeldung fehlgeschlagen",this.modalContent=s.message}catch{this.modalTitle="Anmeldung fehlgeschlagen",this.modalContent="Leider ist etwas schief gelaufen"}return this.showModal=!0,e()})},closeModal(){this.showModal=!1,this.modalMode==="hashResetResponse"&&(this.isHashResetResponseModalOpen=!1)},async getPage(){const a=sessionStorage.getItem("notif-page");try{if((await g("/User/IsAuthenticated").then(t=>t.json())).body===!0){this.isLoggedIn=!0,this.page=a==="notif"||a==="sub"?a:"notif";return}}catch{}this.isLoggedIn=!1,this.page="sub"},switchPage(a){sessionStorage.setItem("notif-page",a),this.page=a},requestHashResetModal(){this.modalTitle="Neu anmelden",this.modalContent=`Wenn du dich bereits einmal angemeldet hast und nun auf die Vertretungsplandaten zugreifen m\xF6chtest bist du hier richtig. Wenn du auf den Knopf dr\xFCckst, erh\xE4lst du eine Email, mit einem Link, der dich wieder anmeldet.<br><br>
         `,this.modalButtons=[new I("Email senden","btn",()=>{(async()=>(await p(300),this.requestHashReset()))()})],this.modalMode="hashReset",this.showModal=!0},async requestHashReset(){const a=document.getElementById("hashreset-mail-input").value;this.modalMode="none",await p(0),this.modalButtons=[];let e,t=new FormData;t.append("mail",a);try{if(e=await g("/User/RequestHashReset",{method:"POST",body:t}).then(n=>n.json()),this.modalContent=e.message,e.isSuccess){this.modalTitle="Erfolg",this.showModal=!0;return}}catch{this.modalContent="Leider ist etwas schief gelaufen."}this.modalButtons=[new I("Erneut versuchen","btn",()=>{(async()=>(await p(300),this.requestHashResetModal()))()})],this.modalTitle="Fehlschlag",this.showModal=!0}}},Ze=Object.assign(Qe,{__name:"Index",setup(a){return(e,t)=>(i(),d("div",Ge,[o("div",Ve,[e.isLoggedIn?(i(),b(E,{key:0,options:e.switchModel.options,default:e.page,value:e.page,onSwitch:e.switchPage},null,8,["options","default","value","onSwitch"])):u("",!0)]),e.page===null?(i(),d("div",Je)):e.page==="notif"?(i(),b(We,{key:1,isHashResetResponseModalOpen:e.isHashResetResponseModalOpen},null,8,["isHashResetResponseModalOpen"])):e.page==="sub"?(i(),b(he,{key:2,onRequestHashReset:t[0]||(t[0]=n=>e.requestHashResetModal())})):u("",!0),h(T,{isOpen:e.showModal,onClose:t[1]||(t[1]=()=>e.closeModal()),title:e.modalTitle,content:e.modalContent,buttons:e.modalButtons},{default:P(()=>[e.modalMode==="hashReset"?(i(),b(w,{key:0,isInvert:!0,label:"Email Addresse",id:"hashreset-mail-input"})):u("",!0)]),_:1},8,["isOpen","title","content","buttons"])]))}});var at=M(Ze,[["__scopeId","data-v-45c6a2c8"]]);export{at as default};
