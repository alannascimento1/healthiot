import Api from '@/services/api'

export default {
  getAll () {
    return Api().get('getAll')
  },
  createDatas (id, cpf, name, data, idade, informacao) {
    return Api().post('createDatas', {
      id: id,
      cpf: cpf,
      name: name,
      data: data,
      idade: idade,
      informacao: informacao
    })
  }
}
