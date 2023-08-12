function crearAlerta(mensaje, tipo, referencia) {
    const alerta = document.createElement('DIV');
    alerta.classList.add('alerta', tipo);
    alerta.textContent = mensaje;

    // Insertar la alerta despues del h1
    referencia.parentElement.insertBefore(alerta, referencia.nextElementSibling);

    // Eliminar la alerta
    setTimeout(() => {
        alerta.remove();
    }, 4000);
}

function mostrarAlertas() {
    const mail = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value;

    if(mail.length === 0) {
        alertas = crearAlerta('Ingrese un correo', 'error', document.querySelector('.container-login h1'));
    }
    if(password.length === 0) {
        alertas = crearAlerta('Ingrese una contraseña', 'error', document.querySelector('.container-login h1'));
    }

    return alertas;
}

// Espacio de comprobaciones
const loginBtn = document.querySelector('.button-login');

loginBtn.addEventListener('click', () => {
    const alertas = [];
    mostrarAlertas();

    
    if(alertas.length === 0) {
    // Redireccionamiento si no hay alertas
        
    }
});