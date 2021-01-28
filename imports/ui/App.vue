<template>
  <div>
    <router-view />
  </div>
</template>

<script>
export default {};
</script>

<style>
/* override vuetify default theme */
html {
  font-size: 14px;
}

/* app theme */
#app {
  background-color: #e5e5e5;
  font-family: "Inter", sans-serif;
}
</style>