
const {response,request}=require('express');
const bcryptjs=require('bcryptjs');
const Usuario=require('../models/usuario');
const { body,validationResult  } = require('express-validator');
const { esEmail } = require('../helpers/db-validators');
//METODO GET DE USUARIOS
const usuariosGet=async(req=request, res=response) => {

    const {limite=4}=req.query;
    const resp=await Promise.all([Usuario.countDocuments({estado:true}),
        Usuario.find({estado:true})
        .limit(Number(limite))]);

    res.json({
      // total,
      //usuarios
       resp
    });
    
}

//METODO DELETE DE USUARIOS
const usuariosDelete= async(req=request, res=response) => {

    const {id}=req.params;
    const usuario=await Usuario.findByIdAndUpdate(id,{estado:false});
    console.log(id);

    //const usuarioToken=req.usuarioToken;


    res.json({
        usuario//,
       // usuarioToken

    });
    
}
//METODO PUT
const usuariosPut= async(req,  res=response) => {

   const id=req.params.id;
   const { _id,password,google,correo,...resto}=req.body;

   //validar si la contraseña existe
   if( password ){

       const salt=bcryptjs.genSaltSync();
       resto.password=bcryptjs.hashSync(password,salt);
   }

   const usuario=await Usuario.findByIdAndUpdate(id,resto,{new:true});

    res.json({
        //msg:'Metodo Put',
        usuario
       
    });
    
}

//METODO POST
const usuariosPost= async(req,  res=response) => {

   

    const {nombre,correo,password,rol}=req.body;
    const usuario=new Usuario({nombre,correo,password,rol});
    
    //verificar si el correo existe
     
    //Encryptar la contraseña
    var salt = bcryptjs.genSaltSync(10);
    usuario.password=bcryptjs.hashSync(password,salt);

     await  usuario.save();

    res.json({
        
        usuario
    });
    
}





module.exports={

    usuariosGet,
    usuariosDelete,
    usuariosPut,
    usuariosPost
}