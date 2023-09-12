const mail = document.querySelector('#email');
const password = document.querySelector('#password');
const mailValido = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
const passwordValido = /^[A-Za-zñÑ\d#$@!%&*?]/;

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

//Validación de Email
function validarEmail() {
    if(mailValido.test(mail.value)){
        return true;
	}else{
		return false
	}
 }

 //Validación de contraseña
 function validarPassword() {
    if(passwordValido.test(password.value)) {
        return true
    } else {
        return false
    }
 }

 //comprobacion y redirección 
function comprobarDatos (){
  if ((password.value.length >= 5 && password.value.length <=12) && (validarEmail() === true) && (validarPassword() === true)) {
     window.localStorage.setItem("email", mail.value)
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

    if(password.value.length < 5 && password.value.length !==0) {
        crearAlerta('La contraseña debe tener mínimo 5 caracteres', 'error', document.querySelector('.container-login h1'));
    }

    if (password.value.length > 12) {
        crearAlerta('La contraseña debe tener máximo 12 caracteres' ,'error', document.querySelector('.container-login h1'));
    }

    if (!mailValido.test(mail.value) && mail.value.length !== 0) {
        crearAlerta('Ingrese un correo valido', 'error', document.querySelector('.container-login h1'));
    }
}

// Espacio de comprobaciones
const loginBtn = document.querySelector("#button");


loginBtn.addEventListener('click', () => {
   
    comprobarDatos()

});