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

document.addEventListener("DOMContentLoaded", getDataCartUser);