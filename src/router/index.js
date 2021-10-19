import { createRouter, createWebHistory } from "vue-router";
import EventList from "../views/EventList.vue";
import EventLayout from "../views/event/Layout.vue";
import EventDetails from "../views/event/Details.vue";
import EventRegister from "../views/event/Register.vue";
import EventEdit from "../views/event/Edit.vue";
import EventCreate from "../views/event/EventCreate.vue"
import NotFound from "../views/NotFound";
import NetworkError from "../views/NetworkError";
import NProgress from 'nprogress';
import EventServices from "@/services/EventServices.js";

const routes = [
  {
    path: "/",
    name: "EventList",
    component: EventList,
    props: (route) => ({ page: parseInt(route.query.page) || 1 })
  },
  {
    path: "/events/:id",
    name: "EventLayout",
    props: true,
    component: EventLayout,
    beforeEnter: (to, next) => {
      EventServices.getEvent(to.params.id)
        .then(response => {
          next((comp)=>{
            comp.$store.state.event = response.data
          })
        })
        .catch((error) => {
          if (error.response && error.response.status == 404) {
            return {
              name: "404Resource",
              params: { resource: "event" },
            }
          } else {
            return {
              name: "NetworkError",
            }
          }
        })
    },
    children: [
      {
        path: "",
        name: "EventDetails",
        component: EventDetails,
      },
      {
        path: "register",
        name: "EventRegister",
        component: EventRegister,
      },
      {
        path: "edit",
        name: "EventEdit",
        component: EventEdit,
        meta: { requireAuth: true }
      },
    ],
  },
  {
    path: "/event/:id",
    // Redirecting a old event route to a new events route
    redirect: () => {
      return { name: "EventDetails" };
    },
    children: [
      {
        path: "/event/:afterEvent(.*)",
        redirect: (to) => {
          return { path: "/events/" + to.params.afterEvent };
        },
      },
    ],
  },
  {
    path: "/about",
    name: "About",
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/event-create",
    name: "EventCreate",
    component: EventCreate
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
  },
  {
    path: "/404/:resource",
    name: "404Resource",
    component: NotFound,
    props: true,
  },
  {
    path: "/network-error",
    name: "NetworkError",
    component: NetworkError,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition){// <---
    // always scroll to top
    // only to bottom if there is a savedPosition
    if(savedPosition){
      return savedPosition 
    }else{
      return { top: 0 }
    }
  }
});

router.beforeEach((to,from) => {
  NProgress.start()

  const notAuthorized = true
  if(to.meta.requireAuth && notAuthorized){
    this.$store.state.flashMessage = 'Sorry you are not authorized to view this page'

    setTimeout(() => {
      this.$store.state.flashMessage = ''
    }, 3000)
    if(from.href){
      return false
    }else{
      return { path: '/'}
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router;
