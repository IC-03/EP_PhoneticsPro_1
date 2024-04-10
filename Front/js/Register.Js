const dir = "http://localhost:8094/api/Users/"

function registrarUsuario(){
    var email = document.getElementById('email').value;
    var password_user = document.getElementById('password-field').value;
    var name_user = document.getElementById('name_user').value;

    var datosRegistro = {'email': email, 'password_user': password_user, 'name_user': name_user};
    console.log(datosRegistro);

    fetch(dir, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(datosRegistro)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('No se pudo registrar el usuario');
        }
        return response.json();
    })
    .then(data => {
        console.log('Usuario registrado con éxito:', data);
        window.location = "../html/home.html";

    })
    .catch(error => {
        console.error('Error al registrar el usuario:', error);
        alert('Ha ocurrido un error al registrar el usuario');
    });
}