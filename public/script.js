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
