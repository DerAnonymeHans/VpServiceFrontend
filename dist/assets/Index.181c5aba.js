import{_ as v,r as u,o as a,c as n,a as s,b as e,t as _,d,w as f,n as l,p as w,e as y,f as k,F as x}from"./index.9f83787d.js";var z="/assets/kepler_circles.c8f9457e.png";const S={inject:["mq"],data(){return{greeting:"Kepleraner"}},mounted(){const i=new URLSearchParams(document.location.search).get("name");if(typeof i=="string"){this.greeting=i,localStorage.setItem("greeting",i);return}typeof localStorage.getItem("greeting")=="string"&&(this.greeting=localStorage.getItem("greeting"))}},r=o=>(w("data-v-46b13a2d"),o=o(),y(),o),q={key:0,class:"shape-bg",viewBox:"0 0 100 40"},L=r(()=>e("path",{d:"M 0 0 v 30 L 30 40 L 100 30 v -40 0 Z",fill:"currentColor"},null,-1)),j=[L],A={key:1,class:"shape-bg",viewBox:"0 0 100 60"},I=r(()=>e("path",{d:"M 0 0 v 50 L 30 60 L 100 50 v -60 Z",fill:"currentColor"},null,-1)),B=[I],C={key:2,class:"shape-bg",viewBox:"0 0 100 100"},T=r(()=>e("path",{d:"M 0 0 v 80 L 30 100 L 100 80 v -80 Z",fill:"currentColor"},null,-1)),M=[T],$={class:"greeting"},D=r(()=>e("h3",null,"Hallo",-1)),N={class:"btn-container"},V=k("Abonnieren"),F={key:0,class:"kepler-img",src:z,alt:"Kepler"};function G(o,i,c,b,h,t){const p=u("RouterLink");return a(),n("header",null,[t.mq.desktop?(a(),n("svg",q,j)):t.mq.tablet?(a(),n("svg",A,B)):t.mq.mobile?(a(),n("svg",C,M)):s("",!0),e("div",{class:l(["overlay",t.mq.current])},[e("div",$,[D,e("h1",null,_(h.greeting)+".",1)]),e("div",N,[d(p,{to:"/Benachrichtigung",class:"btn-focus"},{default:f(()=>[V]),_:1})]),t.mq.desktop?(a(),n("img",F)):s("",!0)],2)])}var m=v(S,[["render",G],["__scopeId","data-v-46b13a2d"]]),H="/assets/spaceship.5ba26bba.png";const K={inject:["mq"]},R={key:0,class:"spaceship-container"},Z=e("img",{class:"spaceship-img",src:H,alt:"Spaceship"},null,-1),E=[Z];function O(o,i,c,b,h,t){return a(),n("main",{class:l(t.mq.current)},[e("article",{class:l([t.mq.current,"introduction"])}," Wenn jemand eine Idee hat was f\xFCr ein sinnvoller Text hier stehen k\xF6nnte bitte melden. Denn dieses Gelaber das jetzt hier steht macht nicht wirklich Sinn und erf\xFCllt auch keinen Sinn abgesehen von dem des Platzhalters. Der Text existiert einfach nur um zu existieren. Doch tun wir das denn nicht alle? Eine \xE4u\xDFerst existentialistische Frage, die dem Text jetzt spontan doch irgendwie Bedeutung schenkt... Also, was ist der Sinn des Lebens? Wenn du darauf eine Antwort hast kannst du dich auch bei mir melden. Ok, noch ein bisschen. Also, Text hier Text da Text dort blablabla. Ach Moment, vielleicht doch noch was sinnvolles. Dies ist keine offizielle Seite des Johanes Kepler Gymnasiums Leipzig (daf\xFCr sieht sie ja auch viel zu modern aus haha ;) ). Alle Angaben sind ohne Gew\xE4hr. Aber jetzt wirklich, was soll hier stehen??? Aaaaahhh ",2),t.mq.desktop?(a(),n("div",R,E)):s("",!0)],2)}var g=v(K,[["render",O]]);const P={component:{Header:m,Main:g}},J=Object.assign(P,{name:"Index",setup(o){return(i,c)=>(a(),n(x,null,[d(m),d(g)],64))}});export{J as default};
