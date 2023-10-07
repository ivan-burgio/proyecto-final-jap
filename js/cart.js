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
        <div class="card-product shadow">
            <div class="card-1">
                <img src="${array[i].image}" alt="${array[i].name}">
            </div>

            <div class="right">
                  <h4 class="card-title">${array[i].name}</h4>
                  <h5>Precio: ${array[i].currency} ${array[i].unitCost}</h5>
                  
                <div class="card-count">
                    <h5>Cantidad: </h5>

            <!--Botón de cantidades-->
                    <div class="number-control">
                        <div class="number-left"></div>
                        <input type="number" name="number-count" class="number-quantity" value="${count}">
                        <div class="number-right"></div>
                    </div>
                </div>
            <!--Final del Botón-->

                <h5>Subtotal: ${array[i].currency} ${array[i].unitCost}</h5>
            </div>
        </div>
        `
        containerCart.innerHTML += cartUser;
    }
}

document.addEventListener("DOMContentLoaded", getDataCartUser);