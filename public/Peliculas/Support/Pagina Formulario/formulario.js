document.addEventListener('DOMContentLoaded', function () {
  const formulario = document.querySelector('.formulario');

  formulario.addEventListener('submit', function (e) {
    e.preventDefault(); // Previene el envío por defecto

    const email = document.getElementById('email').value.trim();
    const tipoConsulta = document.getElementById('tipo-consulta').value;
    const descripcion = document.getElementById('descripcion').value.trim();

    if (!email || !tipoConsulta || !descripcion) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }

    alert('¡Formulario enviado exitosamente!');
    formulario.reset(); // Limpia los campos del formulario
  });
});