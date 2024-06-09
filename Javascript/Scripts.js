
 // Función para cargar artistas reconocidos en tarjetas cada una con dos obras que subí y sus titulos
 fetch('artistas_reconocidos.json')
    .then(response => response.json())
    .then(data => {
      
        const ArtistasReconocidos = data.artistas_reconocidos;
        const ArtistasReconocidosContainer = document.getElementById('artistas-reconocidos');
        ArtistasReconocidos.forEach(artist => {
            const artistCard = document.createElement('div');
            artistCard.className = 'col-md-4 artista-card';
            artistCard.innerHTML = `
                <div class="card mb-4">
                    <div class="card-body">
                        <h5 class="card-title">${artist.nombre}</h5>
                        <img src="${artist.foto}" class="card-img-top foto-artista" alt="${artist.nombre}">
                        <div class="artista-obras">
                        <h5 class="text-center">Las obras más conocidas</h5>
                            ${artist.obras.map(obra => `
                              
                                <div class="obra">
                                   <a href="${obra.info}"> <img src="${obra.imagen_url}" alt="${obra.titulo}" ></a>
                                    <p class="text-center">${obra.titulo}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
            ArtistasReconocidosContainer.appendChild(artistCard);
        });
    })

    document.addEventListener('DOMContentLoaded', function () {
        // Cargar arte guardado en local storage cuando se abre la página
         CargarArte();
    
        // Maneja el evento submit del formulario
        document.getElementById('subirarte').addEventListener('submit', function (event) {
            event.preventDefault();
    
            var title = document.getElementById('art-title').value;
            var fileInput = document.getElementById('art-file');
            var file = fileInput.files[0];
    
            if (file) {
                var reader = new FileReader();
    
                reader.onload = function (e) {
                    // Crea un objeto que toma como valor el nombre que pusimos en título de la obra y la dirección de la imagen
                    var art = {
                        title: title,
                        src: e.target.result
                    };
    
                    // devuelve el array de arte cargado o lo inicia vacío
                    var arteCargado = JSON.parse(localStorage.getItem('arteSubido')) || [];
    
                    // Añade una imagen que subamos al array
                    arteCargado.push(art);
    
                    // Guarda el array en el local storage
                    localStorage.setItem('arteSubido', JSON.stringify(arteCargado));
    
                    // Actualiza si cargamos una imagen en el formulario
                    MostrarArte(art);
                    document.getElementById('arte-guardado').style.display = 'block';
    
                    // limpia el formulario luego de subir algo
                    document.getElementById('subirarte').reset();
                };
    
                reader.readAsDataURL(file);
            }
        });
    // Carga las imagenes guardadas en local storage al abrir la página
        function CargarArte() {
            var arteCargado = JSON.parse(localStorage.getItem('arteSubido')) || [];
            if (arteCargado.length > 0) {
                arteCargado.forEach(MostrarArte);
                document.getElementById('arte-guardado').style.display = 'block';
            }
        }
    // Crea las tarjetas para mostrar las imagenes que subamos con sus atributos
        function MostrarArte(art) {
            var container = document.getElementById('contenedor-arte');
            var col = document.createElement('div');
            col.className = 'col-md-4';
            col.innerHTML = `
                <div class="card mb-4 shadow-sm">
                    <img src="${art.src}" class="card-img-top" alt="${art.title}">
                    <div class="card-body">
                        <p class="card-text">${art.title}</p>
                    </div>
                </div>
            `;
            container.appendChild(col);
        }
    });



    