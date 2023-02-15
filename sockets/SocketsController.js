const { Socket } = require("socket.io");
const { comprobarToken } = require("../helpers/generar-jwt");

const SocketsController=async(socket=new Socket())=>{

    const token= socket.handshake.headers['authorization'];

   const usuario= await comprobarToken(token);

   if(!usuario){
    return socket.disconnect();
   }

   console.log('Se conecto',usuario.nombre);
}


module.exports=SocketsController