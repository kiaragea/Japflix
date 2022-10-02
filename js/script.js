let peliculasFiltradas = [];
let btnBuscar = document.querySelector('#btnBuscar')
let inputBuscar = document.querySelector('#inputBuscar')
let listado = document.querySelector('#lista')


document.addEventListener('DOMContentLoaded', async function () {

    const URL = 'https://japceibal.github.io/japflix_api/movies-data.json'
    async function obtenerCatalogo() {
        const catalogo = await fetch(URL)
        let data = await catalogo.json()
        return data
    }
    listaPeliculas = await obtenerCatalogo();
    
    
    function listaGeneros() {
        let generosFiltrados = '';
        for (const pelicula of listaPeliculas) {
            generosFiltrados = pelicula.genres
        }
        let listaGenerosFiltrados = '';
        for (const genero of generosFiltrados) {
             listaGenerosFiltrados += `
            <div>
            <p>${genero.name}
            </p>
          </div> `
        }
        return listaGenerosFiltrados
    }


    function crearEstrellas(score) {
        let result = "";
        
        for (let i = 0; i < 5; i++)
            result += `<span class="fa fa-star ${i < Math.floor(score) ? 'checked' : ''}"></span>`;
        return result;
    }

    function showPeliculas() {

        for (const pelicula of listaPeliculas) {
            if (pelicula.title.toLowerCase().includes(inputBuscar.value.toLowerCase())) {
                peliculasFiltradas.push(pelicula)
            }

        }
    }

    btnBuscar.addEventListener('click', () => {
        // limpia la lista
        peliculasFiltradas = [];
        // limpia el HTML
        listado.innerHTML = '';
        showPeliculas();
        for (const pelicula of peliculasFiltradas) {
            listado.innerHTML += `
            <div onclick='cajita(${pelicula.id})' data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop" class="list-group-item">
                <div>
                <h3>${pelicula.title}</h3>
                </div>
                <div>
                <p>${pelicula.tagline}
                </p>
                </div>
                <div>
                    
                </div>
                <div>
                    ${crearEstrellas(pelicula.vote_average/2)}
                </div>
            </div>`
        };
    });

    
})


function cajita(id) {
    let pelicula = peliculasFiltradas.find(elemento => {
        return elemento.id === id
    })
    document.querySelector('#cajitaTitulo').innerHTML = pelicula.title
    document.querySelector('#cajitaDescripcion').innerHTML = pelicula.overview
    document.querySelector('#cajitaGenero').innerHTML = `<hr> Generos: ${pelicula.genres[0].name} - ${pelicula.genres[1].name} - ${pelicula.genres[2].name}`
    
        
    document.querySelector(`#cajitaMore`).innerHTML = `<br>
        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        More
      </button>
      <ul class="dropdown-menu">
        <li><p>Year: ${pelicula.release_date.slice(0,4)}</p></li>
        <li><p>Runtime: ${pelicula.runtime}</p></li>
        <li><p>Budget: $${pelicula.budget}</p></li>
        <li><p>Revenue: $${pelicula.revenue}</p></li>
      </ul>`
}


