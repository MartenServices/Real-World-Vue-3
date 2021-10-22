import { createStore } from 'vuex'
import EventServices from '@/services/EventServices.js'

export default createStore({
    state: {
        user: "Ryan Marten",
        events: [],
        event: [],
        totalEvents: 0,
        flashMessage: ""
    },
    mutations: {
        ADD_EVENT(state, event) {
            state.events.push(event)
        },
        SET_EVENT(state, event){
            state.event = event
        },
        // SET_EVENTS(state, event) {
        //     state.events = event
        // },
        // SET_TOTAL_EVENTS(state, totalEvents) {
        //     state.totalEvents = totalEvents
        // }
    },
    actions: {
        createEvent({ commit }, event) {
            EventServices.postEvent(event)
                .then(() => {
                    commit('ADD_EVENT', event)
                })
                .catch(error => {
                    console.log(error)
                })
        },
        // fetchEvents({ commit },maxPages, page, next ) {
        //     EventServices.getEvents(maxPages, page)
        //         .then((response) => {
        //             next(() =>{
        //                 commit('SET_EVENTS', response.data)
        //                 commit('SET_TOTAL_EVENTS', response.headers["x-total-count"])
        //             })
        //         })
        //         .catch(() => {
        //            return this.$router.push({ name: 'NetworkError' })
        //         })
        // },
        fetchEvent({ commit }, id){
            EventServices.getEvent(id)
            .then((response) => {
                commit('SET_EVENT', response.data)
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
    },
    modules: {}
})