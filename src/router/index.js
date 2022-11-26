import { createRouter,createWebHistory} from "vue-router";


import UsingMF from "@/components/UsingMF.vue"
import UsingC from "@/components/UsingC.vue"
import RecordMedia from "@/components/RecordMedia.vue"
import SupeniorMedia from "@/components/SupeniorMedia.vue"
const routes = [
    { 
        path: "/",
        name: "",
        component: UsingMF
     },
     { 
        path: "/uc",
        name: "uc",
        component: UsingC
     },
     { 
        path: "/rm",
        name: "rm",
        component: RecordMedia
     },
     { 
      path: "/sn",
      name: "sn",
      component: SupeniorMedia
   },

   
  ]
  

 const router = createRouter({
  
    history: createWebHistory(),
    routes, 
  })
  export default router
  