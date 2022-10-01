<!-- @format -->

<script setup>
import { RouterLink, RouterView } from "vue-router";
import Navbar from "@/components/navigation/Navbar.vue";
import Footer from "@/components/footer/Footer.vue";
</script>

<template>
   <span class="mq" :class="mq.current">
      <div v-if="isLoading" id="loading-screen"></div>
      <Navbar />
      <RouterView />
      <Footer />
   </span>
</template>

<script>
export default {
   inject: ["mq"],
   data() {
      return {
         isLoading: false,
      };
   },
   provide() {
      return {
         os: this.getOs(),
      };
   },
   beforeMount() {
      if (window.location.origin === "http://kepleraner.herokuapp.com")
         window.location = "https://kepleraner.herokuapp.com" + window.location.pathname + window.location.search;

      const params = new URLSearchParams(window.location.search);
      sessionStorage.setItem("cached-stat-user", params.get("stat-user"));
      sessionStorage.setItem("cached-stat-pw", params.get("stat-pw"));
   },
   mounted() {
      window.addEventListener("startloading", () => {
         this.isLoading = true;
         setTimeout(() => (this.isLoading = false), 7000);
      });
      window.addEventListener("endloading", () => {
         this.isLoading = false;
      });
   },
   methods: {
      getOs() {
         const userAgent = window.navigator.userAgent;
         if (userAgent.indexOf("Windows") != -1) return "windows";
         if (userAgent.indexOf("mac") != -1) return "mac";
         if (
            ["iPad Simulator", "iPhone Simulator", "iPod Simulator", "iPad", "iPhone", "iPod"].includes(navigator.platform) ||
            (navigator.userAgent.includes("Mac") && "ontouchend" in document)
         )
            return "mac";
         if (userAgent.indexOf("X11") != -1) return "unix";
         if (userAgent.indexOf("Linux") != -1) return "linux";
      },
      async saveUserPushrId(sid) {
         if (typeof sid !== "string") return;
         const form = new FormData();
         form.append("sid", sid);
         try {
            await fetchAPI(`/User/SetPushId/${sid}`, { method: "POST" }).then((res) => res.json());
         } catch (e) {
            console.error(e);
         }
      },
   },
};
const URL = import.meta.env.VITE_API_URL;
const fetchAPI = (path, obj = {}) => fetch(URL + path, Object.assign({ credentials: "include" }, obj));

const sleep = (ms) => new Promise((resolve, reject) => setTimeout(resolve, ms));

export { fetchAPI, sleep };
</script>

<style lang="scss">
@import "@/styles/variables";
html {
   height: 100%;
}
body {
   margin: 0;
   height: fit-content;
   font-family: "Gadugi", sans-serif;
}
::selection {
   background-color: $accent;
   color: $col-light;
}
article {
   text-align: justify;
   column-gap: $margin * 2;
   padding: $padding;
   color: $col-text;
   font-size: 1.15em;
   line-height: 1.5em;
   column-width: 300px;
}
table {
   td,
   th {
      border-left: $margin solid #fff0;
   }

   tr > td:first-child {
      border: 0px;
   }
}

::-webkit-scrollbar {
   width: 10px;
   background-color: $col-dark;
}
::-webkit-scrollbar-thumb {
   background-color: lighten($col-dark, 40%);

   &:hover {
      background-color: lighten($col-dark, 60%);
   }
}

@media print {
   .box {
      color: black !important;
      border-color: rgba(0, 0, 0, 0.2) !important;
      // border: none !important;
      background-color: none;
   }
   .dont-print {
      display: none !important;
   }
   .print {
      display: block !important;
   }
}
.print {
   display: none;
}

#loading-screen {
   background-color: rgba($col-dark, 0.1);
   z-index: 2000000000;
   position: fixed;
   inset: 0;
   transition: all 0.5s ease;
   display: grid;
   place-items: center;

   cursor: progress;

   &::before {
      content: "";
      animation: 1s linear infinite spinner;
      animation-play-state: inherit;
      border: solid 5px #cfd0d1;
      border-bottom-color: $accent;
      border-radius: 50%;
      height: min(8vh, 8vw);
      aspect-ratio: 1;
      position: absolute;
      will-change: transform;
   }
}

@keyframes spinner {
   0% {
      transform: rotate(0deg);
   }
   100% {
      transform: rotate(360deg);
   }
}

.mq {
   .content {
      margin: 5vh auto;
      margin-bottom: 0;
   }
   &.ultrawide {
      .content {
         width: 45vw;
      }
   }
   &.desktop {
      .content {
         width: 60vw;
      }
   }
   &.tablet {
      .content {
         width: 70vw;
      }
   }
   &.mobile {
      .content {
         width: 95vw;
      }
   }
}
</style>
