const express = require('express')
const routerApi = require('./routes')
const cors = require('cors')

const {logErrors, errorHandler, boomErrorHandler} = require('./middlewares/error.handler')


const app = express()
const port = 3000;

app.use(express.json())

const whiteList = ['http://localhost:8080', 'https://myapp.com.py']
const options = {
    origin: (origin, callback) => {
        if(whiteList.includes(origin)){
            callback(null, true)
        }else{
            callback(new Error('No permitido'))
        }
    }
}


app.use(cors())

app.get('/api', (req, res) => {
    res.send('Hola mi server en express')
})

app.get('/api/nueva-ruta', (req, res)=> {
    res.send('Hola soy una nueva ruta')
})


routerApi(app)

app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)


app.listen(port, () => {
    console.log('Mi port' + port)
})



