const { request, response } = require("express")



const esAdminRole=(req=request,res=response,next)=>{

    if(!req.usuarioToken){

        return res.status(500).json({
            msg:'Se requiere verificar el token primeramente'
        })
    }

    const {rol,nombre}=req.usuarioToken;

    if(rol!=='ADMIN_ROLE'){

        return res.status(401).json({
            msg:nombre+' no es administrador - no puede realizar cambios'
        })

    }

}

const tieneRole=(...roles)=>{

      return (req=request,res=response,next)=>{

        if (!req.usuarioToken){

            return res.status(500).json({
                msg:'Se requiere verificar el token primeramente'
            });

         }

         if(roles.includes(req.usuarioToken.rol)){

            return res.status(401).json({
                msg:'El servicio requiere uno de estos roles'+roles
            })
         }




        next();

      }

}


module.exports={
    esAdminRole,
    tieneRole
}