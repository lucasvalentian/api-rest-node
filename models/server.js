const express = require('express');
var cors = require('cors');
const { dbConnection } = require('../database/config');
const SocketsController = require('../sockets/SocketsController');


class Server{


    constructor(){

        this.app=express();
        this.port=process.env.PORT
        this.server=require('http').createServer(this.app)
        this.io=require('socket.io')(this.server)

        //url_direcciones
        this.paths={
            auth:'/api/auth',
            categorias:'/api/categorias',
            usuario:'/api/usuarios'


        }
        //this.usuariosRoutePath='/api/usuarios';
        //this.authPath='/api/auth';

        //CONECTAR A LA BASE DE DATOS
        this.conectarDB();
        //middleware
        this.middlewares();
        


        this.route();
        //evento sockets
        this.sockets();
    }

    async conectarDB(){

        await dbConnection();
    }

    middlewares(){

        //directorio publico
        this.app.use(express.static('public'));
        this.app.use(cors());
    }


    route(){

        this.app.use(this.paths.auth,require('../routes/auth'));
        this.app.use(this.paths.categorias,require('../routes/categorias'));
        this.app.use(this.paths.usuario,require('../routes/user'));
      
    }

    sockets(){
        this.io.on("connection", SocketsController);
    }

    listen(){

        this.server.listen(this.port,()=>{
           
            console.log('Servidor corriendo en puerto',this.port)
        });
    }


}


module.exports=Server