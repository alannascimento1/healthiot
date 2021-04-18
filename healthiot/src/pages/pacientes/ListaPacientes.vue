<template>
  <div>
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Navbar</a>
      </nav>
    </div>
    <grid :cols="cols" :rows="rows"></grid>
  </div>
</template>

<script>
import Grid from 'gridjs-vue'

export default {
  name: 'ListaPacientes',
  components: {
    Grid
  },
  data () {
    return {
      cols: ['Make', 'Model', 'Year', 'Color'],
      rows: [
        ['Ford', 'Fusion', '2011', 'Silver'],
        ['Chevrolet', 'Cruz', '2018', 'White']
      ]
    }
  }
}
</script>
