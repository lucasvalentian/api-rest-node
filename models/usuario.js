const {Schema,model}=require('mongoose');

const UsuarioSchema=Schema({
    nombre:{
        type:String,
        required:[true,'El nombres es obligatorio']
    },
    correo:{
        type:String,
        required:[true,'El correo es obligatorio'],
        unique:true

    },
    password:{
        type:String,
        required:[true,'La Contraseña es obligatorio']
    },

    img:{
        type:String
    },
    rol:{
        type:String,
        required:[true,'El Rol es obligatorio'],
        emun:['ADMIN_ROLE','USER_ROLE']
    },
    estado:{
        type:Boolean,
        default:true
    },

    google:{
        type:Boolean,
        default:false
    },

});

//METODOS PARA VALIDAR
UsuarioSchema.methods.toJSON=function(){

    const {__v,password,_id,...usuario}=this.toObject();
    usuario.uid=_id

    return usuario
}


module.exports=model('Usuarios',UsuarioSchema);