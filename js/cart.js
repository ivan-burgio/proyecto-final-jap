const IDuser = "25801"
const containerCart = document.getElementById("container-cart");
const buttonLeft = document.getElementsByClassName("number-left");
const buttonRight = document.getElementsByClassName("number-right");
const valueCountArticle = document.getElementsByName("number-count");
let count = 1;


//Obtiene los datos del fetch del carrito y los guarda en un array
function getDataCartUser() {
    fetch(CART_INFO_URL + IDuser + EXT_TYPE)
    .then(response => response.json())
    .then(result => {
      arrayItemCart = result.articles
      arrayItemCart.push(...cartItems);
      localStorage.setItem("cartItem",JSON.stringify(arrayItemCart))
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
                   <button onclick="deleteItem('${array[i].name}')" class="btn buttonDelete" type="button"><i class="far fa-trash-alt"></i></button>
                   </div>
                </div>
            </div>
        `
        containerCart.innerHTML += cartUser;
    }
}
document.addEventListener("DOMContentLoaded", getDataCartUser);

function sumIndividualCost(i, unitCost, count, currency){

input = document.getElementById(i + "_modified");
 input.value++
 const subtotalCost = input.value*unitCost;
 subtotal = document.getElementById(i + "_Subtotal");
 subtotal.textContent = `Subtotal:  ${currency.toString()} ${subtotalCost}`
 const cartActual = localStorage.getItem('cartItem');
 JSON.parse(cartActual);
}

function restIndividualCost(i, unitCost, count, currency){

    input = document.getElementById(i + "_modified");
     if(input.value>0){input.value--}
     const subtotalCost = input.value*unitCost;
     subtotal = document.getElementById(i + "_Subtotal");
     subtotal.textContent = `Subtotal:  ${currency.toString()} ${subtotalCost}` 
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


  // Example starter JavaScript for disabling form submissions if there are invalid fields
  (() => {
    'use strict';

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms           = document.querySelectorAll('.needs-validation');
    const nombreInput     = document.getElementById('nombre');
    const nroTarjetaInput = document.getElementById('nroTarjeta');
    const codigoInput     = document.getElementById('codigo');

    nombreInput.addEventListener('input', function () {
        if (nombreInput.value.trim() === '' || !/^[A-Za-z]+$/.test(nombreInput.value) || nombreInput.value.length != 5) {
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

    codigoInput.addEventListener('input', function () {
      if (codigoInput.value.trim() === '' || /^[0-9]{16}$/.test(codigoInput.value) || !(codigoInput.value.length === 3)) {
        codigoInput.setCustomValidity('Código incorrecto');
      } else {
        codigoInput.setCustomValidity('');
      }
    });


    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }

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


document.addEventListener('DOMContentLoaded', function() {
  paypal.Buttons({
    style: {
        shape: 'rect',
        color: 'blue',
        layout: 'vertical',
        label: 'pay',
    },
    funding: {
        disallowed: [paypal.FUNDING.CARD],
    }
}).render('#paypal-button-container');

paypal.Buttons({
    style: {
        shape: 'rect',
        color: 'blue',
        layout: 'vertical',
        label: 'pay',
    },
    funding: {
        disallowed: [paypal.FUNDING.CARD],
    }
}).render('#paypal-button-container-virtual');

});


document.addEventListener("DOMContentLoaded", function () {
  // Agregar un evento clic a los botones
  const debitCreditButton = document.getElementById('accordion-button-one');
  const paypalButton = document.getElementById('accordion-button-two');
  const collapseOne = document.getElementById('collapseOne');
  const collapseTwo = document.getElementById('collapseTwo');


  debitCreditButton.addEventListener('click', () => {
    // Verificar si el botón ya tiene la clase 'show'
      // Mostrar el contenido de tarjeta de débito y crédito y ocultar PayPal
      if(collapseTwo.classList.contains('show')){
          collapseTwo.classList.remove('show');
          collapseOne.classList.add('show');
          paypalButton.classList.add('collapsed');
          debitCreditButton.classList.remove('collapsed');
        }else{
          collapseOne.classList.remove('show');
            if(debitCreditButton.classList.contains('collapsed')){
              debitCreditButton.classList.add('collapsed');
            }else{
              debitCreditButton.classList.remove('collapsed');
            }
        }
  });

  paypalButton.addEventListener('click', () => {
    // Verificar si el botón ya tiene la clase 'show'
    if(collapseOne.classList.contains('show')){
       collapseOne.classList.remove('show');
       collapseTwo.classList.add('show');
       paypalButton.classList.remove('collapsed');
       debitCreditButton.classList.add('collapsed');
    }else{
      collapseTwo.classList.remove('show');
        if(paypalButton.classList.contains('collapsed')){
          paypalButton.classList.add('collapsed');
        }else{
          paypalButton.classList.remove('collapsed');
        }
    }
  });
});


