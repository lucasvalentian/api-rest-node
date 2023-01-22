const { Router } = require("Express");
const bodyParser = require("body-parser");
const {check}=require('express-validator')


const { usuariosGet, 
    usuariosDelete, 
    usuariosPut, 
    usuariosPost } = require('../controllers/usuarios.controller');

const {validarCampos,validarJWT,esAdminRole,tieneRole}=require('../middlewares')

const { esRoleValido, esEmail, existeUsuario, validaractivoUser } = require("../helpers/db-validators");




    const route=Router();
    const jsonParser = bodyParser.json();

    route.get('/', usuariosGet);

    route.put('/:id',[jsonParser,
      check('id','No es un ID validad').isMongoId(),
      check('id').custom(existeUsuario),
      check('rol').custom(esRoleValido),
      validarCampos
    ]
    
    ,usuariosPut );

    route.delete('/:id',[jsonParser,validarJWT,
      //esAdminRole,
      //tieneRole('ADMIN_ROLE','USER_ROLE','VENTAS_ROLE'),
      check('id','No es un ID validad').isMongoId(),
      check('id').custom(existeUsuario),
      check('id').custom(validaractivoUser),
      validarCampos
    ],usuariosDelete );

    route.post('/',[jsonParser,check('correo','El correo no es validado').isEmail(),
                              check('nombre','El nombre es Obligatorio').not().isEmpty(),
                              check('correo').custom(esEmail),
                              //check('rol','No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
                              check('rol').custom(esRoleValido),
                              check('password','La contraseña es Obligatoria y debe ser mayor a 6 caracteres').not().isEmpty().isLength({ min: 5 }),
                              validarCampos]
                              
                              ,usuariosPost);



    module.exports = route;