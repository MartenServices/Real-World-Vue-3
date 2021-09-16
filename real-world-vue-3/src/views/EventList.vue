<template>
  <div class="events">
    <EventCard />
  </div>
</template>

<script>
// @ is an alias to /src
import EventCard from "@/components/EventCard.vue";
// import axios from "axios";

export default {
  name: "EventList",
  components: {
    EventCard,
  },
  data(){
    // events: null
  },
};
</script>
