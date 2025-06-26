document.addEventListener('DOMContentLoaded', () => {
  const filas = ['A', 'B', 'C', 'D', 'E'];
  const columnas = 8;
  const selector = document.getElementById('selector-asientos');
  const cantidad = document.getElementById('cantidad');
  const reservarBtn = document.getElementById('reservar-btn');

  const asientosOcupados = ['A3', 'B5', 'D1']; // Simula base de datos
  const asientosSeleccionados = [];

  // Crear asientos dinámicamente
  filas.forEach(fila => {
    const divFila = document.createElement('div');
    divFila.classList.add('fila');

    for (let i = 1; i <= columnas; i++) {
      const asiento = document.createElement('div');
      const id = `${fila}${i}`;
      asiento.classList.add('asiento');
      asiento.textContent = i;

      if (asientosOcupados.includes(id)) {
        asiento.classList.add('ocupado');
      } else {
        asiento.addEventListener('click', () => {
          asiento.classList.toggle('seleccionado');
          const index = asientosSeleccionados.indexOf(id);
          if (index === -1) {
            asientosSeleccionados.push(id);
          } else {
            asientosSeleccionados.splice(index, 1);
          }
          cantidad.textContent = asientosSeleccionados.length;
        });
      }

      asiento.setAttribute('data-id', id);
      divFila.appendChild(asiento);
    }

    selector.appendChild(divFila);
  });

  // Función de reserva
  reservarBtn.addEventListener('click', () => {
    if (asientosSeleccionados.length === 0) {
      alert("No has seleccionado ningún asiento.");
      return;
    }

    // Aquí simularías enviar a una API
    console.log("Reservando asientos:", asientosSeleccionados);

    // Simula éxito: desactiva los seleccionados
    asientosSeleccionados.forEach(id => {
      const asiento = document.querySelector(`.asiento[data-id="${id}"]`);
      asiento.classList.remove('seleccionado');
      asiento.classList.add('ocupado');
      asiento.removeEventListener('click', null);
    });

    alert(`¡Reserva exitosa! Asientos: ${asientosSeleccionados.join(", ")}`);
    asientosSeleccionados.length = 0;
    cantidad.textContent = "0";
  });
});


document.addEventListener("DOMContentLoaded", async function () {
  const container = document.getElementById("slider-container");

  try {
    const res = await fetch("/api/peliculas");
    const peliculas = await res.json();

    console.log("Películas cargadas:", peliculas); // 👈 debug

    container.innerHTML = ""; // Limpiar el contenedor

    peliculas.forEach(pelicula => {
      const slide = document.createElement("div");
      slide.className = "swiper-slide";

      const img = document.createElement("img");
      img.src = "/images/" + pelicula.imagen;
      img.alt = pelicula.titulo;

      const title = document.createElement("h3");
      title.textContent = pelicula.titulo;

      slide.appendChild(img);
      slide.appendChild(title);
      container.appendChild(slide);
    });

    // ⚠️ Swiper necesita tiempo para que el DOM esté listo
    setTimeout(() => {
      new Swiper(".mySwiper", {
        slidesPerView: 1,
        slidesPerGroup: 1,
        loop: peliculas.length > 1,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        breakpoints: {
          640: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 1, spaceBetween: 30 },
          1024: { slidesPerView: 1, spaceBetween: 40 },
        },
      });
    }, 100); // 👈 pequeño retraso
  } catch (error) {
    console.error("Error al cargar películas:", error);
  }
});
