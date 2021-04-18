<template>
  <div>
    <div class="error" v-if="error">{{error.message}}</div>
    <form @submit.prevent="pressed()" class="form-cadastro">
      <div class="card">
      <div class="card-header text center">
        <h1 class="mb-0">Expenses - Cadastro</h1>
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
            Cadastar
           <i class="fa fa-sign-in-alt"></i>
          </template>
          <template v-else >
            Cadastrando
            <i class="fa fa-spinner fa-spin"></i>
          </template>

        </button>
      </div>
      <div class="goLogin"><label class="goLogin2" @click="toLogin()">Ir para Login</label></div>

    </div>
    </form>
  </div>
</template>

<script>

export default {
  name: 'Register',
  data: () => {
    return {
      email: '@gmail.com',
      password: '',
      error: ''
    }
  },
  methods: {
    pressed () {
      this.$firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(() => {
        this.$router.push({ name: 'login' })
      }).catch(error => (this.error = error))
    },
    toLogin () {
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style lang="scss" scoped>
.form-cadastro {
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

.goLogin {
  text-align: center;
  font-size: 11pt;
  .goLogin2{
    cursor: pointer;
    &:hover {
      color: var(--featured);
      font-weight: bold;
    }
  }
}
</style>
