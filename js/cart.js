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
     if(input.value <= 0) {
      input.value = 1;
      subTotal = unitCost;
    }
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

  const paymentMethodSelect = document.getElementById('paymentMethod');
  const cuotasField = document.getElementById('cuotasField');
  const cuotasInput = document.getElementById('cuotas');

  paymentMethodSelect.addEventListener('change', function() {
    if (paymentMethodSelect.value === 'credito') {
      cuotasField.style.display = 'block';
      cuotasInput.setAttribute('required', 'required');
    } else {
      cuotasField.style.display = 'none';
      cuotasInput.removeAttribute('required');
    }
  });

  // Validación de datos del formulario de pago con tarjeta de crédito o débito
  (() => {
    'use strict';

    const forms           = document.querySelectorAll('.needs-validation');
    const nombreInput     = document.getElementById('nombre');
    const nroTarjetaInput = document.getElementById('nroTarjeta');
    const codigoInput     = document.getElementById('codigo');
    const nroCuenta = document.getElementById('nroCuenta');
    const buttonTransfer = document.getElementById('transfer-button');
    const buttonCreditoDebito = document.getElementById('credito-debito')
    const formularioEnvio = document.getElementById('formulario');

    //Evento que al presionar la opción de transferencia deshabilita las opciones de crédito o débito
    buttonTransfer.addEventListener('click', ()=> {
      if(buttonTransfer.checked = true) {
        nroCuenta.disabled = false;
        nombreInput.disabled = true;
        nroTarjetaInput.disabled = true;
        vencimientoInput.disabled = true;
        codigoInput.disabled = true;
        paymentMethodSelect.disabled = true;
      }
    })

    //Evento que al presionar la opción de crédito o débito deshabilita las opciones de transferencia
    buttonCreditoDebito.addEventListener('click', ()=>  {
      if(buttonCreditoDebito.checked = true) {
        nroCuenta.disabled = true;
        nombreInput.disabled = false;
        nroTarjetaInput.disabled = false;
        vencimientoInput.disabled = false;
        codigoInput.disabled = false;
        paymentMethodSelect.disabled = false;
      }
    })

    nombreInput.addEventListener('input', function () {
        if (nombreInput.value.trim() === '' || !/^[A-Za-z]+$/.test(nombreInput.value)) {
            nombreInput.setCustomValidity('El nombre no puede estar vacío y debe contener solo letras.');
        } else {
            nombreInput.setCustomValidity('');
        }
    });

    nroTarjetaInput.addEventListener('input', function () {
      if (nroTarjetaInput.value.trim() === '' || /^[0-9]{16}$/.test(nroTarjetaInput.value) || nroTarjetaInput.value.length < 15) {
        nroTarjetaInput.setCustomValidity('Número incorrecto');
      } else {
        nroTarjetaInput.setCustomValidity('');
      }
    });

    nroCuenta.addEventListener('input', ()=> {
      if(nroCuenta.value.trim() === '' || /^[0-9]{10}$/.test(nroCuenta.value) || nroCuenta.value.length < 9){
        nroCuenta.setCustomValidity('Número incorrecto');
      } else {
        nroCuenta.setCustomValidity('');
      }
    })

    codigoInput.addEventListener('input', function () {
      if (codigoInput.value.trim() === '' || /^[0-9]{16}$/.test(codigoInput.value) || !(codigoInput.value.length === 3)) {
        codigoInput.setCustomValidity('Código incorrecto');
      } else {
        codigoInput.setCustomValidity('');
      }
    });

    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }

            //Se asegura que se validen los datos del formulario de datos del envio y que cantidad de producto sea mayor a cero
            if (!formularioEnvio.checkValidity()) {
              event.preventDefault();
              event.stopPropagation();
            }
            
            formularioEnvio.classList.add('was-validated')
            form.classList.add('was-validated');
        }, false);
    });
})();

const vencimientoInput = document.getElementById('vencimiento');

vencimientoInput.addEventListener('input', function () {
  let inputValue = vencimientoInput.value.replace(/\D/g, ''); // Eliminar caracteres no numéricos
  const maxLength = 4; // Longitud máxima del campo (MM/YY)

  if (inputValue.length > maxLength) {
    inputValue = inputValue.slice(0, maxLength); // Limitar a la longitud máxima
  }

  if (inputValue.length >= 2) {
    // Insertar una barra ("/") después de los primeros dos dígitos (mes)
    inputValue = inputValue.slice(0, 2) + '/' + inputValue.slice(2);
  }

  vencimientoInput.value = inputValue;

  if (inputValue.length === 5) {
  
    const month = parseInt(inputValue.slice(0, 2), 10);
    const year = parseInt(inputValue.slice(2), 10);
  
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100; // Obtener los últimos dos dígitos del año actual
  
    if (month < 1 || month > 12 || year < currentYear) {
      vencimientoInput.setCustomValidity('Fecha no válida');
    } else {
      vencimientoInput.setCustomValidity('');
    }
  } else {
    vencimientoInput.setCustomValidity('Formato incorrecto');
  }
});

