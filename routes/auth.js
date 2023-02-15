const { Router } = require("Express");
const bodyParser = require("body-parser");
const {check}=require('express-validator');
const { login, googleSingIn, renovarToken } = require("../controllers/login.controller");
//const { validarCampos } = require("../middlewares/validar-compos");
const { validarCampos, validarJWT } = require("../middlewares");

const route=Router();
const jsonParser = bodyParser.json();


route.post('/login',[jsonParser,
check('correo','El correo es obligatorio').isEmail(),
check('password','La contraseña es obligatoria').not().isEmpty(),
validarCampos
],login);

route.post('/google',[jsonParser,
    check('id_token','Token de google es necesario').not().isEmpty(),
    validarCampos
    ],googleSingIn);
    

route.get('/',[validarJWT],renovarToken);


module.exports=route;