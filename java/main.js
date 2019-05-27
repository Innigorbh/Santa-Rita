
// lightbox
var lightbox = document.querySelector('#lightbox');


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// contentful
const client = contentful.createClient({
  space: "k7155kcoqgzm",
  accessToken: "gaUf4zxcoTSAyzuguatDFPOm0EMM_P69axyIQ_dby48"
});


// 1 Query para preguntar cuantas categorias Hay
// 2 Hacer una query por cada categoria con un máximo de 3 elementos

client.getEntries({
    include: 9,
    'content_type': 'categorias'
  })
  .then(function(response) {
    // Guardamos contenedor donde vamos a poner el HTML
    var container = document.querySelector('#container');
    // Mostramos la respuesta de Contentful
    // console.log(response.items)

    // Bucle para iterar sobre las categorias;
    for (item of response.items) {
      // Guardamos informacion de las categorias
      var categoria = item.fields.url;
      var categoriaNombre = item.fields.nombre;
      var categoriaDescripcion = item.fields.descripcion;

      // Guardamos colección de fotos de cada categoria
      var fotos = item.fields.fotos;

      if (window.location.href.includes('productos.html')) {
        var maxFotos = fotos.length;
      } else {
        var maxFotos = 3;
      }

      // Bucle para iterar sobre la colección de fotos
      // Para mostrar todos : fotos.length
      for (var i = 0; i < maxFotos; i++) {
        // Mostramos cada foto
        // console.log('foto:',fotos[i])
        // Comprobamos que hay más fotos en el array (Por si hay menos de 3)
        if (fotos[i]) {
          // Guardar la información de cada foto de cada categoria
          var url = fotos[i].fields.foto.fields.file.url;
          var alt = fotos[i].fields.foto.fields.description;
          var descripcion = fotos[i].fields.descripcion;

          // Creamos el HTML de cada foto
          var foto = document.createElement('li')
          var enlace = document.createElement('a')
          enlace.innerHTML = `<figure style="background-image: url('http:${url}')"></figure>`;
          foto.appendChild(enlace);
          // Añadirlo al HTML de forma dinámica
          var contenedorCategoria = document.querySelector(`#${categoria}`);
          if (contenedorCategoria) {

            enlace.setAttribute('href', '#');

            contenedorCategoria.appendChild(foto);
          } else {
            var listElement = document.createElement('li');

            var section = document.createElement('div');

            var sublistContainer = document.createElement('ul');
            sublistContainer.setAttribute('id', categoria);

            if (window.location.href.includes('productos.html')) {
              var titulo = document.createElement('p');
              titulo.innerHTML = `${categoriaNombre}`
              listElement.appendChild(titulo);
              titulo.setAttribute('class', 'titulo2');
            }

            section.setAttribute('class', 'fotos ' + categoria);
            //section.innerHTML = `<h2>${categoriaNombre}</h2>
            //                    <p>${categoriaDescripcion}</p>`;


            enlace.setAttribute('href', '#');
            sublistContainer.appendChild(foto);
            section.appendChild(sublistContainer);

            listElement.appendChild(section);
            container.appendChild(listElement);


            if (!window.location.href.includes('productos.html')) {
              var button = document.createElement('p');
              button.setAttribute('class', 'boton');
              button.innerHTML = `<a href="productos.html#${categoria}">${categoriaNombre}</a>`
              section.appendChild(button);
            }

          }

        }
      }

    }

  })
  .then(function() {
    var anchor = location.hash;
    if(anchor){
      document.querySelector(anchor).scrollIntoView({
        behavior: 'smooth'
      })
    }

    document.querySelectorAll('.fotos li a').forEach(item => {
      item.addEventListener('click', function(e) {
        e.preventDefault();
        if (!lightbox.classList.contains('show')) {
          lightbox.classList.add('show');
          var image = this.firstElementChild.style.backgroundImage.slice(4, -1).replace(/['"]/g, "")
          lightbox.innerHTML = `<figure><img src="${image}" /></figure>`;
        }
      });
    });
  })

  lightbox.addEventListener('click', function(e){
    lightbox.innerHTML = '';
    lightbox.classList.remove('show');
  })




//
