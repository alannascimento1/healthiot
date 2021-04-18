<template>
  <div class="home">
    <!-- Botao de busca -->
    <div class="float-right">
      <form class="form-inline">
        <input class="form-control mr-sm-2" v-model="chaveAuxiliar" type="search" placeholder="CPF" aria-label="CPF">
        <button class="btn btn-secondary" @click="load();clickHistorico();">Search</button>
      </form>
    </div>

    <br>
    <hr>
      <div class="d-flex justify-content-center">
        <apexchart type="line" width="800" height="500" :options="chartOptions" :series="series"></apexchart>
      </div>
  </div>
</template>

<script>
import PostsService from '@/services/apiService'

export default {
  name: 'PaginaGraficos',
  data: function () {
    return {
      tempo: [],
      valoresSensor: null,
      value: [],
      tamanhoVetor: null,
      chaveAuxiliar: null,
      vS: [],
      response: {},
      responseH: {},
      tempoTemperatura: [],
      valueTemperatura: [],
      tempoOximetro: [],
      valueOximetro: [],
      chartOptions: [],
      series: [],
      titulo: String,
      ecg: Boolean,
      isCurrent: Boolean,
      isHistory: Boolean,
      temperatura: Boolean,
      oximetro: Boolean,
      expenses: [],
      arrHospitalized: [],
      hospitalizedChartColors: {
        borderColor: '#251F47',
        pointBorderColor: '#260F26',
        pointBackgroundColor: '#858EAB',
        backgroundColor: '#858EAB'
      }
    }
  },
  created: function () {
    this.titulo = 'EKG'
    this.ecg = true
    this.temperatura = false
    this.oximetro = false
    this.tempo = ['EKG', 'TEMPERATURE', 'OXIMETER']
    this.value = [2, 4, 7]
    this.isCurrent = true
    this.isHistory = false
    this.load()
    this.clickHistorico()
  },
  mounted () {
    this.load()
    this.clickHistorico()
  },
  methods: {
    async load () {
      const apiResponse = await PostsService.getAll()
      const responseExtra = apiResponse.data
      this.response = responseExtra[1]
      console.log('\n\nAqui comecao o HISTORICO\n\n')
      this.tamanhoVetor = this.response.length
      this.valoresSensor = JSON.parse(this.response[this.tamanhoVetor - 1].data)
      console.log('AQUI ANALISO\n')
      console.log('tamanho:', this.response[1].timestamp)
    },
    calTimestamp (timestamp) {
      const milliseconds = (timestamp.seconds) * 1000
      return new Date(milliseconds)
    },
    clickCurrent () {
      this.isCurrent = true
      this.isHistory = false
    },
    clickHistorico () {
      this.series =
      [
        {
          name: 'EKG',
          data: [JSON.parse(this.response[5].data).ekg, JSON.parse(this.response[4].data).ekg, JSON.parse(this.response[3].data).ekg, JSON.parse(this.response[2].data).ekg, JSON.parse(this.response[1].data).ekg, JSON.parse(this.response[0].data).ekg]
        },
        {
          name: 'Temperature',
          data: [JSON.parse(this.response[5].data).temperature, JSON.parse(this.response[4].data).temperature, JSON.parse(this.response[3].data).temperature, JSON.parse(this.response[2].data).temperature, JSON.parse(this.response[1].data).temperature, JSON.parse(this.response[0].data).temperature]
        },
        {
          name: 'Oximeter',
          data: [JSON.parse(this.response[5].data).oximeter, JSON.parse(this.response[4].data).oximeter, JSON.parse(this.response[3].data).oximeter, JSON.parse(this.response[2].data).oximeter, JSON.parse(this.response[1].data).oximeter, JSON.parse(this.response[0].data).oximeter]
        }
      ]
      this.chartOptions =
      {
        chart: {
          // height: 350,
          type: 'line',
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          // width: [5, 7, 5],
          curve: 'straight',
          dashArray: [0, 8, 5],
          color: '#a1f1f1'
        },
        legend: {
          tooltipHoverFormatter: function (val, opts) {
            return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
          }
        },
        markers: {
          size: 0,
          hover: {
            sizeOffset: 6
          }
        },
        xaxis: {
          categories: [this.calTimestamp(this.response[5].timestamp).toLocaleString(), this.calTimestamp(this.response[4].timestamp).toLocaleString(), this.calTimestamp(this.response[3].timestamp).toLocaleString(), this.calTimestamp(this.response[2].timestamp).toLocaleString(), this.calTimestamp(this.response[1].timestamp).toLocaleString(), this.calTimestamp(this.response[0].timestamp).toLocaleString()]
        },
        tooltip: {
          theme: 'pallet3',
          style: {
            fontSize: '12px',
            fontFamily: undefined
          },
          y:
          [
            {
              title: {
                formatter: function (val) {
                  return val
                }
              }
            },
            {
              title: {
                formatter: function (val) {
                  return val
                }
              }
            },
            {
              title: {
                formatter: function (val) {
                  return val
                }
              }
            }
          ]
        },
        grid: {
          borderColor: '#f1f1f1'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  padding: 15px;
  .home-box {
    width: 100%;
    display: flex;
    font-size: 30pt;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    height: calc(50vh - 15px);
    border: 1px solid var(--dark-medium);
    small {
      font-size: 1.3rem;
    }
    .money {
      color: var(--featured);
    }
    &:nth-child(2), &:nth-child(4) {
      border-left: none;
    }
    &:nth-child(3), &:nth-child(4) {
      border-top: none;
    }
  }

  .btn-secondary {
    color: var(--white);
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
