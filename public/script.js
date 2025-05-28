
document.addEventListener("DOMContentLoaded", async function () {
  const container = document.getElementById("slider-container");

  try {
    const res = await fetch("/api/peliculas");
    const peliculas = await res.json();

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

    new Swiper(".mySwiper", {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 10,
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
      },
    });
  } catch (error) {
    console.error("Error al cargar películas:", error);
  }
});
