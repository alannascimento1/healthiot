<template>
  <div id="app">
    <base-spinner/>

    <div class="container-fluid" v-if="isLogged">
      <div class="row">
        <div class="col-2 navigation-sidebar">
          <h1 class="app-title"><strong>HealthIot</strong></h1>
          <LayoutNavigation></LayoutNavigation>
        </div>
        <div class="col">
          <router-view/>
        </div>
      </div>
    </div>
    <router-view v-else/>
  </div>
</template>

<script>
import BaseSpinner from './components/global/BaseSpinner'
import LayoutNavigation from './components/layout/layoutNavigation'

export default {
  name: 'App',
  components: {
    BaseSpinner,
    LayoutNavigation
  },
  data: () => ({ isLogged: false }),
  mounted () {
    this.$firebase.auth().onAuthStateChanged(user => {
      window.uid = user ? user.uid : null
      this.isLogged = !!user
      this.$router.push({ name: window.uid ? 'paginaGraficos' : 'login' })
      setTimeout(() => {
        this.$root.$emit('Spinner::hide')
      }, 300)
    })
  },
  methods: {
    mostrarSpinner () {
      this.$root.$emit('Spinner::show')
    }
  }
}
</script>

<style lang="scss">
#app {
  min-height: 100vh;
  color: var(--dark);
  background-color: var(--light-medium);
  .navigation-sidebar {
    background-color: var(--light-low);
    .app-title {
      font-size: 20pt;
      margin-top: 10px;
      text-align: center;
    }
  }
}
</style>
