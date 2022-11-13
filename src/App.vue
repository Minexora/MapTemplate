<template>
  <div id="app" class="container-fluid p-0">
    <router-view/>
  </div>
</template>

<script>
import useJwt from '@/auth/jwt/useJwt'
export default {
  name: 'App',
  created () {
    const userData = useJwt.getUserData()
    const showVehicles = useJwt.getVehicles()
    console.log(userData)
    console.log(typeof userData)
    if (userData) {
      this.$store.commit('auth/set_token', userData.data.token)
      this.$store.commit('auth/set_username', userData.data.username)
      this.$store.commit('auth/set_userId', userData.data.userId)
      this.$store.commit('auth/set_userType', userData.data.userType)
      this.$store.commit('vehicle/set_showVehicles', showVehicles)
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
