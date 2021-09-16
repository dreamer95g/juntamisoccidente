<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
export default {
  name: "App",

  computed: {
    layout() {
      //console.log(this.$store.state.layout);
      return this.$store.state.layout;
    },
  },
};
</script>
