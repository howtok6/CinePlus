document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.filtro-ciudad-link');
  const peliculas = document.querySelectorAll('.pelicula');

  // Mostrar todas las películas al cargar la página
  peliculas.forEach(peli => {
    peli.style.display = '';
  });

  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const ciudad = link.getAttribute('data-ciudad');

      peliculas.forEach(peli => {
        const ciudades = peli.getAttribute('data-ciudad').split(',');
        if (ciudad === 'todas' || ciudades.includes(ciudad)) {
          peli.style.display = '';
        } else {
          peli.style.display = 'none';
        }
      });
    });
  });

  // Manejar el cambio entre "En cartelera" y "Próximos estrenos"
  const btnCartelera = document.getElementById('btn-cartelera');
  const btnEstrenos = document.getElementById('btn-estrenos');
  const seccionCartelera = document.querySelector('.peliculas');
  const seccionEstrenos = document.getElementById('proximos-estrenos');

  btnCartelera.addEventListener('click', () => {
    seccionCartelera.style.display = '';
    seccionEstrenos.style.display = 'none';
    btnCartelera.classList.add('activo');
    btnEstrenos.classList.remove('activo');
  });

  btnEstrenos.addEventListener('click', () => {
    seccionCartelera.style.display = 'none';
    seccionEstrenos.style.display = '';
    btnEstrenos.classList.add('activo');
    btnCartelera.classList.remove('activo');
  });
});