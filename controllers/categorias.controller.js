const {response,request}=require('express');
const Categoria=require('../models/categoria.modelo');


const AllCategorias=async(req=request,res=response)=>{

    const {limite=4,desde=0}=req.query;
    const data=await Promise.all([Categoria.countDocuments({estado:true}),
        Categoria.find({estado:true})
        .populate('usuario','nombre')
        .skip(Number(desde))
        .limit(Number(limite))]);

    res.json({
        data
    })
}

//buscar una categoria por id
const CategoriSearhId=async(req=response,res=response)=>{

    const {id}=req.params

    const data=await Categoria.findById({_id:id}).populate('usuario','nombre');
    

    res.status(201).json({
        data
    })
}

const CategoriaPost=async(req=request,res=response)=>{

    const nombre=req.body.nombre.toUpperCase();

    //validar si ya existe la categoria
    const categoriaDB=await Categoria.findOne({nombre})

    if(categoriaDB){

        return res.status(400).json({
            msg:'La categoria ya existe'
        })
    }

    //GENERAR LA DATA PARA GUARDAR
    const data={
        nombre,
        usuario:req.usuarioToken._id

    }

    const categoria=new Categoria(data);
    await categoria.save();

    console.log(nombre);

    res.status(201).json({
        categoria
    })

       
}

//metodo para modificar una categorias
const CategoriaUpdate=async(req=request,res=response)=>{

    const {id}=req.params
    const {usuario,estado,...resto}=req.body

    

        resto.nombre=resto.nombre.toUpperCase();
        resto.usuario=req.usuarioToken._id


        const data=await Categoria.findByIdAndUpdate(id,resto,{new:true}).populate('usuario','nombre');
        // categoria.populate('usuario','nombre')

        res.status(200).json({

            data
        })

   

 

    

    
}

//metodo para anular una categoria


module.exports={
    AllCategorias,
    CategoriaPost,
    CategoriSearhId,
    CategoriaUpdate
}