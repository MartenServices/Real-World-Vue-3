<template>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event"/>
  </div>
</template>

<script>
// @ is an alias to /src
import EventCard from "@/components/EventCard.vue";
import EventServices from "@/services/EventServices.js";

export default {
  name: "EventList",
  components: {
    EventCard,
  },
  data(){
    return {
      events: null
    }
  },
  created(){
    EventServices.getEvents()
      .then(response => {
        this.events = response.data
      })
      .catch(error => {
        console.log(error)
      })
  },
};
</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>