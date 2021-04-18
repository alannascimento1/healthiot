<template>
  <div class="home">
    <!-- Botao de busca -->
    <div class="float-right">
      <form class="form-inline">
        <input class="form-control mr-sm-2" v-model="chaveAuxiliar" type="search" placeholder="CPF" aria-label="CPF">
        <button class="btn btn-secondary" @click="click();load();" type="submit">Search</button>
      </form>
    </div>

    <!-- Escolha de grafico -->
    <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
      <div class="btn-group mr-2" role="group" aria-label="First group">
        <button type="button" @click="click();load();" class="btn btn-secondary" exact-active-class="active">EKG</button>
        <button type="button" @click="click();load();" class="btn btn-secondary" exact-active-class="active">TEMPERATURE</button>
        <button type="button" @click="click();load();" class="btn btn-secondary" exact-active-class="active">OXIMETER</button>
      </div>
    </div>

    <br>
    <hr>

    <!-- Titulo -->
    <!-- <div class="col-10 d-flex justify-content-center">
      <h2 class="text-center">{{this.titulo}}</h2>
    </div> -->
    <!-- Desenho do grafico -->
    <!-- <div class="d-flex justify-content-center">
      <apexchart width="800" height="500" type="area" :options="chartOptions" :series="series"></apexchart>
    </div> -->
      <div class="d-flex justify-content-center">
        <apexchart width="800" height="500" type="bar" :options="chartOptions" :series="series"></apexchart>
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
      value: [],
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
    this.click()
    this.oximetro = false
    this.tempo = ['EKG', 'TEMPERATURE', 'OXIMETER']
    this.value = [2, 4, 7]
    this.isCurrent = true
    this.isHistory = false
    this.Temperatura()
  },
  mounted () {
    this.load()
    this.click()
  },
  methods: {
    async load () {
      const apiResponse = await PostsService.getAll()
      const responseExtra = apiResponse.data
      this.response = responseExtra[0]
    },
    clickCurrent () {
      this.isCurrent = true
      this.isHistory = false
    },
    click () {
      this.chartOptions =
      {
        dataLabels: {
          enabled: true,
          style: {
            fontSize: '20px'
          }
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          categories: ['EKG', 'TEMPERATURE', 'OXIMETER']
        },
        tooltip: {
          theme: 'pallet5',
          style: {
            fontSize: '12px',
            fontFamily: undefined
          },
          fixed: {
            enabled: false,
            position: 'topRight'
          }
        }
      }
      this.series = [{
        data: [this.response[0].Record.ekg, this.response[0].Record.temperature, this.response[0].Record.oximeter]
      }]

      this.vS = [3, 4, 1]
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
