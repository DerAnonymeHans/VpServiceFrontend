var U=Object.defineProperty;var D=Object.getOwnPropertySymbols;var z=Object.prototype.hasOwnProperty,H=Object.prototype.propertyIsEnumerable;var q=(a,e,t)=>e in a?U(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t,j=(a,e)=>{for(var t in e||(e={}))z.call(e,t)&&q(a,t,e[t]);if(D)for(var t of D(e))H.call(e,t)&&q(a,t,e[t]);return a};import{_ as S,o as i,c as l,b as o,t as c,n as $,p as x,e as I,s as p,f as b,d as h,a as m,w as E,j as y,l as P,m as u,B as T,F as w,i as g,g as M,r as O,h as F}from"./index.3af21354.js";import{I as _}from"./Input.bdca88e9.js";import{S as N,a as C,K as f}from"./KeyLabelPair.ad8cc5dc.js";const R=a=>(x("data-v-56ac921f"),a=a(),I(),a),K={class:"heading"},W={class:"user-count"},G=R(()=>o("span",{class:"user"}," Nutzer",-1)),V=R(()=>o("h4",{class:"heading-explanation"},"vertrauen auf vp.mailservice.kepler@gmail.com",-1)),J={inject:["mq"],props:{userCount:String}},Q=Object.assign(J,{__name:"Header",setup(a){return(e,t)=>(i(),l("header",{class:$(["head",e.mq.current])},[o("h1",K,[o("span",W,c(a.userCount),1),G]),V],2))}});var Z=S(Q,[["__scopeId","data-v-56ac921f"]]),X="/assets/mail-example-hand.88eedc76.png";const B=a=>(x("data-v-184053a3"),a=a(),I(),a),Y={class:"text-container"},ee=B(()=>o("article",null,[b(" Bist du nicht auch genervt jedesmal nach einem neuen Vertretungsplan zu schauen? Und dann musst du dich auch nochmal neu anmelden und suchst ewig nach den Zeilen die dich \xFCberhaupt betreffen... Doch dagegen gibt es ein Mittel! Indem du den Kepleraner VP Service abonnierst erh\xE4lst du mit maximal 10 min\xFCtiger Verz\xF6gerung Informationen \xFCber einen neuen Plan (nur wenn sich tats\xE4chlich etwas f\xFCr dich \xE4ndert!!), wenn vorhanden erh\xE4lst du sogar noch den vom Tag danach - und zwar auch nur die Daten die du auch brauchst."),o("br"),b(" Um das Ganze noch weiter aufzuwerten, erh\xE4lst du im oberen Bild in der Email Informationen \xFCber das Wetter oder siehst andere eventabh\xE4ngige Kunstwerke. Nicht zu vergessen ist au\xDFerdem das 'Kleine aber feine Extra' mit lustigen Spr\xFCchen, interessanten Fakten oder weisen Zitaten."),o("br"),b(" Du hast dabei die Wahl zwischen Emails, wie auf dem Bild zu sehen, oder Push Benachrichtigungen (nur f\xFCr Android) die dich auf eine Webseite \xE4hnlich des Email Bildes f\xFChren. ")],-1)),te=B(()=>o("abbr",{title:"Quelle: https://pngimg.com/image/49158 (Bild bearbeitet - Email Screenshot eingef\xFCgt)"},[o("img",{src:X,alt:"Email"})],-1)),ae={inject:["mq"],async mounted(){const a=new URLSearchParams(window.location.search);a.get("scroll")==="true"&&(await p(500),this.scrollToForm(),a.delete("scroll"),window.history.pushState("","",window.location.origin+window.location.pathname+a.toString()))},methods:{scrollToForm(){window.scrollBy({top:1e6,left:0,behavior:"smooth"})}}},oe=Object.assign(ae,{__name:"Main",setup(a){return(e,t)=>(i(),l("main",{class:$(e.mq.current)},[o("div",Y,[o("div",null,[o("button",{class:"btn-focus",onClick:t[0]||(t[0]=n=>e.scrollToForm())},"Zum Abonnement"),o("button",{class:"btn",type:"button",onClick:t[1]||(t[1]=n=>e.$emit("requestHashReset"))},"Ich bin bereits angemeldet")]),ee]),te],2))}});var ne=S(oe,[["__scopeId","data-v-184053a3"]]);const se=o("iframe",{id:"dummy-frame",frameborder:"0"},null,-1),ie={key:0,class:"center"},re=o("div",{class:"agb"},[o("input",{type:"checkbox",id:"accept-agb",name:"accept-agb"}),o("label",{for:"accept-agb"},"Ich akzeptiere die AGB")],-1),le=o("button",{class:"btn-focus",type:"submit"},"Los gehts!",-1),de={inject:["mq","os"],component:{Input:_},data(){return{modalTitle:"",modalContent:"",modalButtons:[],showModal:!1,modalMode:"",notifyMode:"mail",anrede:"",switchModel:new C([new f("pwa","Push Nachricht"),new f("mail","Per Mail")],"mail")}},mounted(){},methods:{submit(a){a.preventDefault();const e=new FormData(a.target);e.append("notify-mode",this.notifyMode),u("/Subscribe",{method:"POST",body:e}).then(t=>t.json()).then(t=>{t.isSuccess?(this.modalTitle="Erfolg",a.target.reset(),this.$emit("newUser")):this.modalTitle="Fehlschlag",this.modalContent=t.message+(this.notifyMode==="pwa"?" Wenn die Anfrage akzeptiert wird, wirst du eine Email erhalten.":" Sobald die Anfrage akzeptiert wird, erh\xE4lst auch du die Emails."),this.modalButtons=[],this.showModal=!0})},changeAnrede(a){this.anrede=a.target.value},switchNotifyMode(a){this.notifyMode=a},enterKeyModal(){this.modalTitle="Code eingeben",this.modalContent=`Wenn du eine Anmeldungsemail mit einem Code erhalten hast, bist du hier richtig. Gib diesen Code einfach hier ein und du bist angemeldet.<br><br>
         `,this.modalButtons=[new T("Anmelden","btn",()=>{(async()=>(await p(300),this.keyEntered()))()})],this.modalMode="enterKey",this.showModal=!0},async keyEntered(){const a=document.getElementById("hashreset-key-input").value;this.$emit("keyEntered",a)}}},ce=Object.assign(de,{__name:"Form",setup(a){return(e,t)=>(i(),l("div",{class:$(["form-container",e.mq.current])},[se,o("form",{id:"subscribe-form",onSubmit:t[2]||(t[2]=(...n)=>e.submit&&e.submit(...n)),target:"dummy-frame"},[h(_,{type:"text",label:`Anrede -> Hallo ${e.anrede}!`,defaultValue:e.anrede,name:"name",onInput:t[0]||(t[0]=n=>e.anrede=n.target.value)},null,8,["label","defaultValue"]),h(_,{type:"text",label:"Email",name:"mail"}),h(_,{type:"number",label:"Klassenstufe",name:"grade",min:5,max:12}),e.os!="mac"?(i(),l("div",ie,[h(N,{options:e.switchModel.options,default:e.switchModel.value,onSwitch:e.switchNotifyMode},null,8,["options","default","onSwitch"])])):m("",!0),re,le,o("button",{class:"btn-border-invert",type:"button",onClick:t[1]||(t[1]=n=>e.$emit("requestHashReset")),style:{width:"fit-content"}}," Ich bin bereits angemeldet ")],32),h(P,{isOpen:e.showModal,onClose:t[3]||(t[3]=n=>e.showModal=!e.showModal),title:e.modalTitle,content:e.modalContent,buttons:e.modalButtons},{default:E(()=>[e.modalMode==="hashReset"?(i(),y(_,{key:0,isInvert:!0,label:"Email Addresse",id:"hashreset-mail-input"})):m("",!0)]),_:1},8,["isOpen","title","content","buttons"])],2))}}),he={inject:["fetchAPI"],data(){return{userCount:"#"}},async mounted(){this.getUserCount()},methods:{getUserCount(){u("/GetUserCount").then(a=>a.json()).then(a=>{a.isSuccess&&(this.userCount=a.body)})},newUser(){window.scrollBy({top:-99999,left:0,behavior:"smooth"}),setTimeout(this.getUserCount,1e3)}}},ue=Object.assign(he,{__name:"Index",setup(a){return(e,t)=>(i(),l(w,null,[h(Z,{userCount:e.userCount},null,8,["userCount"]),h(ne,{onRequestHashReset:t[0]||(t[0]=n=>e.$emit("requestHashReset"))}),h(ce,{onNewUser:t[1]||(t[1]=n=>e.newUser()),onRequestHashReset:t[2]||(t[2]=n=>e.$emit("requestHashReset"))})],64))}});class k{constructor(e,t,n=[]){this.weekday=e,this.rows=t,this.information=n}}const me={props:{color:{type:String,required:!0},table:{required:!0,type:k}}},A=a=>(x("data-v-7b051566"),a=a(),I(),a),ge=A(()=>o("br",null,null,-1)),fe={key:0},pe=A(()=>o("tr",null,[o("th",null,"Klasse"),o("th",null,"Stunde"),o("th",null,"Fach"),o("th",null,"Lehrer"),o("th",null,"Raum"),o("th",null,"Info")],-1)),be={key:1,class:"center"};function we(a,e,t,n,s,d){return i(),l("div",null,[o("h4",{class:"plan-weekday",style:g({textDecorationColor:t.color})},c(t.table.weekday),5),(i(!0),l(w,null,M(t.table.information,r=>(i(),l("span",{key:r},[b(c(r),1),ge]))),128)),t.table.rows.length>0?(i(),l("table",fe,[pe,(i(!0),l(w,null,M(t.table.rows,r=>(i(),l("tr",{key:r,style:g({color:r.hasChange?t.color:""})},[o("td",null,c(r.row.klasse),1),o("td",null,c(r.row.stunde),1),o("td",null,c(r.row.fach),1),o("td",null,c(r.row.lehrer),1),o("td",null,c(r.row.raum),1),o("td",null,c(r.row.info),1)],4))),128))])):(i(),l("p",be,"Keine \xC4nderungen..."))])}var ve=S(me,[["render",we],["__scopeId","data-v-7b051566"]]);const ye={props:{color:{type:String,required:!0},text:{type:String,required:!0},author:String}},_e=a=>(x("data-v-05603039"),a=a(),I(),a),ke=_e(()=>o("h4",null,[o("b",null,"Kleines, aber feines Extra")],-1)),Me=["innerHTML"],Se={key:0};function Ce(a,e,t,n,s,d){var r;return i(),l(w,null,[ke,o("blockquote",{style:g({borderColor:t.color}),innerHTML:t.text},null,12,Me),((r=t.author)==null?void 0:r.length)>0?(i(),l("p",Se,"~"+c(t.author),1)):m("",!0)],64)}var $e=S(ye,[["render",Ce],["__scopeId","data-v-05603039"]]);const xe={class:"data-space"},Ie=["src","alt"],Te={class:"box text-center"},Ee=b(),Pe=o("br",null,null,-1),Ne={key:1,class:"box"},De=o("br",null,null,-1),qe={class:"box"},je={class:"box plan-box"},Re=o("button",{class:"btn"},[o("a",{href:"https://jkg-leipzig.de/vertretungsplan/"},"Schulseite")],-1),Be={class:"btn"},Ae=b("Kleines Extra beitragen"),Le={class:"box small-extra"},Ue={class:"user-space"},ze={key:0,class:"account-logo-container"},He={class:"box"},Oe=o("div",{id:"webpushr-subscription-button","data-show-subscriber-count":"false","data-button-text":"Benachrichtigung erlauben","data-subscriber-count-text":"","data-background-color":"#ff8ded"},null,-1),Fe={class:"switches"},Ke={class:"box qrcode-container"},We=o("summary",null,"QR Code",-1),Ge=["src"],Ve={inject:["mq"],data(){return{imgSrc:"",qrCodeSrc:"https://vp-service-api.herokuapp.com/Notification/QrCode",globalExtra:"",grade:"",affectedDate:"",originDate:"",originTime:"",missingTeachers:[],information:[],tables:[],extraText:"",extraAuthor:"",userName:"",color:"",title:"",tempMax:"",tempMin:"",modalTitle:"",modalContent:"",showModal:!1,_switches:{color:new C([new f("darkmode","Dunkelmodus"),new f("lightmode","Hellmodus")],localStorage.getItem("color-scheme")),notifyMode:new C([new f("pwa","Push Nachricht"),new f("mail","Per Mail")],"pwa")},isNotifyModeUpdated:!1,colorScheme:"darkmode"}},beforeMount(){localStorage.setItem("device-was-logged-in","true"),this.fetchData()},mounted(){this.loadColorScheme(localStorage.getItem("color-scheme")),this.getNotifyMode(),webpushr("fetch_id",a=>{this.saveUserPushrId(a)})},methods:{async fetchData(){var r,v;this.loadCachedData();const a=!await this.isPlanNew(),e=await Promise.allSettled([this.fetchModel("Global",a),this.fetchModel("Grade",a),this.fetchModel("User",a)]),t=e[0].value,n=e[1].value,s=e[2].value;this.userName=s.userName||"Kepleraner",this.artworkName=((r=t.artwork)==null?void 0:r.name)||"",this.imgSrc=`https://vp-service-api.herokuapp.com/Notification/Artwork/${this.artworkName}/${this.userName}`,this.globalExtra=t.globalExtra||"Moin",this.affectedDate=t.affectedDate||"",this.originDate=t.originDate||"",this.originTime=t.originTime||"",this.tempMax=t.weather.tempMax,this.tempMin=t.weather.tempMin,this.tables=[new k(t.affectedWeekday,n.rows),new k(t.affectedWeekday2,n.rows2)],this.missingTeachers=((v=t.missingTeachers)==null?void 0:v.map(L=>L.trim()))||[],this.information=t.information||[],this.grade=n.grade,this.globalExtra=n.gradeExtra!==null?n.gradeExtra:this.globalExtra,this.extraText=s.smallExtra.text,this.extraAuthor=s.smallExtra.author,this.color=t.artwork.color,this.title=t.subject;const d=this.handleLastPlan(t,n);d!==null&&this.tables.push(d.table),this.ensurePlanColorContrast(),localStorage.setItem("greeting",this.userName),localStorage.setItem("last-origin-datetime",`${this.originDate}, ${this.originTime}`),localStorage.setItem("last-affected-date",this.affectedDate)},async loadCachedData(){var s;const a=await Promise.allSettled([this.fetchModel("Global",!0),this.fetchModel("Grade",!0),this.fetchModel("User",!0)]),e=a[0].value,t=a[1].value,n=a[2].value;this.title="Lade...",e!==null&&(this.globalExtra=e.globalExtra||"Moin",this.affectedDate=e.affectedDate||"",this.originDate=e.originDate||"",this.originTime=e.originTime||"",this.tempMax=e.weather.tempMax,this.tempMin=e.weather.tempMin,this.missingTeachers=((s=e.missingTeachers)==null?void 0:s.map(d=>d.trim()))||[],this.information=e.information||[],this.color=e.artwork.color),t!==null&&(this.grade=t.grade,this.globalExtra=t.gradeExtra!==null?t.gradeExtra:this.globalExtra),globalExtra!==null&&t!==null&&(this.tables=[new k(e.affectedWeekday,t.rows),new k(e.affectedWeekday2,t.rows2)]),n!==null&&(this.userName=n.userName||"Kepleraner",this.extraText=n.smallExtra.text,this.extraAuthor=n.smallExtra.author)},fetchModel(a,e){return new Promise(async(t,n)=>{if(e){const s=localStorage.getItem(`${a}-model`);if(s.length>0)return t(JSON.parse(s))}try{let s=await u(`/Notification/${a}Model`).then(d=>d.json());if(s.isSuccess)return localStorage.setItem(`${a}-model`,JSON.stringify(s.body)),t(s.body);this.modalTitle="Fehlschlag",this.modalContent=s.message}catch{this.modalTitle="Fehlschlag",this.modalContent="Leider ist etwas schief gelaufen"}return this.showModal=!0,n()})},handleLastPlan(a,e){let t=localStorage.getItem("last-plan-model");return t!==null&&(t=JSON.parse(t)),(t==null?void 0:t.affectedDate)===a.affectedDate?(this.setLastPlan(a,e),null):new Date().getDate()===parseInt(t.affectedDate.slice(0,2))?t:(this.setLastPlan(a,e),null)},setLastPlan(a,e){const t=new Je(a,e);localStorage.setItem("last-plan-model",JSON.stringify(t))},ensurePlanColorContrast(){const a=this.colorScheme==="lightmode"?550:300,e=v=>parseInt(v,16),t=v=>Math.round(v).toString(16);let n=e(this.color.slice(1,3)),s=e(this.color.slice(3,5)),d=e(this.color.slice(5,7));const r=a/(n+s+d);this.colorScheme==="darkmode"&&r<1||this.colorScheme==="lightmode"&&r>1||(console.log(r),n*=r,s*=r,d*=r,this.color=`#${t(n)}${t(s)}${t(d)}`)},async isPlanNew(){return new Promise(async(a,e)=>{try{const t=localStorage.getItem("last-origin-datetime"),n=localStorage.getItem("last-affected-date");let s=await u(`/Notification/IsNewPlan/${encodeURIComponent(`${t}-${n}`)}`).then(d=>d.json());if(s.isSuccess)return a(s.body)}catch{}return a(!0)})},reload(){localStorage.setItem("last-origin-datetime","reload"),this.fetchData()},async getNotifyMode(){try{let a=await u("/User/GetNotifyMode").then(e=>e.json());if(a.isSuccess){const e=a.body.toLowerCase()==="pwa"?"pwa":"mail",t=j({},this._switches.notifyMode);t.value=e,delete this._switches.notifyMode,await p(0),this._switches=Object.assign(this._switches,{notifyMode:t}),await p(0),this.isNotifyModeUpdated=!0;return}}catch{}},switchMode(a,e){switch(a){case"color":this.colorScheme=e,this.loadColorScheme(e);break;case"notifyMode":this.isNotifyModeUpdated&&this.changeNotifyMode(e);break}},loadColorScheme(a){localStorage.setItem("color-scheme",a);const n=a==="lightmode"?{bg:"#fff","bg-medium":"#eee","col-light":"#ddd","col-dark":"#ccc",font:"#000"}:{bg:"#111","bg-medium":"#222","col-dark":"#333","col-light":"#444",font:"#ccc"};for(const s in n)this.$refs.page.style.setProperty(`--${s}`,n[s]);this.ensurePlanColorContrast()},async changeNotifyMode(a){try{let e=await u(`/User/ChangeNotifyMode/${a}`,{method:"POST"}).then(t=>t.json());if(this.modalContent=e.message,e.isSuccess){this.modalTitle="Erfolg",this.showModal=!0;return}}catch{this.modalContent="Leider ist etwas schief gelaufen."}this.modalTitle="Fehlschlag",this.showModal=!0},async saveUserPushrId(a){if(typeof a!="string")return;new FormData().append("sid",a);try{await u(`/User/SetPushId/${a}`,{method:"POST"}).then(t=>t.json())}catch(t){console.error(t)}}}};class Je{constructor(e,t){this.table=new k(e.affectedWeekday,t.rows.map(n=>Object.assign(n,{hasChange:!1})),e.information),this.affectedDate=e.affectedDate}}const Qe=Object.assign(Ve,{__name:"Index",setup(a){return(e,t)=>{const n=O("RouterLink");return i(),l("div",{class:$([e.mq.current,"notif-page"]),ref:"page"},[o("div",xe,[o("img",{src:e.imgSrc,class:"artwork",alt:e.imgSrc},null,8,Ie),e.tempMax!==null?(i(),l("div",{key:0,class:"text-center",style:g({color:e.color})},c(e.tempMin)+"/"+c(e.tempMax)+"\xB0C",5)):m("",!0),o("h2",{class:"global-extra",style:g({color:e.color})},c(e.globalExtra),5),o("div",Te,[o("b",null,c(e.title),1),Ee,Pe,o("i",null,"(vom "+c(e.originDate)+" um "+c(e.originTime)+" Uhr.)",1)]),e.information.length>0?(i(),l("div",Ne,[(i(!0),l(w,null,M(e.information,s=>(i(),l("span",{key:s},[b(c(s),1),De]))),128))])):m("",!0),o("div",qe,"Es fehlen: "+c(e.missingTeachers.join(", ")),1),o("div",je,[(i(!0),l(w,null,M(e.tables,s=>(i(),l("div",{key:s},[h(ve,{color:e.color,table:s},null,8,["color","table"])]))),128))]),o("div",{class:"box link-container",style:g({color:e.color})},[Re,o("button",Be,[h(n,{to:"/Mitmachen"},{default:E(()=>[Ae]),_:1})])],4),o("div",Le,[h($e,{color:e.color,text:e.extraText,author:e.extraAuthor},null,8,["color","text","author"])])]),e.mq.tabletMinus?(i(),l("hr",{key:0,style:g({borderColor:e.color})},null,4)):m("",!0),o("div",Ue,[e.mq.desktopPlus?(i(),l("div",ze,[o("div",{class:"account-logo",style:g({color:e.color})},[h(F,{name:"account"})],4)])):m("",!0),o("div",He,[Oe,o("div",Fe,[(i(!0),l(w,null,M(e._switches,(s,d)=>(i(),y(N,{key:d,invert:!0,options:s.options,default:s.value,onSwitch:r=>e.switchMode(d,r)},null,8,["options","default","onSwitch"]))),128))]),o("button",{class:"btn",onClick:t[0]||(t[0]=()=>e.reload())},"Neuladen")])]),o("details",Ke,[We,o("img",{src:e.qrCodeSrc,alt:"QR Code",loading:"lazy"},null,8,Ge)]),h(P,{isOpen:e.showModal,onClose:t[1]||(t[1]=s=>e.showModal=!e.showModal),title:e.modalTitle,content:e.modalContent,buttons:[]},null,8,["isOpen","title","content"])],2)}}});const Ze={class:"content"},Xe={class:"center page-switch-container"},Ye={key:0},et={data(){return{isLoggedIn:null,page:null,modalTitle:"",modalContent:"",showModal:!1,modalMode:"",modalButtons:[],switchModel:new C([new f("sub","Abo Seite"),new f("notif","Plan Seite")],"notif")}},async mounted(){await this.handleHashReset(),await this.getPage()},methods:{async handleHashReset(){return new Promise(async(a,e)=>{const t=new URLSearchParams(window.location.search),n=t.get("code");return n===null||(t.delete("code"),window.history.pushState("","",window.location.origin+window.location.pathname+t.toString()),await this.resetHash(n)),a()})},async resetHash(a){return new Promise(async(e,t)=>{const n=new FormData;n.append("key",a),this.modalButtons=[],this.modalMode="hashResetResponse";let s;try{if(s=await u("/User/ResetHash",{method:"POST",body:n}).then(d=>d.json()),s.isSuccess)return this.modalTitle="Anmeldung erfolgreich",this.modalContent=`<b>ACHTUNG:</b> Folge den Anweisungen um Push Nachrichten zu erhalten:<br>
                     (0. Im besten Fall nutzt du Chrome)
                     1. Dr\xFCcke die Glocke unten links und klicke auf "ERLAUBEN".<br>
                     2. Scrolle nach unten und w\xE4hle "Push Nachrichten" statt "Email" aus.<br>
                     3. <br>a) bei Chrome: Dr\xFCcke auf die 3 Punkte oben rechts und anschlie\xDFend auf "App installieren" (Keine Angst, das ist nur diese Webseite in App-Form - rund 0,5 MB)<br>
                     b) sonst: F\xFCge die Webseite als Verkn\xFCpfung zum Startbildschirm hinzu
                     `,this.showModal=!0,sessionStorage.setItem("notif-page","notif"),e();this.modalTitle="Anmeldung fehlgeschlagen",this.modalContent=s.message}catch{this.modalTitle="Anmeldung fehlgeschlagen",this.modalContent="Leider ist etwas schief gelaufen"}return this.showModal=!0,e()})},async getPage(){const a=sessionStorage.getItem("notif-page");try{if((await u("/User/IsAuthenticated").then(t=>t.json())).body===!0){this.isLoggedIn=!0,this.page=a==="notif"||a==="sub"?a:"notif";return}}catch{}this.isLoggedIn=!1,this.page="sub"},switchPage(a){sessionStorage.setItem("notif-page",a),this.page=a},requestHashResetModal(){this.modalTitle="Neu anmelden",this.modalContent=`Wenn du dich bereits einmal angemeldet hast und nun auf die Vertretungsplandaten zugreifen m\xF6chtest bist du hier richtig. Wenn du auf den Knopf dr\xFCckst, erh\xE4lst du eine Email, mit einem Link, der dich wieder anmeldet.<br><br>
         `,this.modalButtons=[new T("Email senden","btn",()=>{(async()=>(await p(300),this.requestHashReset()))()})],this.modalMode="hashReset",this.showModal=!0},async requestHashReset(){const a=document.getElementById("hashreset-mail-input").value;this.modalMode="none",await p(0),this.modalButtons=[];let e,t=new FormData;t.append("mail",a);try{if(e=await u("/User/RequestHashReset",{method:"POST",body:t}).then(n=>n.json()),this.modalContent=e.message,e.isSuccess){this.modalTitle="Erfolg",this.showModal=!0;return}}catch{this.modalContent="Leider ist etwas schief gelaufen."}this.modalButtons=[new T("Erneut versuchen","btn",()=>{(async()=>(await p(300),this.requestHashResetModal()))()})],this.modalTitle="Fehlschlag",this.showModal=!0}}},tt=Object.assign(et,{__name:"Index",setup(a){return(e,t)=>(i(),l("div",Ze,[o("div",Xe,[e.isLoggedIn?(i(),y(N,{key:0,options:e.switchModel.options,default:e.page,value:e.page,onSwitch:e.switchPage},null,8,["options","default","value","onSwitch"])):m("",!0)]),e.page===null?(i(),l("div",Ye)):e.page==="notif"?(i(),y(Qe,{key:1})):e.page==="sub"?(i(),y(ue,{key:2,onRequestHashReset:t[0]||(t[0]=n=>e.requestHashResetModal())})):m("",!0),h(P,{isOpen:e.showModal,onClose:t[1]||(t[1]=n=>e.showModal=!e.showModal),title:e.modalTitle,content:e.modalContent,buttons:e.modalButtons},{default:E(()=>[e.modalMode==="hashReset"?(i(),y(_,{key:0,isInvert:!0,label:"Email Addresse",id:"hashreset-mail-input"})):m("",!0)]),_:1},8,["isOpen","title","content","buttons"])]))}});var it=S(tt,[["__scopeId","data-v-38e0c2aa"]]);export{it as default};