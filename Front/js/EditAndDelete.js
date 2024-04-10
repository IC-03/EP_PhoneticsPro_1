let usuario= null;
document.addEventListener('DOMContentLoaded', function(){
    const home = document.getElementById('Home');

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const dirHome = 'http://localhost:8094/api/Users/list/' + id;

    console.log(dirHome)
    fetch(dirHome)
        .then(response => response.json())
        .then( data => {
            usuario = data;
            home.href = '../html/home.html?id=' + id;
        });
})



const dir = "http://localhost:8094/api/Users/"

function editarPerfil(){

    console.log(usuario);
}

function borrarPerfil(){


}