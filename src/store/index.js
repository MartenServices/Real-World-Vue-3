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
        // fetchEvents({ commit }) {
        //     EventServices.getEvents()
        //         .then((response) => {
        //             commit('SET_EVENTS', response.data)
        //             commit('SET_TOTAL_EVENTS', response.headers["x-total-count"])
        //         })
        //         .catch(() => {
        //            return this.$router.push({ name: 'NetworkError' })
        //         })
        // },
        fectchEvent({ commit }, id){
            EventServices.getEvent(id)
            .then((response) => {
                commit('SET_EVENT', response.data)
            })
            .catch(() => {
                return this.$router.push({ name: 'NetworkError' })
            })
        },
    },
    modules: {}
})