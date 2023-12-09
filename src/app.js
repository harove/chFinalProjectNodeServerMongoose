import express from 'express'
import { apiRouter } from './routers/api.router.js'
import handlebars from 'express-handlebars'
import { webRouter } from './routers/web.Router.js'
import {Server} from 'socket.io'
import { productsManager } from './services/productsManager.js'

// import {  } from './midlewares/midlewares.js'

const app = express()

//motor de plantillas
app.engine('handlebars', handlebars.engine())
app.set('views', './views')

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static('./public'))
app.use(express.static('./views'))
app.use('/static', express.static('./static'))

const server = app.listen(8080, ()=> {console.log('conectado')})

const websocketServer = new Server(server)

app.use((req,res,next)=>{
    res['newProduct'] = async()=>{
        const products = await productsManager.findAll()
        websocketServer.emit('newProduct', {products} )
    }
    next()
})


//Routers
app.use('/api',apiRouter)
app.use('/',webRouter)



app.use((req, res, next) => {
    res.status(404).send('Not Found');
});



websocketServer.on('connection', (socket)=>{
    console.log(socket.id)
})