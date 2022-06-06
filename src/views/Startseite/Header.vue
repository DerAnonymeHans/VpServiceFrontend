<!-- @format -->

<template>
   <header>
      <svg class="shape-bg" viewBox="0 0 100 40" v-if="mq.desktop">
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
            <h1>Kepleraner.</h1>
         </div>

         <div class="btn-container">
            <!-- <button class="btn-focus" @click="subscribe()">Abonnieren</button> -->
            <RouterLink to="/Benachrichtigung" class="btn-focus">Abonnieren</RouterLink>
         </div>

         <img class="kepler-img" v-if="mq.desktop" src="@/assets/kepler_circles.png" alt="Kepler">

      </div>
   </header>
</template>

<script>
export default {
   inject: ['mq'],
   methods: {
      subscribe(){

      }
   }
}
</script>

<style scoped lang="scss">
@import "@/styles/_variables.scss";
@import "@/styles/components.scss";
.shape-bg {
   width: 100%;
	color: $bg-dark;
}
.overlay{
	position: absolute;
	width: 100%;
	height: fit-content;   
	top: 8vh;

   .greeting{
      h3{
         color: $accent;
         font-weight: lighter;
         margin: 0;
      }
      h1{
         color: $color-header-prim;
         margin: 0;
      }
   }
   .btn-container{
      width: 100%;
      place-items: center;
      display: flex;
      justify-content: center;

      a{
         color: $color-header-prim;
      }
   }
   &.mobile{
      .greeting{
         margin-left: $margin * 2;
         margin-top: 10vh;
         h3{
            font-size: 10vw;
            line-height: 10vw;
         }
         h1{
            font-size: 15vw;
            line-height: 15vw;
         }
      }
      .btn-container {
         margin-top: 15vw;
         button{
            font-size: 4vw;
         }
      }
   }
   &.tablet{
      .greeting{
         margin-left: 10vw;
         margin-top: 12vw;
         h3{
            font-size: 7vw;
            line-height: 7vw;
         }
         h1{
            font-size: 10vw;
            line-height: 10vw;
         }
      }
      .btn-container {
         margin-top: 12vw;
         button{
            font-size: 2vw;
         }
      }
   }
   &.desktop{
      .greeting{
         margin-left: 10vw;
         margin-top: 6vw;
         h3{
            font-size: 5vw;
            line-height: 5vw;
         }
         h1{
            font-size: 8vw;
            line-height: 8vw;

         }
      }
      .btn-container {
         margin-top: 10vw;
         button{
            font-size: 1vw;
         }
      }
      .kepler-img{
         width: 15vw;
         position: absolute;
         right: 5vw;
         top: 12vw;
      }
   }


}
</style>