vencimientoInput.addEventListener('keydown', function (e) {
  if (e.key === 'Backspace' && vencimientoInput.value.slice(-1) === '/') {
    // Permitir borrar la barra ("/") con la tecla Backspace
    vencimientoInput.value = vencimientoInput.value.slice(0, -1);
  }
});


// document.addEventListener('DOMContentLoaded', function() {
//   paypal.Buttons({
//     style: {
//         shape: 'rect',
//         color: 'blue',
//         layout: 'vertical',
//         label: 'pay',
//     },
//     funding: {
//         disallowed: [paypal.FUNDING.CARD],
//     }
// }).render('#paypal-button-container');

// paypal.Buttons({
//     style: {
//         shape: 'rect',
//         color: 'blue',
//         layout: 'vertical',
//         label: 'pay',
//     },
//     funding: {
//         disallowed: [paypal.FUNDING.CARD],
//     }
// }).render('#paypal-button-container-virtual');

// });


// document.addEventListener("DOMContentLoaded", function () {
//   // Agregar un evento clic a los botones
//   const debitCreditButton = document.getElementById('accordion-button-one');
//   const transferButton = document.getElementById('accordion-button-two');
//   const collapseOne = document.getElementById('collapseOne');
//   const collapseTwo = document.getElementById('collapseTwo');


//   debitCreditButton.addEventListener('click', () => {
//     // Verificar si el botón ya tiene la clase 'show'
//       // Mostrar el contenido de tarjeta de débito y crédito y ocultar transferencia bancaria
//       if(collapseTwo.classList.contains('show')){
//           collapseTwo.classList.remove('show');
//           collapseOne.classList.add('show');
//           transferButton.classList.add('collapsed');
//           debitCreditButton.classList.remove('collapsed');
//         }else{
//           collapseOne.classList.remove('show');
//             if(debitCreditButton.classList.contains('collapsed')){
//               debitCreditButton.classList.add('collapsed');
//             }else{
//               debitCreditButton.classList.remove('collapsed');
//             }
//         }
//   });

//   transferButton.addEventListener('click', () => {
//     // Verificar si el botón ya tiene la clase 'show'
//     if(collapseOne.classList.contains('show')){
//        collapseOne.classList.remove('show');
//        collapseTwo.classList.add('show');
//        transferButton.classList.remove('collapsed');
//        debitCreditButton.classList.add('collapsed');
//     }else{
//       collapseTwo.classList.remove('show');
//         if(transferButton.classList.contains('collapsed')){
//           transferButton.classList.add('collapsed');
//         }else{
//           transferButton.classList.remove('collapsed');
//         }
//     }
//   });
// });


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

  
  document.addEventListener("DOMContentLoaded", function () {
    // Obtén el elemento select para el método de pago
    const paymentMethodSelect = document.getElementById("paymentMethod");
  
    // Obtén los elementos de los campos de formulario
    const nombreInput = document.getElementById("nombre");
    const nroTarjetaInput = document.getElementById("nroTarjeta");
    const vencimientoInput = document.getElementById("vencimiento");
    const codigoInput = document.getElementById("codigo");
    const cuotasSelect = document.getElementById("validationTooltip04");
  
    // Manejador de evento para detectar cambios en el método de pago
    paymentMethodSelect.addEventListener("change", function () {
      // Obtén el valor seleccionado (debito o credito)
      const selectedPaymentMethod = paymentMethodSelect.value;
  
      // Restablece los campos del formulario si cambias de tarjeta de crédito a tarjeta de débito o viceversa
      if (selectedPaymentMethod === "debito") {
        nombreInput.value = "";
        nroTarjetaInput.value = "";
        vencimientoInput.value = "";
        codigoInput.value = "";
        cuotasSelect.selectedIndex = 0;
      } else if (selectedPaymentMethod === "credito") {
        nombreInput.value = "";
        nroTarjetaInput.value = "";
        vencimientoInput.value = "";
        codigoInput.value = "";
        cuotasSelect.selectedIndex = 0;
      }
    });
  });