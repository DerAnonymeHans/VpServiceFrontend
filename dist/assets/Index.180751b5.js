import{_ as h,o as s,c as n,a as c,b as e,t as v,d as o,w as f,n as l,p as b,e as k,r as x,f as w,F as y}from"./index.353d2b8e.js";var S="/assets/kepler_circles.c8f9457e.png";const q={inject:["mq"],data(){return{greeting:"Kepleraner"}},mounted(){const i=new URLSearchParams(document.location.search).get("name");if(typeof i=="string"){this.greeting=i,localStorage.setItem("greeting",i);return}typeof localStorage.getItem("greeting")=="string"&&(this.greeting=localStorage.getItem("greeting"))}},r=a=>(b("data-v-46b13a2d"),a=a(),k(),a),L={key:0,class:"shape-bg",viewBox:"0 0 100 40"},z=r(()=>e("path",{d:"M 0 0 v 30 L 30 40 L 100 30 v -40 0 Z",fill:"currentColor"},null,-1)),A=[z],I={key:1,class:"shape-bg",viewBox:"0 0 100 60"},j=r(()=>e("path",{d:"M 0 0 v 50 L 30 60 L 100 50 v -60 Z",fill:"currentColor"},null,-1)),B=[j],C={key:2,class:"shape-bg",viewBox:"0 0 100 100"},T=r(()=>e("path",{d:"M 0 0 v 80 L 30 100 L 100 80 v -80 Z",fill:"currentColor"},null,-1)),M=[T],$={class:"greeting"},D=r(()=>e("h3",null,"Hallo",-1)),N={class:"btn-container"},V=w("Abonnieren"),F={key:0,class:"kepler-img",src:S,alt:"Kepler"};function G(a,i,d,p,_,t){const g=x("RouterLink");return s(),n("header",null,[t.mq.desktop?(s(),n("svg",L,A)):t.mq.tablet?(s(),n("svg",I,B)):t.mq.mobile?(s(),n("svg",C,M)):c("",!0),e("div",{class:l(["overlay",t.mq.current])},[e("div",$,[D,e("h1",null,v(_.greeting)+".",1)]),e("div",N,[o(g,{to:"/Benachrichtigung",class:"btn-focus"},{default:f(()=>[V]),_:1})]),t.mq.desktop?(s(),n("img",F)):c("",!0)],2)])}var u=h(q,[["render",G],["__scopeId","data-v-46b13a2d"]]),H="/assets/spaceship.5ba26bba.png";const K={inject:["mq"]},R={key:0,class:"spaceship-container"},Z=e("img",{class:"spaceship-img",src:H,alt:"Spaceship"},null,-1),E=[Z];function O(a,i,d,p,_,t){return s(),n("main",{class:l(t.mq.current)},[e("article",{class:l([t.mq.current,"introduction"])}," Wenn jemand eine Idee hat was f\xFCr ein sinnvoller Text hier stehen k\xF6nnte bitte melden. Denn dieses Gelaber das jetzt hier steht macht nicht wirklich Sinn und erf\xFCllt auch keinen Sinn abgesehen von dem des Platzhalters. Der Text existiert einfach nur um zu existieren. Doch tun wir das denn nicht alle? Eine \xE4u\xDFerst existentialistische Frage, die dem Text jetzt spontan doch irgendwie Bedeutung schenkt... Also, was ist der Sinn des Lebens? Wenn du darauf eine Antwort hast kannst du dich auch bei mir melden. Ok, noch ein bisschen. Also, Text hier Text da Text dort blablabla. Ach Moment, vielleicht doch noch was sinnvolles. Dies ist keine offizielle Seite des Johanes Kepler Gymnasiums Leipzig (daf\xFCr sieht sie ja auch viel zu modern aus haha ;) ). Alle Angaben sind ohne Gew\xE4hr. Aber jetzt wirklich, was soll hier stehen??? Aaaaahhh ",2),t.mq.desktop?(s(),n("div",R,E)):c("",!0)],2)}var m=h(K,[["render",O]]);const P={component:{Header:u,Main:m}},J=Object.assign(P,{name:"Index",setup(a){return(i,d)=>(s(),n(y,null,[o(u),o(m)],64))}});export{J as default};
