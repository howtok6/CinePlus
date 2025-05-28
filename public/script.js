document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".slider");
  const indicators = document.querySelector(".indicators");
  let currentIndex = 0;
  let slides = [];

  // Función para cargar imágenes dinámicamente desde el backend
  async function loadImages() {
    try {
      const response = await fetch("/api/images");
      const imagePaths = await response.json();

      slider.innerHTML = ""; // Limpiar el slider
      indicators.innerHTML = ""; // Limpiar indicadores

      imagePaths.forEach((src, index) => {
        const slide = document.createElement("div");
        slide.classList.add("slide");
        if (index === 0) slide.classList.add("active");

        const img = document.createElement("img");
        img.src = src;
        img.alt = `Película ${index + 1}`;
        img.classList.add("slider-image");

        slide.appendChild(img);
        slider.appendChild(slide);

        const dot = document.createElement("span");
        dot.classList.add("dot");
        if (index === 0) dot.classList.add("active");
        dot.addEventListener("click", () => showSlide(index));
        indicators.appendChild(dot);
      });

      slides = document.querySelectorAll(".slide");
    } catch (error) {
      console.error("Error cargando imágenes:", error);
    }
  }

  // Función para mostrar un slide específico
  function showSlide(index) {
    if (!slides.length) return;
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
      indicators.children[i].classList.toggle("active", i === index);
    });
    currentIndex = index;
  }

  // Cambio automático de slides
  setInterval(() => {
    if (!slides.length) return;
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }, 5000); // cambia cada 5 segundos

  loadImages();
});
