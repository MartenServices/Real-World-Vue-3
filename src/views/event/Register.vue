<template>
  <p>Register for event here</p>
  <button @click="register">Register Me</button>
</template>

<script>

export default {
  props: ["event"],
  methods: {
    register() {
      // call to API
      // If registered then  redrirect to event details
      this.$store.state.flashMessage =
        "You are succesfully registered for " + this.event.title;

      setTimeout(() => {
        this.$store.state.flashMessage = "";
      }, 3000);

      this.$router.push({
        name: "EventDetails",
        params: { id: this.event.id },
      });
    },
  },
};
</script>
