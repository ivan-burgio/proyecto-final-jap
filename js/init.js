const CATEGORIES_URL = "http://localhost:3000/categorias"; //
const PUBLISH_PRODUCT_URL = "http://localhost:3000/emercado-api/sell/publish.json";
const PRODUCTS_URL = "http://localhost:3000/categorias/"; //
const PRODUCT_INFO_URL = "http://localhost:3000/producto/"; //
const PRODUCT_INFO_COMMENTS_URL = "http://localhost:3000/comentario/"; //
const CART_INFO_URL = "http://localhost:3000/emercado-api/user_cart/";
const CART_BUY_URL = "http://localhost:3000/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

cartItems = JSON.parse(localStorage.getItem('cartItem')) || [];
let actualItem = [];

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

let emailGuardado = localStorage.getItem("email"); //obtiene el email y lo guarda

function mailCortado() {
  // Obtener el correo electrónico del localStorage
  const emailGuardado = localStorage.getItem("email");

  // Verificar si el correo electrónico no es null
  if (emailGuardado) {
    // Dividir la dirección de correo electrónico
    const mailCortado = emailGuardado.split("@")[0];

    // Guardar el correo cortado en el localStorage como nombre de usuario
    localStorage.setItem("username", mailCortado);

    // Obtener el correo cortado del localStorage y mostrarlo en el span con el ID "correoUsuario"
    const username = localStorage.getItem("username");
    document.getElementById("correoUsuario").textContent = username;
  }
}

// Parte de cerrar sesión
const logout = document.querySelector('#logout');

logout.addEventListener('click', () => {
  localStorage.clear();
});

// Redirigir al usuario al login si no esta iniciado sesion (Esta vez desde cualquier pagina)
if (!localStorage.getItem("email") && !localStorage.getItem("password")){
  window.location.href='login.html'
}

document.addEventListener("DOMContentLoaded", function () {
    mailCortado();

    //Evalua si está en modo oscuro o claro la pagina desde el local storge
    const storedTheme = localStorage.getItem('theme');

    if (storedTheme === 'dark') {
        document.documentElement.setAttribute('data-bs-theme', 'dark');
        document.body.classList.add('dark-mode');
        addModoDark(1)
    } else {
        document.documentElement.setAttribute('data-bs-theme', 'light');
        addModoDark(0)
    }

    // JavaScript para manejar el botón de mostrar/ocultar filtros
   /*const toggleFiltersButton = document.getElementById('toggleFilters');
    const filterContent = document.getElementById('filterContent');

    toggleFiltersButton.addEventListener('click', () => {
        if (filterContent.style.display === 'none' || filterContent.style.display === '') {
            filterContent.style.display = 'block';
            toggleFiltersButton.textContent = 'Ocultar Filtros';
        } else {
            filterContent.style.display = 'none';
            toggleFiltersButton.textContent = 'Mostrar Filtros';
        }
    });*/
})

//Segun el localStorage o el boton cliceado, muestra el tema oscuro o claro
document.getElementById('btnSwitch').addEventListener('click', () => {
    const storedTheme = localStorage.getItem('theme');

    if (storedTheme === 'dark') {
        document.documentElement.setAttribute('data-bs-theme', 'light')
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light'); // Almacena el tema en localStorage
        addModoDark(0)
    }
    else {
        document.documentElement.setAttribute('data-bs-theme', 'dark')
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark'); // Almacena el tema en localStorage
        addModoDark(1)
    }
})

//Cambia en el listado Menu por Modo Oscuro o Claro
function addModoDark(modo) {
    let modoOscuro = document.getElementById('btnSwitch');
    let icono = '';
    if (modo === 1) {
        icono = `<ion-icon name="sunny-outline"></ion-icon> 
                            Modo claro
                        `;

    } else if (modo === 0) {
        icono = `<ion-icon name="moon-outline"></ion-icon>
                            Modo oscuro
                        `;
    }
    let html = `${icono}`;

    modoOscuro.innerHTML = '';
    modoOscuro.innerHTML = html;
}

//Copia el ID de cada categoría
function copiarID(id) {
  localStorage.setItem("catID", id);
  window.location = "products.html"
}

const imgProfileNav = document.getElementById("imgProfileNav");
if(!localStorage.getItem("imgProfile")){
  localStorage.setItem("imgProfile", "");
  imgProfileNav.src = '/img/defaultProfile.png';
} else {
  imgProfileNav.src = localStorage.getItem('imgProfile');
}