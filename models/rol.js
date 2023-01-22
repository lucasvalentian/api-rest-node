const {Schema,model}=require('mongoose');

const rolSchema=Schema({
    rol:{
        type:String,
        required:[true,'El rol es Obligatorio']
    }

});


module.exports=model('Role',rolSchema);