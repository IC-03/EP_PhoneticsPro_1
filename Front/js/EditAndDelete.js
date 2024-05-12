let usuario= null;
document.addEventListener('DOMContentLoaded', function(){
    const home = document.getElementById('Home');

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const dirHome = 'http://localhost:8094/api/Users/list/' + id;

    fetch(dirHome)
        .then(response => response.json())
        .then( data => {
            usuario = data;
            home.href = '../html/home.html?id=' + id;
        });
})



const dir = "http://localhost:8094/api/Users/"

function editarPerfil(){

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    let name_user = document.getElementById('name_user').value;

    if(name_user==''){
        name_user = usuario.name_user;
    }

    let email = document.getElementById('email').value;

    if(email==''){
        email = usuario.email;
    }

    let password_user = document.getElementById('password_user').value;

    if(password_user==''){
        password_user = usuario.password_user;
    }

    var datosActualizados = {'id_user': parseInt(id), 'email': email, 'password_user': password_user, 'name_user': name_user};
    
    const comprobarContr = document.getElementById('contVieja').value;
    if(comprobarContr == usuario.password_user){
        fetch(dir, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(datosActualizados)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo realizar la actualizacion');
            }
            return response.json();
        })
        .then(data => {
            console.log('Usuario actualizado con éxito:', data);
            window.location = '../html/perfil.html?id=' + data.id_user;
        })
        .catch(error => {
            console.error('Error al actualizar el usuario:', error);
            alert('Ha ocurrido un error al actualizar el usuario');
        });

    }else{
        return alert("Su antigua contraseña no coincide");
    }

}

function borrarPerfil(){
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const datoABorrar = dir + id;

    let seguro = document.getElementById('seguroBorrar');

    if(seguro.checked){
        const comprobarContr = document.getElementById('contVieja').value;
        if(comprobarContr == usuario.password_user){

            fetch('http://localhost:8094/api/Attempt/list')
            .then(response => response.json())
            .then( data => {
                data.forEach(intento => {
                    if(id==intento.id_user.id_user){
                        //aqui el codigo para eliminar attempts
                        fetch('http://localhost:8094/api/Attempt/'+intento.id_attempt, {
                            method: 'DELETE'
                        })
                    }   
                });
                
                fetch(datoABorrar, {
                    method: 'DELETE'
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('No se pudo borrar la cuenta');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Usuario borrado con éxito:');
                    window.location = '../html/home.html';
                })
                .catch(error => {
                    console.error('Error al borrar usuario:', error);
                    alert('Ha ocurrido un error al borrar el usuario');
                })


            })
            .catch(error =>{
                console.error('error al borrar las palabras', error);
                alert('ha ocurrido un error, intente mas tarde');
            });
        }else{
            return alert("Su antigua contraseña no coincide");
        }
    }else{
        return alert("No ha marcado la casilla de estar seguro");
    }

}