<template>
 <nav class="nav flex-column justify-content-between">
    <div>
      <router-link
        exact
        :key="i"
        class="nav-link"
        exact-active-class="active"
        :to = "{ name: router.name }"
        v-for = "(router, i) in routerLinks"
      >
      <i class="fa" :class="`fa-${router.meta.icon}`"/>
      {{ router.meta.title }}
      </router-link>
      <hr>
      <!-- <layoutNewExpense/> -->

    </div>
    <layoutLogout/>

  </nav>
</template>
<script>
import layoutLogout from './layoutLogout'

export default {
  components: {
    layoutLogout
  },
  computed: {
    routerLinks () {
      return this.$router.options.routes.filter(r => r.name !== 'login' && r.name !== 'registro')
    }
  }
}
</script>

<style scoped lang="scss">
.nav {
  margin-left: -15px;
  width: calc(100% + 30px);
  height: calc(100vh - 49px);
  .nav-link {
    color: var(--dark-medium);
    transition: .4s;
    &.active {
      color: var(--featured);
      background-color: transparent;
    }
    &:hover {
      color: var(--dark);
      background-color: var(--featured);
    }
  }
}
</style>
