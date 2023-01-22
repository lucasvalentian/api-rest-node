const  validarCampos = require("../middlewares/validar-compos");
const validaroles= require("../middlewares/validar-roles");
const validarJWT = require("../middlewares/validar-jwt");


module.exports={
    ...validaroles,
    ...validarCampos,
    validarJWT

}