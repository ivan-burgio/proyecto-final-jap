//Elementos del formulario del perfil de usuario
let primerNombre = document.getElementById('perfilPrimerNombre');
let segundoNombre = document.getElementById('perfilSegundoNombre');
let primerApellido= document.getElementById('perfilPrimerApellido');
let segundoApellido = document.getElementById('perfilSegundoApellido');
let perfilEmail = document.getElementById('perfilEmail');
let telefonoContacto = document.getElementById('perfilTelefono');
let buttonGuardar = document.getElementById('guardarPerfil');
let perfilArchivo = document.getElementById('perfilArchivo');
let profileImage = document.getElementById("imgProfile");
let perfilUsuario;

  //Coloca datos en los input
function addForm(perfil) {
  primerNombre.value = perfil.name;
  segundoNombre.value = perfil.middleName;
  primerApellido.value = perfil.lastName;
  segundoApellido.value = perfil.secondSurname;
  telefonoContacto.value = perfil.phone;
}

// Insertar imagen
function imageProfile() {
 perfilArchivo.addEventListener('change', function(e) {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function(e) {
        const profileImg = e.target.result;

        // guardar la imagen en el localStorage
        localStorage.setItem('imgProfile', profileImg);
        displayImgProfile();
        displayImgProfileNav();
      };
      
      reader.readAsDataURL(file);
     
    }

  });
}

// Mostrar imagen de perfil
function displayImgProfile() {

  if (localStorage.getItem('imgProfile')!=="") {
    profileImage.src = localStorage.getItem('imgProfile');
  } else {
    profileImage.src = '/img/defaultProfile.png';
  }
}

//cambia profile del nav
function displayImgProfileNav() {
 const imgProfileNav = document.getElementById("imgProfileNav")
  if (localStorage.getItem('imgProfile')!=="") {
    imgProfileNav.src = localStorage.getItem('imgProfile');
  } else {
    imgProfileNav.src = '/img/defaultProfile.png';
  }
}

//borrar imagen de perfil hacer para proxima entrega Valeria(yo)




//Si hay un dato en el localstorage lo coloca en los input llamando a una funcion
document.addEventListener('DOMContentLoaded', function () {
imageProfile();
displayImgProfile();
const perfil = JSON.parse(localStorage.getItem("perfil"));
  addForm(perfil);
});

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
          event.stopPropagation()
          event.preventDefault()
          perfilUsuario = {
            name: primerNombre.value,
            middleName: segundoNombre.value,
            lastName: primerApellido.value,
            secondSurname: segundoApellido.value,
            phone: telefonoContacto.value,
        };
        localStorage.setItem('perfil', JSON.stringify(perfilUsuario));
        Swal.fire({
          title: 'Datos guardados',
          confirmButtonColor: '#fd7e14',
          confirmButtonText: 'Entendido',
          icon: 'success',
          iconColor: '#fd7e14',
          background: '#fffaff',
          timer: 9000
        })
        }
        form.classList.add('was-validated')
      }, false)
    })
  })()

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
