const form=document.querySelector('form');
    
    function handleCredentialResponse(response){

        const body={id_token:response.credential};

        fetch('http://localhost:8080/api/auth/google',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(body)
        })
        .then(resp =>resp.json())
        .then(resp=>{
            const {token,correo}=resp;
            localStorage.setItem('token',token)
           // localStorage.setItem('email',correo)
           
            console.log(resp);
            window.location='/chat.html';

        }).catch(console.warn);
      

    }

   //login con mi formulario
   form.addEventListener('submit',ev=>{

        ev.preventDefault();
        const formData={};

        for(let el of form.elements){

            if(el.name.length>0)
             formData[el.name]=el.value
        }

        console.log(formData);

        fetch('http://localhost:8080/api/auth/login',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(formData)
        })
        .then(resp =>resp.json())
        .then(resp=>{
           
           
            const {token}=resp;
            localStorage.setItem('token',token)
            window.location='/chat.html';
           
            console.log(token);


        }).catch(console.warn);


   }) 

    const button=document.getElementById('signout');

    button.onclick=()=>{

        console.log(google.accounts.id);
        google.accounts.id.disableAutoSelect();

        google.accounts.id.revoke(localStorage.getItem('token'), done=>{

            localStorage.clear();
            location.reload();
        })
    }