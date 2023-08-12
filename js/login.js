function mostrarAlerta(mensaje, tipo, referencia) {
    // Previene la creacion de multiples alertas
    const alertaPrevia = document.querySelector('.alerta');

    if(alertaPrevia) {
        alertaPrevia.remove();
    }

    const alerta = document.createElement('DIV');
    alerta.classList.add('alerta', tipo);
    alerta.textContent = mensaje;

    // Insertar la alerta despues del legend
    referencia.parentElement.insertBefore(alerta, referencia.nextElementSibling);

    // Eliminar la alerta
    setTimeout(() => {
        alerta.remove();
    }, 5000);
}

mostrarAlerta(resultado.mensaje, resultado.tipo, document.querySelector('.container-login h1'));

// Espacio de comprobaciones
const registrarBtn = document.querySelector('.button-login');

registrarBtn.addEventListener('click', () => {
    const mail = document.querySelector('#email').value.trim();
    const password = document.getElementById("password");
    const confirmPassword = password.value;
});

(mail.length === 0)
(password.length === 0)