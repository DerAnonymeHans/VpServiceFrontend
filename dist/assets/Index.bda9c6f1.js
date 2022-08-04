import{_ as u,r as p,o as a,c as n,a as d,b as e,t as b,d as l,w as _,n as c,p as f,e as w,f as o,F as k}from"./index.ead15cea.js";var y="/assets/kepler_circles.c8f9457e.png";const x={inject:["mq"],data(){return{greeting:"Kepleraner"}},mounted(){const i=new URLSearchParams(document.location.search).get("name");if(typeof i=="string"){this.greeting=i,localStorage.setItem("greeting",i);return}typeof localStorage.getItem("greeting")=="string"&&(this.greeting=localStorage.getItem("greeting"))}},s=r=>(f("data-v-7874ade2"),r=r(),w(),r),z={key:0,class:"shape-bg",viewBox:"0 0 100 30"},$=s(()=>e("path",{d:"M 0 0 v 25 L 30 30 L 100 25 v -25 0 Z",fill:"currentColor"},null,-1)),S=[$],L={key:1,class:"shape-bg",viewBox:"0 0 100 40"},q=s(()=>e("path",{d:"M 0 0 v 30 L 30 40 L 100 30 v -40 0 Z",fill:"currentColor"},null,-1)),B=[q],M={key:2,class:"shape-bg",viewBox:"0 0 100 60"},K=s(()=>e("path",{d:"M 0 0 v 50 L 30 60 L 100 50 v -60 Z",fill:"currentColor"},null,-1)),C=[K],I={key:3,class:"shape-bg",viewBox:"0 0 100 100"},V=s(()=>e("path",{d:"M 0 0 v 80 L 30 100 L 100 80 v -80 Z",fill:"currentColor"},null,-1)),D=[V],F={class:"greeting"},j=s(()=>e("h3",null,"Hallo",-1)),A={class:"btn-container"},P=o("Zum Abonnement"),Z={key:0,class:"kepler-img",src:y,alt:"Kepler"};function N(r,i,v,g,h,t){const m=p("RouterLink");return a(),n("header",null,[t.mq.ultrawide?(a(),n("svg",z,S)):t.mq.desktop?(a(),n("svg",L,B)):t.mq.tablet?(a(),n("svg",M,C)):t.mq.mobile?(a(),n("svg",I,D)):d("",!0),e("div",{class:c(["overlay",t.mq.current])},[e("div",F,[j,e("h1",null,b(h.greeting)+".",1)]),e("div",A,[l(m,{to:"/Benachrichtigung?scroll=true",class:"btn-focus"},{default:_(()=>[P]),_:1})]),t.mq.desktopPlus?(a(),n("img",Z)):d("",!0)],2)])}var R=u(x,[["render",N],["__scopeId","data-v-7874ade2"]]),U="/assets/spaceship.5ba26bba.png";const E={inject:["mq"]},G=o(" Auf Kepleraner findest du Dinge rund um das Johannes-Kepler-Gymnasium Leipzig. Es sei aber angemerkt, dass es sich hierbei um keine offizielle Schulseite, sondern um ein Privatprojekt handelt."),H=e("br",null,null,-1),O=o("Der wichtigste Bestandteil der Seite sind die Vertretungsplan Update Emails. Wenn du es auch Leid bist, st\xE4ndig nach neuen Vertretungsplandaten zu schauen, dann abonniere unter "),T=e("a",{href:"/Benachrichtigung"},"Benachrichtigung",-1),W=o(" den Service und erhalte immer Plan Updates f\xFCr deine Klassenstufe, sowie vieles mehr."),J=e("br",null,null,-1),Q=o(" Unter dem Men\xFCpunkt "),X=e("a",{href:"/Statistiken"},"Statistiken",-1),Y=o(" findest du statistische Daten \xFCber alles m\xF6gliche. Von einfachen Daten wie den Gesamtzahlen an Fehl- und Vertretungsstunden f\xFCr Lehrer/F\xE4cher/Klassen/Klassenstufen/Kurse \xFCber die Daten nach Monaten, Wochentagen, Stunden und Schnittmengen von Daten zwischen bspw. einer Klasse und ihrer Lehrer bis hin zu errechnetem Ausfall als Anteil an den planm\xE4\xDFigen Gesamtstunden. Au\xDFerdem gibt es nat\xFCrlich auch Rankings in denen die Top 10 aufgef\xFChrt werden."),ee=e("br",null,null,-1),te=o("F\xFCr Feedback und M\xF6glichkeiten wie du dich selbst mit einbringen kannst gibt es unter "),ae=e("a",{href:"/Mitmachen"},"Mitmachen",-1),ne=o(" diverse Optionen."),oe=e("br",null,null,-1),re=[G,H,O,T,W,J,Q,X,Y,ee,te,ae,ne,oe],ie={key:0,class:"spaceship-container"},se=e("img",{class:"spaceship-img",src:U,alt:"Spaceship"},null,-1),de=[se];function le(r,i,v,g,h,t){return a(),n("main",{class:c(t.mq.current)},[e("article",{class:c([t.mq.current,"introduction"])},re,2),t.mq.desktopPlus?(a(),n("div",ie,de)):d("",!0)],2)}var ce=u(E,[["render",le]]);const ve={},ue=Object.assign(ve,{__name:"Index",setup(r){return(i,v)=>(a(),n(k,null,[l(R),l(ce)],64))}});export{ue as default};