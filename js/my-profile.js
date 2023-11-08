//Elementos del formulario del perfil de usuario
let primerNombre = document.getElementById('perfilPrimerNombre');
let segundoNombre = document.getElementById('perfilSegundoNombre');
let primerApellido= document.getElementById('perfilPrimerApellido');
let segundoApellido = document.getElementById('perfilSegundoApellido');
let perfilEmail = document.getElementById('perfilEmail');
let telefonoContacto = document.getElementById('perfilTelefono');
let buttonGuardar = document.getElementById('guardarPerfil');
let perfilUsuario;

(() => {
  
    'use strict'

    const forms = document.querySelectorAll('.needs-validation');

    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
        //Crea un objeto con los datos del formulario
        if(form.checkValidity()== true){
          perfilUsuario = {
            name: primerNombre.value,
            middleName: segundoNombre.value,
            lastName: primerApellido.value,
            secondSurname: segundoApellido.value,
            phone: telefonoContacto.value,
        };
        localStorage.setItem('perfil', JSON.stringify(perfilUsuario));
        }

        form.classList.add('was-validated')
      }, false)
    })
  })()


  function addForm(perfil) {
    primerNombre.value = perfil.name;
    segundoNombre.value = perfil.middleName;
    primerApellido.value = perfil.lastName;
    segundoApellido.value = perfil.secondSurname;
    telefonoContacto.value = perfil.phone;
  }

document.addEventListener('DOMContentLoaded', function () {
  const perfil = JSON.parse(localStorage.getItem("perfil"));
    addForm(perfil);
})

document.addEventListener("DOMContentLoaded", function () {

    //Traemos el mail del locaStorage y llamamos a la funcion que lo agrega en el campo
    const email = localStorage.getItem("email")
    if (email && email.length > 0) {
        addEmail(email);
    }    
});

function addEmail(email){
    //Se hace referencia al campo mail y se le agrega el mail del localStorage
    let campoEmail = document.getElementById('perfilEmail');

    campoEmail.value = email;
}
