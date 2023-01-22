const { Router} = require("Express");
const bodyParser = require("body-parser");
const {check}=require('express-validator');
const { CategoriaPost, AllCategorias, CategoriSearhId, CategoriaUpdate } = require("../controllers/categorias.controller");
const { validarCampos, validarJWT } = require("../middlewares");
const { validarCategoriaIdExiste, validarCategoriaAactiva, ExisteNameCategoria } = require("../helpers/db-validators");


const route=Router();
const jsonParser = bodyParser.json();

//metodo get
route.get('/',AllCategorias);

route.get('/:id',[
    check('id','No es un ID validad').isMongoId(),
    check('id').custom(validarCategoriaIdExiste),
    check('id').custom(validarCategoriaAactiva),
    validarCampos
]
,CategoriSearhId)



//metod para crear una categoria
route.post('/',[jsonParser,validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
]

,CategoriaPost)

//metod para moficicar una categoria
route.put('/:id',[jsonParser,validarJWT,
    check('id','No es un ID validad').isMongoId(),
    //check('nombre').custom(ExisteNameCategoria),
    check('id').custom(validarCategoriaAactiva),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos

]

,CategoriaUpdate);


module.exports=route