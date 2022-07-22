import{_ as m,r as f,o as n,c as a,a as c,b as e,t as b,d,w,n as l,p as k,e as y,f as i,F as x}from"./index.1c6d3494.js";var z="/assets/kepler_circles.c8f9457e.png";const $={inject:["mq"],data(){return{greeting:"Kepleraner"}},mounted(){const r=new URLSearchParams(document.location.search).get("name");if(typeof r=="string"){this.greeting=r,localStorage.setItem("greeting",r);return}typeof localStorage.getItem("greeting")=="string"&&(this.greeting=localStorage.getItem("greeting"))}},s=o=>(k("data-v-31ccd618"),o=o(),y(),o),S={key:0,class:"shape-bg",viewBox:"0 0 100 40"},L=s(()=>e("path",{d:"M 0 0 v 30 L 30 40 L 100 30 v -40 0 Z",fill:"currentColor"},null,-1)),q=[L],B={key:1,class:"shape-bg",viewBox:"0 0 100 60"},M=s(()=>e("path",{d:"M 0 0 v 50 L 30 60 L 100 50 v -60 Z",fill:"currentColor"},null,-1)),K=[M],I={key:2,class:"shape-bg",viewBox:"0 0 100 100"},V=s(()=>e("path",{d:"M 0 0 v 80 L 30 100 L 100 80 v -80 Z",fill:"currentColor"},null,-1)),C=[V],D={class:"greeting"},F=s(()=>e("h3",null,"Hallo",-1)),j={class:"btn-container"},A=i("Zum Abonnement"),E={key:0,class:"kepler-img",src:z,alt:"Kepler"};function N(o,r,h,p,g,t){const _=f("RouterLink");return n(),a("header",null,[t.mq.desktop?(n(),a("svg",S,q)):t.mq.tablet?(n(),a("svg",B,K)):t.mq.mobile?(n(),a("svg",I,C)):c("",!0),e("div",{class:l(["overlay",t.mq.current])},[e("div",D,[F,e("h1",null,b(g.greeting)+".",1)]),e("div",j,[d(_,{to:"/Benachrichtigung?scroll=true",class:"btn-focus"},{default:w(()=>[A]),_:1})]),t.mq.desktop?(n(),a("img",E)):c("",!0)],2)])}var u=m($,[["render",N],["__scopeId","data-v-31ccd618"]]),R="/assets/spaceship.5ba26bba.png";const U={inject:["mq"]},Z=i(" Auf Kepleraner findest du Dinge rund um das Johannes-Kepler-Gymnasium Leipzig. Es sei aber angemerkt, dass es sich hierbei um keine offizielle Schulseite, sondern um ein Privatprojekt handelt. Unter dem Men\xFCpunkt "),G=e("a",{href:"/Statistiken"},"Statistiken",-1),H=i(" findest du statistische Daten \xFCber alles m\xF6gliche. Von einfachen Daten wie den Gesamtzahlen an Fehl- und Vertretungsstunden f\xFCr Lehrer/F\xE4cher/Klassen/Klassenstufen/Kurse \xFCber die Daten nach Monaten, Wochentagen, Stunden und Schnittmengen von Daten zwischen bspw. einer Klasse und ihrer Lehrer bis hin zu errechnetem Ausfall als Anteil an der planm\xE4\xDFigen Gesamtstunden. Au\xDFerdem gibt es nat\xFCrlich auch Rankings in dem die Top 10 aufgef\xFChrt werden."),P=e("br",null,null,-1),O=i("Ein weiterer wichtiger Bestandteil der Seite sind die Vertretungsplan Update Emails. Wenn du es auch Leid bist, st\xE4ndig nach neuen Vertretungsplandaten zu schauen, dann abonniere unter "),T=e("a",{href:"/Benachrichtigung"},"Benachrichtigung",-1),W=i(" den Service und erhalte immer Plan Updates f\xFCr deine Klassenstufe, sowie vieles mehr."),J=e("br",null,null,-1),Q=i("F\xFCr Feedback und M\xF6glichkeiten wie du dich selbst mit einbringen kannst gibt es unter "),X=e("a",{href:"/Mitmachen"},"Mitmachen",-1),Y=i(" diverse Optionen. "),ee=[Z,G,H,P,O,T,W,J,Q,X,Y],te={key:0,class:"spaceship-container"},ne=e("img",{class:"spaceship-img",src:R,alt:"Spaceship"},null,-1),ae=[ne];function oe(o,r,h,p,g,t){return n(),a("main",{class:l(t.mq.current)},[e("article",{class:l([t.mq.current,"introduction"])},ee,2),t.mq.desktop?(n(),a("div",te,ae)):c("",!0)],2)}var v=m(U,[["render",oe]]);const ie={component:{Header:u,Main:v}},se=Object.assign(ie,{name:"Index",setup(o){return(r,h)=>(n(),a(x,null,[d(u),d(v)],64))}});export{se as default};