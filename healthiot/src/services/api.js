import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: 'http://9ba05af69432.ngrok.io'
  })
}
