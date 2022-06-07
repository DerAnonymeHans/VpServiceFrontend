<template>
   <main :class="mq.current">
      <article :class="mq.current" class="introduction">
         Wenn jemand eine Idee hat was für ein sinnvoller Text hier stehen könnte bitte melden. Denn dieses Gelaber das jetzt hier steht macht nicht wirklich Sinn und erfüllt auch keinen Sinn abgesehen von dem des Platzhalters. Der Text existiert einfach nur um zu existieren. Doch tun wir das denn nicht alle? Eine äußerst existentialistische Frage, die dem Text jetzt spontan doch irgendwie Bedeutung schenkt... Also, was ist der Sinn des Lebens? Wenn du darauf eine Antwort hast kannst du dich auch bei mir melden. Ok, noch ein bisschen. Also, Text hier Text da Text dort blablabla. Ach Moment, vielleicht doch noch was sinnvolles. Dies ist keine offizielle Seite des Johanes Kepler Gymnasiums Leipzig (dafür sieht sie ja auch viel zu modern aus haha ;) ). Alle Angaben sind ohne Gewähr. Aber jetzt wirklich, was soll hier stehen??? Aaaaahhh
      </article>
      <div class="spaceship-container" v-if="mq.desktop">
         <img class="spaceship-img" src="@/assets/spaceship.png" alt="Spaceship" >
      </div>
   </main>
</template>
<script>
export default {
   inject: ['mq']
}
</script>
<style lang="scss">
@import "@/styles/_variables.scss";


main{
   height: max-content;
   .introduction {
      margin: $margin auto;  
      z-index: 2;
      position: relative;
   }
   &.desktop{
      .introduction{
         width: 50vw;
         margin-top: $margin * 6;
      }
      .spaceship-container{
         position: relative;
         margin: $margin * 8 0;

         .spaceship-img{
            position: absolute;
            z-index: 1;
            margin-left: $margin * 3;
            bottom: $margin;
         }
      }
   }
   &.tablet{
      .introduction{
         width: 80vw;
         margin-top: $margin * 4;
      }
   }
   &.mobile{
      .introduction{
         width: 80vw;
         margin-top: $margin * 3;
      }
   }
}


</style>