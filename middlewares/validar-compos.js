const { body,validationResult  } = require('express-validator');
const {response,request}=require('express');

const validarCampos=(req=response,res,next)=>{

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      next();

}


module.exports={

    validarCampos
}