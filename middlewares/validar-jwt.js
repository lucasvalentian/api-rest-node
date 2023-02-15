const { response, request } = require('express');
var jwt = require('jsonwebtoken');
const Usuario=require('../models/usuario');

const validarJWT= async(req=request,res=response,next)=>{
    //const token='';

    /*if(req && req.headers && req.headers.authorization) {
         token = req.headers.authorization.split(" ")[1];
       
    }*/
    const token=req.header('Authorization')?.split(" ")[1];
    //console.log(req.header('Authorization'));

    if(!token){

        return res.status(401).json({
            msg:'No hay token en la petición'
        });
    }



    try{
        

        const {uid}= jwt.verify(token,process.env.SECRETORPRIVATEKEY);

        //leer usuario
        const usuarioToken=await Usuario.findById(uid);

        //validar
        if(!usuarioToken){

            return res.status(401).json({
                msg:'Usuario no existe'
            });

        }

        //verificar si el usuario es true
        if(!usuarioToken.estado){

            return res.status(401).json({
                msg:'Usuario con estado false'
            })
        }

        req.usuarioToken=usuarioToken;
        


        next();

    }catch(err){

        console.log(err);
        res.status(401).json({
            msg:'Token no validado'
        })
    }

   
    
}

module.exports=validarJWT