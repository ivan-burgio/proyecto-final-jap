const IDuser = "25801"
const containerCart = document.getElementById("container-cart");
const buttonLeft = document.getElementsByClassName("number-left");
const buttonRight = document.getElementsByClassName("number-right");
const valueCountArticle = document.getElementsByName("number-count");
const cardPriceContainer= document.getElementById("cardTotalPrice");
const containerCost = document.getElementById("cardPrice")
let count = 1;
let subTotal = 0;
let costoDeEnvio = 0;
let Total = 0;


//Obtiene los datos del fetch del carrito y los guarda en un array
function getDataCartUser() {
    fetch(CART_INFO_URL + IDuser + EXT_TYPE)
    .then(response => response.json())
    .then(result => {
      arrayItemCart = result.articles
      arrayItemCart.push(...cartItems);
    //   localStorage.setItem("cartItem",JSON.stringify(arrayItemCart))
      showCartList(arrayItemCart);
    })
    .catch(error => {
      console.error('Error en la solicitud:', error);
    });
    
}

//Muestra el contenido de un array
function showCartList(array) {
    let cartUser = ``;
    for (i= 0; i < array.length; i++) {
      subTotal  += arrayItemCart[i].unitCost;
      Total = subTotal + costoDeEnvio;
    
        cartUser = `
            <div class="card-product shadow align-items-center caja-gris-raro">
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
                            <div onclick= "restIndividualCost(${i}, ${array[i].unitCost}, ${count}, '${array[i].currency}')" class="number-left"></div>
                            <input id= '${i}_modified' type="number" name="number-count" class="number-quantity" value="${count}">
                            <div onclick= "sumIndividualCost(${i}, ${array[i].unitCost}, ${count}, '${array[i].currency}')" class="number-right"></div>
                        </div>
                    </div>
                <!--Final del Botón-->
                   <p id='${i}_Subtotal' >Subtotal: ${array[i].currency} ${array[i].unitCost}</p>
                   <div class= "d-flex justify-content-center align-items-end ">
                   <button onclick="deleteItem('${array[i].name}') ; showCartList()" class="btn buttonDelete" type="button"><i class="far fa-trash-alt"></i></button>
                   </div>
                </div>
            </div>
        `
        containerCart.innerHTML += cartUser;
    }
    //tarjeta de precios
    let cardPrice = `
    <div id="subTotal" class="cardBody">
      <p><strong>Subtotal:</strong> <span>USD ${subTotal}</span></p>
      <p class="description">Costo unitario del producto por cantidad</p>
    </div>
    <div id="envio" class="cardBody">
      <p><strong>Costo de envió:</strong> <span>USD ${costoDeEnvio}</span></p>
      <p class="description">Según el tipo de envió seleccionado</p>
    </div>
    <div id="total" class="cardBody">
      <p><strong>Total:</strong> <span class="priceTotal">USD ${Total} </span></p>
    </div>
    `
    
        
              containerCost.innerHTML += cardPrice; 
}


function sumIndividualCost(i, unitCost, count, currency){

input = document.getElementById(i + "_modified");
 input.value++
 subTotal += unitCost
 Total += unitCost
 const subtotalCost = input.value*unitCost;
 subtotal = document.getElementById(i + "_Subtotal");
 subtotal.textContent = `Subtotal:  ${currency.toString()} ${subtotalCost}`
 const cartActual = localStorage.getItem('cartItem');
 JSON.parse(cartActual);
 updateTotal()

}

function restIndividualCost(i, unitCost, count, currency){

    input = document.getElementById(i + "_modified");
     if (input.value>0){subTotal -= unitCost}
     if(input.value>0){input.value--}
     const subtotalCost = input.value*unitCost;
     subtotal = document.getElementById(i + "_Subtotal");
     subtotal.textContent = `Subtotal:  ${currency.toString()} ${subtotalCost}`
     updateTotal()
    }

  function deleteItem(Item){
  let getLocalProduct = localStorage.getItem("cartItem");
  getLocalProduct = JSON.parse(getLocalProduct);
  const setLocalProduct = []
  for (let obj of getLocalProduct){
  if (obj.name !== Item){
  setLocalProduct.push(obj)
  }
  }  
  localStorage.setItem("cartItem", JSON.stringify(setLocalProduct))  
  containerCart.innerHTML = ""
  showCartList(setLocalProduct)
  }

const botonMostrarFormulario = document.getElementById("mostrarFormulario");
const formulario = document.getElementById("formulario");

botonMostrarFormulario.addEventListener("click", function() {
    if (formulario.style.display === "none" || formulario.style.display === "") {
      formulario.style.display = "block";
    } else {
      formulario.style.display = "none";
    }
  });
// calculadora de envios
  function envioStandard(){
    costoDeEnvio = subTotal * 0.05;
    updateTotal();
}

function envioExpress(){
    costoDeEnvio = subTotal * 0.07;
    updateTotal();
}

function envioPremium(){
    costoDeEnvio = subTotal * 0.15;
    updateTotal();
}

  function updateTotal() {
    Total = subTotal + costoDeEnvio;
    const subTotalElement = document.getElementById('subTotal');
    const costoDeEnvioElement = document.getElementById('envio');
    const totalElement = document.getElementById('total');
    subTotalElement.innerHTML =  `<p><strong>Subtotal:</strong> <span>USD ${subTotal}</span></p>
                                  <p class="description">Costo unitario del producto por cantidad</p>`
    costoDeEnvioElement.innerHTML = `<p><strong>Costo de envió:</strong> <span>USD ${costoDeEnvio}</span></p>
                                     <p class="description">Según el tipo de envió seleccionado</p>`;
    totalElement.innerHTML = `<p><strong>Total:</strong> <span class="priceTotal">USD ${Total} </span></p>`;
}


  document.addEventListener("DOMContentLoaded", getDataCartUser);

  //Evento que según el tamaño, cambia las clases del container de los costos totales

  window.addEventListener("resize", () => {
    if(document.documentElement.clientWidth <= 1704) {
      containerCost.classList.remove("cardPrice");
      containerCost.classList.add("cardPriceResponsive")
    } else if(document.documentElement.clientWidth >= 1704) {
      containerCost.classList.add("cardPrice");
      containerCost.classList.remove("cardPriceResponsive")
    }
  })