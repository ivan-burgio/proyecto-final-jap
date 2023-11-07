const productID = localStorage.getItem("productID");
const containerInfo = document.getElementById("container-Info");
const commentsList = document.getElementById("comments-list");
const submitButton = document.getElementById("submit-comment");
const ratingLabels = document.querySelectorAll(".star-rating label");
let apiComments = [];
let localComments = [];

document.addEventListener("DOMContentLoaded", function () {
    // Verifica si hay comentarios en el localStorage
    const storedComments = JSON.parse(localStorage.getItem("comments"));

    if (storedComments && storedComments.length > 0) {
        // Muestra los comentarios almacenados
        displayComments(storedComments);
        localComments = storedComments; // Actualiza localComments con los comentarios del localStorage
    }

    getDataProduct();
});

function getDataProduct() {
    getJSONData(PRODUCT_INFO_URL + productID + EXT_TYPE)
      .then(result => {
        actualItem = {
          name: result.data.name,
          image: result.data.images[0],
          currency: result.data.currency === "UYU" ? "USD" : result.data.currency,
          unitCost: result.data.currency === "UYU" ? (result.data.cost / 40) : result.data.cost
        };
        showProductInfo(result.data);
        getComments();
      })
      .catch(error => {
        console.error('Error en la solicitud:', error);
      });
  }
  


function addCart() {
    const buttonAddCart = document.getElementById("addCartItem");

    if (!cartItems.includes(actualItem))
        cartItems.push(actualItem);
    localStorage.setItem('cartItem', JSON.stringify(cartItems));

    // Deshabilita el botón
    buttonAddCart.disabled = true;
    // Cambia el texto del botón
    buttonAddCart.textContent = "Añadido al carrito";
    buttonAddCart.style.color = "black";
    buttonAddCart.style.backgroundColor = "#ffb543";
}

function showProductInfo(result) {
    containerInfo.innerHTML = '';

    let productCard = `
    <div class="titulo-cat pt-5 pb-1">
        <h2>${result.name}</h2>
        <p class="lead">Veras aquí mas detalles sobre el producto seleccionado</p>
    </div>

    <div class="container-fluid card-product align-items-center caja-gris product-info" id="${result.id}">
        <div class="carrusel">
            ${getHTMLCarousel(result.images)}
        </div>
        <div class="infoProduct conteiner-fluid">
            <p><span>Precio:</span> ${result.cost} ${result.currency}</p>
            <p><span>Descripción:</span>  ${result.description}</p>
            <p><span>Categoria:</span>  ${result.category}</p>
            <p>${result.soldCount} <span>unidades vendidas</span></p>
            <button onclick="addCart(actualItem)" class="btn btn-primary btn-lg button-cart m-3 add-to-cart-button" id="addCartItem" type="button">Agregar al carrito</button>
        </div>
    </div>`;
    containerInfo.innerHTML += productCard;
    ;

    // Mostrar productos relacionados
    if (result.relatedProducts && result.relatedProducts.length > 0) {
        let relatedProductsHTML = `<div class="relatedProducts">
      <h3 class="titleRelatedProducts">Productos relacionados</h3>
      <div class="relatedProductsContainer">`;

        for (let relatedProduct of result.relatedProducts) {
            relatedProductsHTML += `
        <div class= "card1 card custom-card custom-shadow-orange caja-gris cursor-active" onclick="setProductsID(${relatedProduct.id})" class="relatedProduct">
          <img src="${relatedProduct.image}" alt="${relatedProduct.name}" class= "card-img-top">
          <div class="card-body">
          <p class="card-text textRelatedProducts">${relatedProduct.name}</p>
          </div>
        </div>`;
        }

        relatedProductsHTML += `</div></div>`;
        containerInfo.innerHTML += relatedProductsHTML;
    }
}

function getHTMLCarousel(arrayImg) {
    let productCard = `
    <div id="carouselExampleIndicators" class="carousel slide" style=" width:550px;height:350px,max-width:100%">
      <div class="carousel-indicators" style="height:20px">`;

    for (let i = 0; i < arrayImg.length; i++) {
        productCard += `
        <button  type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide-to="${i}"
        class="${i === 0 ? ' active' : ''}"
        aria-label="Slide ${i}"
        aria-current="true"
      ></button>`;
    }

    productCard += `</div>
                <div class="carousel-inner">`;

    for (let i = 0; i < arrayImg.length; i++) {
        productCard += `
    <div class="carousel-item ${i === 0 ? ' active' : ''}">
      <svg class="bd-placeholder-img bd-placeholder-img-lg d-block w-100"
        width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"
        role="img" preserveAspectRatio="xMidYMid slice" focusable="false">
          <image xlink:href="${arrayImg[i]}" width="100%" height="100%" style="object-fit: cover;">
      </svg>
    </div>
  `;
    }

    productCard += `
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
      </a>
    </div>`;

    return productCard;
}

