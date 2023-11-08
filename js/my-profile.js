//Elementos del formulario del perfil de usuario
const primerNombre = document.getElementById('perfilPrimerNombre').value;
const segundoNombre = document.getElementById('perfilSegundoNombre').value;
const primerApellido= document.getElementById('perfilPrimerApellido').value;
const segundoApellido = document.getElementById('perfilSegundoApellido').value;
const perfilEmail = document.getElementById('perfilEmail');
const telefonoContacto = document.getElementById('perfilTelefono').value;
const buttonGuardar = document.getElementById('guardarPerfil');
let perfilUsuario;

//Guarda los datos del usuario en un objeto
function saveDataUser (name, middleName, lastName, secondSurname, phone) {
    perfilUsuario = {
        name: name,
        middleName: middleName,
        lastName: lastName,
        secondSurname: secondSurname,
        phone: phone,
    };
}

//validación del formulario

(() => {
    'use strict'

    const forms = document.querySelectorAll('.needs-validation');

    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        if(form.checkValidity()== true){
          const formDataUser = new FormData(form);
          perfilUsuario = Object.fromEntries(formDataUser)
          localStorage('perfil', JSON.stringify(perfilUsuario));
        }

        form.classList.add('was-validated')
      }, false)
    })
  })()