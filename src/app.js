import express from 'express'
import { apiRouter } from './routers/api.router.js'
import handlebars from 'express-handlebars'
import { webRouter } from './routers/web.Router.js'
import {Server} from 'socket.io'
// import { productsManager } from './dao/productsManager.js'
import { productsManager } from './dao/index.js'
import { mensajesManager } from './dao/mensajesManager.js'

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

const webSocketServer = new Server(server)

app.use((req,res,next)=>{
    res['newProduct'] = async()=>{
        // const products = await productsManager.findAll()
        const products = await productsManager.find().lean()
        webSocketServer.emit('newProduct', {products} )
    }
    next()
})


//Routers
app.use('/api',apiRouter)
app.use('/',webRouter)



app.use((req, res, next) => {
    res.status(404).send('Not Found');
});


webSocketServer.on('connection', async (socket) => {
    console.log(socket.id)
    console.log(socket.handshake.auth.username)
    socket.broadcast.emit('nuevoUsuario', socket.handshake.auth.username)

    socket.emit('mensajes', await mensajesManager.findAll())

    socket.on('mensaje', async mensaje => {
        console.log({mensaje})
        await mensajesManager.create({ 
            usuario: socket.handshake.auth.username, 
            texto: mensaje.mensaje })

        webSocketServer.emit('mensajes', await mensajesManager.findAll())
    })


    socket.on('disconnecting', () => {
        socket.broadcast.emit('usuarioDesconectado', socket.handshake.auth.username)
    })
})