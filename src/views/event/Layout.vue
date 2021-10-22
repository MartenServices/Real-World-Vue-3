<template>
  <div v-if="this.$store.state.event">
    <h1>{{ this.$store.state.event.title }}</h1>
    <div id="nav">
      <router-link :to="{ name: 'EventDetails' }">Details</router-link>
      <router-link :to="{ name: 'EventRegister' }">Register</router-link>
      <router-link :to="{ name: 'EventEdit' }">Edit</router-link>
    </div>
    <router-view :event="this.event"></router-view>
  </div>
</template>

<script>
export default {
  props: ['event'],
}
</script>
