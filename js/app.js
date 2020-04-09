// codigo de funcionalidad
import { API }  from './api.js';
import * as UI from './interfaz.js';


UI.formularioBuscar.addEventListener('submit', (e) => {
    e.preventDefault();

    // en esta parte se recomienda exportar los datos que son estaticos
    // NO importamos las variables directamente
    const artista = document.querySelector('#artista').value,
        cancion = document.querySelector('#cancion').value;

    // control de campos vacios
    if(artista === '' || cancion === ''){
        UI.divMensajes.innerHTML = 'Error... Todos los campos son obligatorios';
        UI.divMensajes.classList.add ('error');
        setTimeout(() => {
            UI.divMensajes.innerHTML = '';
            UI.divMensajes.classList.remove('error');
        }, 3000);
    } else {
        // formulario se completo, realizar consulta en API
        const api = new API(artista, cancion);
        api.consultarAPI()
            .then(data => {
                // console.log(data);
                if(data.respuesta.lyrics){
                    // console.log('existe');
                    // console.log(data);
                    const letra = data.respuesta.lyrics;
                    UI.divResultado.textContent = letra;
                } else {
                    // console.log('no existe')
                    // la cancion no exsite
                    UI.divMensajes.innerHTML = 'La cancion no existe, proba con otra búsqueda';
                    UI.divMensajes.classList.add ('error');
                    setTimeout(() => {
                        UI.divMensajes.innerHTML = '';
                        UI.divMensajes.classList.remove('error');
                        UI.formularioBuscar.reset();
                    }, 3000);
                }
            })
    }
})