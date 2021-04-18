<template>
  <div>
    <form @submit.prevent="doLogin()" class="form-login">
      <div class="card">
        <div class="card-header text center">
          <h1 class="mb-0">Expenses</h1>
        </div>
        <div class="card-body">
          <div class="form-group">
            <input required type="email" v-model="email" class="form-control" placeholder="E-mail">
          </div>
          <div class="form-group">
            <input required type="password" v-model="password" class="form-control" placeholder="Senha">
          </div>

          <button class="btn btn-primary w-100">
            <template v-if="!loading" :disable="loading">
              Entrar
            <i class="fa fa-sign-in-alt"></i>
            </template>
            <template v-else >
              Entrando...
              <i class="fa fa-spinner fa-spin"></i>
            </template>

          </button>
        </div>
        <div  class="cadastro"><label class="palavra" @click="toCadastro()">Cadastre-se</label></div>
      </div>

    </form>

  </div>
</template>

<script>
export default {
  name: 'Login',
  data: () => {
    return {
      email: 'nascimentoalankst@gmail.com',
      password: '123123',
      loading: false
    }
  },
  methods: {
    async doLogin () {
      this.loading = true
      const { email, password } = this

      try {
        const res = await this.$firebase.auth().signInWithEmailAndPassword(email, password)
        window.uid = res.user.uid

        this.$router.push({ name: 'paginaGraficos' })
      } catch (err) {
        let message = ''
        switch (err.code) {
          case 'auth/user-not-found':
            message = 'Não foi possível localizar o usuário.'
            break
          case 'auth/wrong-password':
            message = 'Senha inválida'
            break
          default:
            message = 'Não foi possível fazer login, tente novamente'
        }
        console.log(message)
        this.$root.$emit('Notification::show', {
          message,
          type: 'danger'
        })
      }
      this.loading = false
    },
    toCadastro () {
      this.$router.push({ name: 'registro' })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (window.uid) {
        vm.$router.push({ name: 'paginaGraficos' })
      }
    })
  }
}

</script>
<style lang="scss" scoped>
.form-login {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  h1 {
    font-size: 18pt;
  }
  .card {
    width: 30%;
    color: var(--darker);
  }
}

.cadastro {
  text-align: center;
  font-size: 11pt;
  .palavra{
    cursor: pointer;
    &:hover {
      color: var(--featured);
      font-weight: bold;
    }
  }
}
</style>
