const IDuser = "25801"
const containerCart = document.getElementById("container-cart")
const buttonLeft = document.getElementsByClassName("number-left");
const buttonRight = document.getElementsByClassName("number-right");
const valueCountArticle = document.getElementsByName("number-count");
let count = 1;
let arrayItemCart = [];


//Obtiene los datos del fetch del carrito y los guarda en un array
function getDataCartUser() {
    fetch(CART_INFO_URL + IDuser + EXT_TYPE)
    .then(response => response.json())
    .then(result => {
        arrayItemCart = result.articles
      showCartList(arrayItemCart)
    })
    .catch(error => {
      console.error('Error en la solicitud:', error);
    });
}

//Muestra el contenido de un array
function showCartList(array) {
    let cartUser = ``;
    for (i= 0; i < array.length; i++) {
        cartUser = `
            <div class="card-1 container-fluid">
                <img class="img-fluid" src="${array[i].image}" alt="${array[i].name}" style="width: 100%; height: auto; max-width: 30rem;">
            </div>

            <div class="right m-4 ms-0">
                  <h4 class="card-title">${array[i].name}</h4>
                  <p>Precio: ${array[i].currency} ${array[i].unitCost}</p>
                  
                <div class="card-count mb-3">
                    <p class="m-0">Cantidad: </p>

            <!--Botón de cantidades-->
                    <div class="number-control">
                        <div class="number-left"></div>
                        <input type="number" name="number-count" class="number-quantity" value="${count}">
                        <div class="number-right"></div>
                    </div>
                </div>
            <!--Final del Botón-->

                <p>Subtotal: ${array[i].currency} ${array[i].unitCost}</p>
            </div>
        `
        containerCart.innerHTML += cartUser;
    }
}

document.addEventListener("DOMContentLoaded", getDataCartUser);

const botonMostrarFormulario = document.getElementById("mostrarFormulario");
const formulario = document.getElementById("formulario");

botonMostrarFormulario.addEventListener("click", function() {
    if (formulario.style.display === "none" || formulario.style.display === "") {
      formulario.style.display = "block";
    } else {
      formulario.style.display = "none";
    }
  });
