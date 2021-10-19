<template>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <div class="pagination">
      <router-link
        :to="{ name: 'EventList', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
      >
        &#60; prev
      </router-link>
      <router-link
        :to="{ name: 'EventList', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
      >
        next &#62;
      </router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import EventCard from "@/components/EventCard.vue";
import EventServices from '@/services/EventServices.js'

export default {
  name: "EventList",
  props: ["page"],
  components: {
    EventCard
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    EventServices.getEvents(3, parseInt(routeTo.query.page) || 1)
      .then((response) => {
        next((comp) => {
        comp.$store.state.events = response.data;
        comp.$store.state.totalEvents = response.headers["x-total-count"];
        })
      })
      .catch(() => {
        next({ name: 'NetworkError'})
      })
  },
  beforeRouteUpdate(routeTo) {
    return EventServices.getEvents(3, parseInt(routeTo.query.page) || 1)
      .then((response) => {
        this.$store.state.events = response.data;
        this.$store.state.totalEvents = response.headers["x-total-count"];
      })
      .catch(() => {
        return { name: 'NetworkError'}
      })
  },
  computed: {
    events(){
      return this.$store.state.events
    },
    hasNextPage() {
      let totalPages = Math.ceil(this.$store.state.totalEvents / 3);
      return this.page < totalPages;
    },

  }
}
</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>