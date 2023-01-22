
const mongoose=require('mongoose');

const dbConnection=async()=>{

    try {

       await mongoose.connect(process.env.MONGO_ATLAS);

       console.log('Base de datos Online');
        
    } catch (error) {
        
        console.log(error);
        throw new Error('Error al Iniciar la base de datos');
    }

}



module.exports={

    dbConnection
}