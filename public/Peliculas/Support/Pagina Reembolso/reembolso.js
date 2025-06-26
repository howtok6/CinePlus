document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('formulario-reembolso');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Obtener valores
    const nombre = document.getElementById('nombre').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const orden = document.getElementById('orden').value.trim();
    const fecha = document.getElementById('fecha').value;
    const motivo = document.getElementById('motivo').value.trim();
    const condiciones = document.getElementById('condiciones').checked;
    const archivo = document.getElementById('archivo').files[0];

    // Validaciones simples
    if (!correo || !orden || !fecha || !motivo || !condiciones) {
      alert('Por favor completa todos los campos obligatorios y acepta las condiciones.');
      return;
    }

    // Validación de archivo adjunto (si existe)
    if (archivo) {
      const tiposPermitidos = ['image/jpeg', 'image/png', 'application/pdf'];
      if (!tiposPermitidos.includes(archivo.type)) {
        alert('El archivo adjunto debe ser JPG, PNG o PDF.');
        return;
      }
    }

    // Aquí podrías enviar los datos usando fetch/AJAX si se conectara a backend
    alert('Formulario enviado con éxito.');
    form.reset();
  });
});