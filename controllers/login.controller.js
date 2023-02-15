const {response,request}=require('express');
const bcryptjs=require('bcryptjs');
const Usuario=require('../models/usuario');
const {generarJWT} = require('../helpers/generar-jwt');
const { googleverify } = require('../helpers/google-verify');


const login=async(req=request,res=response)=>{

    const {correo,password}=req.body;

    

    try{

        const usuario=await Usuario.findOne({correo});

        if(!usuario){

            return res.status(400).json({
                masg:'Usuario no Existe'
            })
        }

        if(!usuario.estado){

            return res.status(400).json({
                masg:'Usuario no Existe'
            })
        }

        //verificar contraseña
        const validarPassword=bcryptjs.compareSync(password,usuario.password);
        if(!validarPassword){

            return res.status(400).json({
                masg:'Contraseña Incorrecta'
            })

        }

        //GENERAR EL TOKEN
        const token=await generarJWT(usuario.id);

   

        res.json({
                usuario,
                token
        })
    

    }catch(error){
        return  res.json({

            msg:'Error'
            
            })

    }

}

const googleSingIn=async(req=request,res=response)=>{

    const {id_token}=req.body


    try{
        
        const {nombre,img,correo}=await  googleverify(id_token);

        console.log(correo);
        
        let usuario=await Usuario.findOne({correo});

       

        if(!usuario){

            const data={
                nombre,
                img,
                correo,
                password:':P',
                google:true,
                rol:'USER_ROLE'
            }

            usuario=new Usuario(data);

           
            //await usuario.save();
            await  usuario.save();

            console.log(usuario)
        }

        //si el usuario en DB  esta en false

        if(!usuario.estado){

            return res.status(401).json({
                msg:'Habe con el administrador, usuario bloqueado'
            })
        }

        //generar el token
        const token=await generarJWT(usuario.id);




        

        res.json({
           usuario,
           token
        })


    }catch(err){

        res.status(500).json({
            ok:false,
            msg:'El token no se pudo verificar',
            err
        })


    }

   


}
const renovarToken=async(req=request,res=response)=>{

    const {usuarioToken}=req
         //GENERAR EL TOKEN
         const token=await generarJWT(usuarioToken.id);

    res.json({
        usuarioToken,
        token
    })

}


module.exports={

    login,
    googleSingIn,
    renovarToken


}