<!-- @format -->

<template>
   <header>
      <svg class="shape-bg" viewBox="0 0 100 30" v-if="mq.ultrawide">
         <path d="M 0 0 v 25 L 30 30 L 100 25 v -25 0 Z" fill="currentColor" />
      </svg>
      <svg class="shape-bg" viewBox="0 0 100 40" v-else-if="mq.desktop">
         <path d="M 0 0 v 30 L 30 40 L 100 30 v -40 0 Z" fill="currentColor" />
      </svg>
      <svg class="shape-bg" viewBox="0 0 100 60" v-else-if="mq.tablet">
         <path d="M 0 0 v 50 L 30 60 L 100 50 v -60 Z" fill="currentColor" />
      </svg>
      <svg class="shape-bg" viewBox="0 0 100 100" v-else-if="mq.mobile">
         <path d="M 0 0 v 80 L 30 100 L 100 80 v -80 Z" fill="currentColor" />
      </svg>
      <div class="overlay" :class="mq.current">
         <div class="greeting">
            <h3>Hallo</h3>
            <h1>{{ greeting }}.</h1>
         </div>

         <div class="btn-container">
            <RouterLink to="/Benachrichtigung?scroll=true" class="btn-focus">Zum Abonnement</RouterLink>
         </div>

         <img class="kepler-img" v-if="mq.desktopPlus" src="@/assets/kepler_circles.png" alt="Kepler" />
         <!-- https://hurraki.de/wiki/Datei:Johannes_Kepler.jpg - gemeinfrei -->
      </div>
   </header>
</template>

<script>
export default {
   inject: ["mq"],
   data() {
      return {
         greeting: "Kepleraner",
      };
   },
   mounted() {
      const query = new URLSearchParams(document.location.search);
      const name = query.get("name");
      if (typeof name === "string") {
         this.greeting = name;
         localStorage.setItem("greeting", name);
         return;
      }
      if (typeof localStorage.getItem("greeting") === "string") this.greeting = localStorage.getItem("greeting");
   },
};
</script>

<style scoped lang="scss">
@import "@/styles/_variables.scss";
@import "@/styles/components.scss";
.shape-bg {
   width: 100%;
   color: $col-dark;
}
.overlay {
   position: absolute;
   width: 100%;
   height: fit-content;
   top: 8vh;

   .greeting {
      h3 {
         color: $accent;
         font-weight: lighter;
         margin: 0;
      }
      h1 {
         color: $col-light;
         margin: 0;
      }
   }
   .btn-container {
      width: 100%;
      place-items: center;
      display: flex;
      justify-content: center;

      a {
         color: $col-light;
      }
   }
   &.mobile {
      .greeting {
         margin-left: $margin * 2;
         margin-top: 10vh;
         h3 {
            font-size: 10vw;
            line-height: 10vw;
         }
         h1 {
            font-size: 15vw;
            line-height: 15vw;
         }
      }
      .btn-container {
         margin-top: 15vw;
         button {
            font-size: 4vw;
         }
      }
   }
   &.tablet {
      .greeting {
         margin-left: 10vw;
         margin-top: 12vw;
         h3 {
            font-size: 7vw;
            line-height: 7vw;
         }
         h1 {
            font-size: 10vw;
            line-height: 10vw;
         }
      }
      .btn-container {
         margin-top: 12vw;
         button {
            font-size: 2vw;
         }
      }
   }
   &.desktop {
      .greeting {
         margin-left: 10vw;
         margin-top: 6vw;
         h3 {
            font-size: 5vw;
            line-height: 5vw;
         }
         h1 {
            font-size: 8vw;
            line-height: 8vw;
         }
      }
      .btn-container {
         margin-top: 10vw;
         .btn-focus {
            font-size: 1vw;
         }
      }
      .kepler-img {
         width: 15vw;
         position: absolute;
         right: 5vw;
         top: 12vw;
      }
   }
   &.ultrawide {
      .greeting {
         margin-left: 20vw;
         margin-top: 6vw;
         h3 {
            font-size: 5vw;
            line-height: 5vw;
         }
         h1 {
            font-size: 8vw;
            line-height: 8vw;
         }
      }
      .btn-container {
         margin-top: 5vw;
         .btn-focus {
            font-size: 0.7vw;
         }
      }
      .kepler-img {
         width: 15vw;
         position: absolute;
         right: 5vw;
         top: 8vw;
      }
   }
}
</style>
