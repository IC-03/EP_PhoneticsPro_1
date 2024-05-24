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
    
    fetch('http://localhost:8094/api/Attempt/list')
        .then(response => response.json())
        .then( data => {
            document.getElementById('mostrarAttempt').innerHTML='';

            const listaIntentos = document.createElement('ul');

            var listaPorId = [];
            data.forEach(intento => {
                if(id==intento.id_user.id_user){
                    listaPorId.push(intento);
                }
            });


            var i=0;
            listaPorId.forEach(intento => {
                
                if(i<listaPorId.length){
                    for(j=i+1; j<= listaPorId.length-1; j++){
                        if(intento.date_attempt === listaPorId[j].date_attempt){ 

                            intento.total_attempt = intento.total_attempt + listaPorId[j].total_attempt;
                            intento.correct_attempt = intento.correct_attempt + listaPorId[j].correct_attempt;

                            listaPorId.splice(j, 1);
                            j=j-1;
                        }

                    };
                }
                                
                i=i+1;
            });
            
            // Con este array hay que trabajar la gráfica, ya tiene un registro por día
            console.log(listaPorId);

            listaPorId.forEach(intento => {
                    const itemLista = document.createElement('li');
                    itemLista.innerHTML = `Usuario: ${intento.id_user.name_user},<br> Fecha; ${formatoFecha(intento.date_attempt)},<br> Intentos: ${intento.total_attempt}, <br> Correctas: ${intento.correct_attempt} <br><br>`;
                    listaIntentos.appendChild(itemLista);
                
            });

            document.getElementById('mostrarAttempt').appendChild(listaIntentos);
        })
        .catch(error =>{
            console.error('error al cargar los intentos', error);
            alert('ha ocurrido un error, intente mas tarde');
        });
})


function formatoFecha(fecha) {
    const date = new Date(fecha);
    const year = date.getFullYear();
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate().toString();
    if (month.length === 1) {
        month = '0' + month;
    }
    if (day.length === 1) {
        day = '0' + day;
    }
    return `${year}-${month}-${day}`;
}