let usuario=null;
let socket=null;

//referencias de los id del html5
const textid=document.querySelector('#textid');
const textmensaje=document.querySelector('#textmensaje');
const usuarioslista=document.querySelector('#usuarios');
const ultimoMensajes=document.querySelector('#ultimoMensajes');
const btnsalir=document.querySelector('#btnsalir');

//validar el token 

const validarJWT=async()=>{

    const token=localStorage.getItem('token') || '';

    //console.log(token);

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

    //console.log(usuarioToken,tokendb);
    usuario=usuarioToken;
    document.title=usuario.nombre
     
    await connectarsocket();
    //
}

const connectarsocket=async()=>{
     socket=io({
        'extraHeaders':{
            'Authorization':localStorage.getItem('token')
        }
    });

    socket.on('connect',()=>{
            console.log('Socket online')
    });

    socket.on('disconnect',()=>{
        console.log('Socket Offline')
        });

    socket.on('recibir-mensajes',mensajesdata);

    socket.on('usuarios-activos',mostrarUsuarios);

    socket.on('mensajes-privado',()=>{

    });




}

const mostrarUsuarios=(usuarios=[])=>{

    let html='';
    //console.log(usuarios);
    usuarios.forEach(({nombre,uid})=>{
        
        html +='<li>';
        html +='<p>  <h5 class="text-success">'+nombre+'</h5>';
        html +='<span class="fs-6 text-muted">'+uid+'</span>';
        html +='</p>';
        html +='</li>';
    });

    usuarioslista.innerHTML=html;

}

const mensajesdata=(mensajes=[])=>{

    let html='';
    //console.log(usuarios);
    mensajes.forEach(({nombre,mensaje})=>{
        
        html +='<li>';
        html +='<p>  <h5 class="text-success">'+nombre+'</h5>';
        html +='<span class="fs-6 text-muted">'+mensaje+'</span>';
        html +='</p>';
        html +='</li>';
    });

    ultimoMensajes.innerHTML=html;

}

textmensaje.addEventListener('keyup',({keyCode})=>{

    const mensaje=textmensaje.value;
    const uid=textid.value;
       
   if(keyCode!==13){ return; }
   if(mensaje.length===0){return;}

   socket.emit('enviar-mensaje',{mensaje,uid});

   console.log(mensaje);


});


const main=async()=>{

    //validar el json web token
    await validarJWT();

}




main();



//const socket=io();