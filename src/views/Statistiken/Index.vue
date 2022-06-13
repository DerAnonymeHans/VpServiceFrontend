<script setup>
import { computed } from "vue";
import Navigation from "./navigation/Navigation.vue";
import Sandkasten from "./sandkasten/Sandkasten.vue";
import Ranglisten from "./ranglisten/Ranglisten.vue";
import Modal from "@/components/modal/Modal.vue";
import DBStatus from "./functions/DBStatus.js";
import { fetchAPI, sleep } from "@/App.vue";
</script>

<template>
   <main :class="mq.current">
      <Navigation />

      <div class="content">
         <Sandkasten v-if="page === 'Sandkasten'" :statistic="statistic"/>
         <Ranglisten v-if="page === 'Ranglisten'"/>
      </div>
   </main>
   <Modal :isOpen="showModal" @close="showModal=!showModal" :title="modalTitle" :content="modalContent" :buttons="[]"></Modal> 
</template>

<script>
export default {
   data() {
      return {
         page: "Sandkasten",
         statistic: "gesamtzahlen",
         showModal: false,
         modalTitle: "",
         modalContent: "",
      };
   },
   inject: ["mq"],
   provide() {
      return {
         page: computed({
            get: () => {
               if(typeof sessionStorage.getItem('stat-page') !== "string") return this.page;
               return sessionStorage.getItem('stat-page')
            },
            set: (val) => {
               sessionStorage.setItem("stat-page", val)
               this.page = val;
            },
         }),
         statistic: computed({
            get: () => {
               if(typeof sessionStorage.getItem('stat-name') !== "string") return this.statistic;
               return sessionStorage.getItem('stat-name')
            },
            set: (val) => {
               sessionStorage.setItem("stat-name", val)
               this.statistic = val;
            },
         }),
         fetchStat: this.optionalFetch
      };
   },
   async beforeMount(){
      await this.dbSetup();
   },
   methods: {
      dbSetup(){
         return new Promise((resolve, reject) => {
            sessionStorage.setItem("db-status", DBStatus.PENDING)
            if(!window.indexedDB){
               sessionStorage.setItem("db-status", DBStatus.ERROR);
               return resolve();
            }
            if(!sessionStorage.getItem("db-status") === DBStatus.RUNNING) {
               indexedDB.deleteDatabase("statDB");
            };
   
            let request = window.indexedDB.open("StatistikenDB", 1);
            request.onerror = e => {
               sessionStorage.setItem("db-status", DBStatus.ERROR);
               return resolve()
            }
            request.onsuccess = e => {
               console.log("success")
               sessionStorage.setItem("db-status", DBStatus.RUNNING);
               window.statDB = e.target.result;       
               return resolve()
            }
            request.onupgradeneeded = e => {
               sessionStorage.setItem("db-status", DBStatus.RUNNING);  
               window.statDB = e.target.result;
               const store = window.statDB.createObjectStore("cached-data", {keyPath: "path"})
               store.createIndex("data", "data", {unique: false});
               return resolve()
            }
         })

      },
      inform(title, content){
         this.modalTitle = title;
         this.modalContent = content;
         this.showModal = true;
      },
      optionalFetch(path){
         return new Promise(async (resolve, reject) => {
            const dbStatus = sessionStorage.getItem("db-status")
            for(let i=0; i<5; i++){
               if(dbStatus === DBStatus.PENDING) await sleep(200)
               else break;
            }
            if(dbStatus === DBStatus.RUNNING){
               try{
                  const res = await this.getFromDb(path)
                  return resolve(res);
               }catch(e) {
                  console.log("catched")
               }
               // .then(res => {
               //    isDataInDb = true;
               //    resolve(res)
               // })
               // .catch(() => {
               //    isDataInDb = false;
               // })
            }

            let res;
            try{
               res = await fetchAPI('/Statistic' + path)
               if(res.status !== 200) throw new Error();
               res = await res.json()   
            }catch(e){
               this.inform("Problem", "Die von dir angefragten Statistiken wurden nicht gefunden.")
               return reject();
            }

            if(!res.isSuccess){
               this.inform("Information", res.message);
               return reject();
            }

            if(dbStatus === DBStatus.RUNNING){
               this.insertInDb(path, res.body);
            }

            return resolve(res.body);
         })
      },
      getFromDb(path){
         return new Promise(async(resolve, reject) => {
            const request = await window.statDB.transaction(["cached-data"])
            .objectStore("cached-data")
            .get(path)

            request.onsuccess = e => {
               if(e.target.result === undefined) return reject()
               resolve(e.target.result.data)
            }
            request.onerror = e => {
               reject();
            }
         })
      },
      insertInDb(path, value){
         window.statDB.transaction(["cached-data"], "readwrite")
            .objectStore("cached-data")
            .add({data: value, path: path})         
      }
   }
};

</script>

<style lang="scss" scoped>
@import "@/styles/_variables.scss";
main{
   .content{
      margin: $margin auto;
   }
   &.desktop{
      .content{
         width: 60vw;
      }
   }
   &.tablet{
      .content{
         width: 70vw;
      }
   }
   &.mobile{
      .content{
         width: 95vw;         
      }
   }
}
</style>
