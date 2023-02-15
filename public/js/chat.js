let usuario=null;
let socket=null;


//validar el token 

const validarJWT=async()=>{

    const token=localStorage.getItem('token') || '';

    console.log(token);

    if(token.length<=10){

        window.location='index.html';
        throw Error('No hay token valido');
    }

    const resp= await  fetch('http://localhost:8080/api/auth',{
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token
          }
    });

   // const{usuario:userDb,tokenDB}=await resp.json();
   const  {usuarioToken,token:tokendb}=await resp.json();

    console.log(usuarioToken,tokendb);
    usuario=usuarioToken;
    document.title=usuario.nombre
     
    await connectarsocket();
    //
}

const connectarsocket=async()=>{
    const socket=io({
        'extraHeaders':{
            'Authorization':localStorage.getItem('token')
        }
    });


}


const main=async()=>{

    //validar el json web token
    await validarJWT();

}




main();



//const socket=io();