// Parte de Comentarios
function getComments() {
    fetch(PRODUCT_INFO_COMMENTS_URL + productID + EXT_TYPE)
        .then((response) => response.json())
        .then((comments) => {
            apiComments = comments; // Actualiza los comentarios de la API
            displayComments(apiComments.concat(localComments)); // Muestra todos los comentarios
        })
        .catch((error) => {
            console.error("Error al obtener los comentarios:", error);
        });
}

function displayComments(comments) {
    const commentsList = document.getElementById("comments-list");

    // Limpia cualquier comentario existente
    commentsList.innerHTML = "";

    // Muestra los comentarios en el orden deseado
    comments.forEach((comment) => {
        const li = document.createElement("li");
        li.textContent = comment.user + ": " + comment.description + " " + stars(comment.score) + " " + comment.dateTime.split(' ')[0];
        commentsList.appendChild(li);
    });

    // Guarda los comentarios locales actualizados en el localStorage
    localStorage.setItem("comments", JSON.stringify(localComments));
}

// Agregar un evento al botón para manejar el envío de comentarios
submitButton.addEventListener("click", function (e) {
    e.preventDefault(); // Evitar que el formulario se envíe

    // Obtener el comentario del campo de texto
    const commentText = document.getElementById("comment-text").value;

    // Obtener la calificación seleccionada
    const rating = document.querySelector('input[name="rating"]:checked');

    // Verificar si el comentario no está vacío y se ha seleccionado una calificación
    if (commentText.trim() !== "" && rating) {
        // Obtener el nombre de usuario del localStorage
        const storedUsername = localStorage.getItem("username") || "Invitado";

        // Crear un objeto para representar el nuevo comentario
        const newComment = {
            user: storedUsername,
            description: commentText,
            score: parseInt(rating.value),
            dateTime: new Date().toISOString().split('T')[0],
        };

        // Agregar el nuevo comentario a la lista de comentarios locales
        localComments.push(newComment);

        // Mostrar los comentarios actualizados
        displayComments(apiComments.concat(localComments));

        // Limpiar el campo de comentario y la selección de calificación
        document.getElementById("comment-text").value = "";
        rating.checked = false; // Desmarcar la calificación seleccionada
    } else {
        // Si falta el comentario o la calificación, muestra un mensaje de error o toma la acción apropiada
        alert("Por favor, ingresa un comentario y selecciona una calificación.");
    }
});

$(document).ready(function () {

    // Inicializa el carrusel
    const myCarousel = $('#carouselExampleIndicators');
    myCarousel.carousel();

    // Controla manualmente la transición del carrusel
    $('#carousel-control-prev').click(function () {
        myCarousel.carousel('prev');
    });

    $('#carousel-control-next').click(function () {
        myCarousel.carousel('next');
    });
});

// Función para manejar el clic en una estrella
function handleStarClick(event) {
    const clickedStar = event.target;
    const rating = clickedStar.getAttribute("for").replace("star", "");

    // Resalta las estrellas seleccionadas y las anteriores
    ratingLabels.forEach((starLabel) => {
        const star = starLabel.previousElementSibling;
        const starNumber = star.getAttribute("id").replace("star", "");

        if (starNumber <= rating) {
            star.checked = true;
            starLabel.classList.add("active");
        } else {
            star.checked = false;
            starLabel.classList.remove("active");
        }
    });
}

// Agrega el evento clic a las etiquetas de estrellas
ratingLabels.forEach((starLabel) => {
    starLabel.addEventListener("click", handleStarClick);
});

function stars(score) {
    const puntuacionEntera = Math.round(score);
    const estrellasLlenas = puntuacionEntera;

    const resultado = '⭐'.repeat(estrellasLlenas);
    return `${resultado}`;
}

// Deberia mostrar las estrellas como ese simbolo pero no funciona
// function stars(score) {
//     const puntuacionEntera = Math.round(score); // Redondea al entero más cercano
//     const estrellasLlenas = puntuacionEntera; // Estrellas llenas
//     const estrellasVacias = 5 - puntuacionEntera; // Estrellas vacías

//     const resultado = '⭐'.repeat(estrellasLlenas) + `&#9733;`.repeat(estrellasVacias);
//     return `${resultado}`;
// }

function setProductsID(id) {
    localStorage.setItem("productID", id);
    window.location = "product-info.html"
}

buttonAddCart.addEventListener('click', function () {
    let url = 'PRODUCT_INFO_URL' + productID + 'EXT_TYPE';

    getJSONData(url)
        .then(function (response) {
            if (response.status === 'ok') {
                // Procesa la data aquí si la solicitud fue exitosa
                console.log(response.data);

                // Agrega la data a la variable global arrayItemCart
                arrayItemCart.push(response.data);

                // Verifica que se haya guardado correctamente
                console.log(arrayItemCart);
            } else {
                // Procesa el error aquí si la solicitud falló
                console.error(response.data);
            }
        })
        .catch(function (error) {
            // Maneja errores en la petición o parseo del JSON
            console.error(error);
        });
});