const mail = document.querySelector('#email');
const password = document.querySelector('#password');

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
 //comprobacion y redirección 
function comprobarDatos (){
  if (mail.value.length !== 0 && password.value.length !== 0)  {
     window.localStorage.setItem("email", mail.value)
     window.localStorage.setItem("password", password.value)
     window.location.href = 'index.html'; 
    } else { mostrarAlertas()}
}

function mostrarAlertas() {
    if(mail.value.length === 0) {
        crearAlerta('Ingrese un correo', 'error', document.querySelector('.container-login h1'));
    }
    if(password.value.length === 0) {
        crearAlerta('Ingrese una contraseña', 'error', document.querySelector('.container-login h1'));
    }
}

// Espacio de comprobaciones
const loginBtn = document.querySelector("#button");


loginBtn.addEventListener('click', () => {
   
 comprobarDatos()

});

