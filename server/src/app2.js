const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.post('/users', (req, res) => {
	console.log('deu foi certo')
	res.send('deu certo ainda bem')
})

app.listen(4008)
