<template>
  <p>
    {{ this.$store.state.event.time }} on {{ this.$store.state.event.date }} @
    {{ this.$store.state.event.location }}
  </p>
  <p>{{ this.$store.state.event.description }}</p>
</template>

<script>
export default {
  props: ["event"],
}
</script>
