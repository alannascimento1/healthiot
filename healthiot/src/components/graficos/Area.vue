<template>
  <div class="example">
    <apexchart width="800" height="450" type="area" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script>
export default {
  name: 'AreaExample',
  props: {
    timestamp: {
      type: Array
    },
    value: {
      type: Array
    }
  },
  data: function () {
    return {
      chartOptions: {
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          categories: this.timestamp
        },
        tooltip: {
          fixed: {
            enabled: false,
            position: 'topRight'
          }
        }
      },
      series: [{
        name: 'series1',
        data: this.value
      }]
    }
  }
}
</script>
