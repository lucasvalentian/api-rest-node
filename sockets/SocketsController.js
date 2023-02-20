const { Socket } = require("socket.io");
const { comprobarToken } = require("../helpers/generar-jwt");
const {ChatMensajes}=require('../models');

const chatmensaje=new ChatMensajes();

const SocketsController=async(socket=new Socket(),io)=>{

    const token= socket.handshake.headers['authorization'];

   const usuario= await comprobarToken(token);

   if(!usuario){
    return socket.disconnect();
   }

   chatmensaje.conectarUsuario(usuario);

   io.emit('usuarios-activos',chatmensaje.usuariosArr)

   socket.on('disconnect',()=>{
         
    chatmensaje.desconectarUsuario(usuario.id);
    io.emit('usuarios-activos',chatmensaje.usuariosArr);


   });

   socket.on('enviar-mensaje',({uid,mensaje})=>{
       
          chatmensaje.enviarMensaje(usuario.id,usuario.nombre,mensaje);
          io.emit('recibir-mensajes',chatmensaje.ultomo10);
   })

   

  // console.log('Se conecto',usuario.nombre);
}


module.exports=SocketsController