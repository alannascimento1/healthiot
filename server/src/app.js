const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

var network = require('./fabric/network.js');

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.get('/getAll', (req, res) => {
  network.getAll()
    .then((response) => {      
        var Record = [JSON.parse(response[0]),JSON.parse(response[1])];  
	//var Record = response;
	console.log(JSON.parse(response[1]));
        res.send(Record)
      });
})

app.post('/createDatas', (req, res) => {
	let dado = req.body.data;
	let vECG = dado[0].Ecg.value;
	var res = vECG.split("&");
	network.createDatas('111.111.111-11','Patient', res[0], res[1], res[2]);
})

app.listen(8081)
