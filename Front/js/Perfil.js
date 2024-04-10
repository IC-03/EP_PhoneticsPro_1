let usuario= null;
document.addEventListener('DOMContentLoaded', function(){
    const home = document.getElementById('Home');
    const editLink = document.getElementById('editLink'); 
    const name_user = document.getElementById('name_user');

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const dir = 'http://localhost:8094/api/Users/list/' + id;

    fetch(dir)
        .then(response => response.json())
        .then( data => {
            usuario = data;
            home.href = '../html/home.html?id=' + id;
            name_user.textContent = usuario.name_user;
            if (editLink && id) {
                editLink.href = '../html/edit.html?id=' + id;
            }
        });
        
})