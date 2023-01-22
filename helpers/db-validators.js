const Role=require('../models/rol');
const Usuario=require('../models/usuario');
const Categoria=require('../models/categoria.modelo');

const  esRoleValido=async(rol='') =>{

    const existeRol=await Role.findOne({rol});
    if(!existeRol){

        throw new Error('El rol '+rol+' No esta registrado en la base de datos');
    }

  }

  const esEmail=async(correo='')=>{

        const existeEmail=await Usuario.findOne({correo});
        
        if(existeEmail){

            throw new Error('El correo '+correo+' ya esta registrado ');
        }

  }

  const existeUsuario=async(id)=>{

    const existeUsuario=await Usuario.findById(id);
    if(!existeUsuario){

        throw new Error('El id '+id+' No existe ');
    }

  
}

const validaractivoUser=async(id)=>{

  const existeUsuario=await Usuario.findById(id);

  if(!existeUsuario.estado){

    throw new Error('El id '+id+' ya fue eliminado ');
    
  }

}

//VALIDAR SI EXISTE LA CATEGORIA
const validarCategoriaIdExiste=async(id)=>{

  const data=await Categoria.findById(id);

    if(!data){

      throw new Error('El id '+id+' No existe ');
      
    }
}
//validar si la categoria existe

const validarCategoriaAactiva=async(id)=>{

  const data=await Categoria.findById(id);

  if(!data.estado){

    throw new Error('El id '+id+' ya fue eliminado ');

  }


}

//validor si exsite la categoria en otro id
const ExisteNameCategoria=async(nombre)=>{

  const data=await Categoria.findOne({nombre});

  if(data.nombre){

    throw new Error('La categoria '+nombre+' ya existe ');

  }

      
}



  module.exports={
    esRoleValido,
    esEmail,
    existeUsuario,
    validaractivoUser,
    validarCategoriaIdExiste,
    validarCategoriaAactiva,
    ExisteNameCategoria
  }