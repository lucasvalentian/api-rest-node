
class Mensajes{

    constructor(uid,nombre,mensaje){
      
        this.uid=uid;
        this.nombre=nombre;
        this.mensaje=mensaje;
    }
}

class ChatMensajes{

    constructor(){
        this.mensajes=[];
        this.usuarios={};
    }

    get ultomo10(){

        this.mensajes=this.mensajes.splice(0,10);
        return this.mensajes;
    }

    get usuariosArr(){

        return Object.values(this.usuarios);
    }

    enviarMensaje(uid,nombre,mensaje){
         
          this.mensajes.unshift(
            new Mensajes(uid,nombre,mensaje)
          );

    }

    conectarUsuario(usuarios){

        this.usuarios[usuarios.id]=usuarios;
    }

    desconectarUsuario(id){

        delete this.usuarios[id];
    }
}

module.exports=ChatMensajes