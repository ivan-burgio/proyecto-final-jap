const productID         = localStorage.getItem("productID");
const containerInfo     = document.getElementById("container-Info");
const commentsList      = document.getElementById("comments-list");
const noCommentsMessage = document.getElementById("no-comments-message");
const submitButton      = document.getElementById("submit-comment");

document.addEventListener("DOMContentLoaded", function () {
  getDataProduct();
});

function getDataProduct() {
  fetch(PRODUCT_INFO_URL + productID + EXT_TYPE)
    .then((response) => response.json())
    .then((result) => {
      showProductInfo(result);
      getComments(result.id);
    })
    .catch((error) => {
      console.error('Error en la solicitud:', error);
    });
}

function showProductInfo(result) { 
  containerInfo.innerHTML = '';

  let productCard = `
    <div id="${result.id} style="width:80%;height:auto;" style="padding:5%;">
    <p> ${result.cost} ${result.currency}</p>
    
    
        ${getHTMLCarousel(result.images)}
    
      <div style="margin-left:5%">
        <h2>${result.name}</h2>
        <hr>
        <div>
        <p> ${result.cost} ${result.currency}</p>
        <p>Descripción ${result.description}</p>
        <p>${result.category}</p>
        <p>${result.soldCount} vendidos</p>
      </div>
     
    </div>`;
  containerInfo.innerHTML += productCard;
}

function getHTMLCarousel(arrayImg){
debugger; 
    let productCard = `
    <div id="carouselExampleIndicators" class="carousel slide" style="width:40%;height:150%">
      <div class="carousel-indicators" style="background-color:black;height:20px">`;

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
    <div class="carousel-item ${i === 0 ? ' active' : ''}" style="width:550px;height:350px">
      <svg class="bd-placeholder-img bd-placeholder-img-lg d-block w-100"
        width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"
        role="img" preserveAspectRatio="xMidYMid slice" focusable="false">
          <image xlink:href="${arrayImg[i]}" width="100%" height="100%">
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
      if (comments.length > 0) {
        displayComments(comments);
        noCommentsMessage.style.display = "none"; // Ocultar el mensaje
      } else {
        noCommentsMessage.textContent = "No hay comentarios disponibles.";
      }
    })
    .catch((error) => {
      console.error("Error al obtener los comentarios:", error);
    });
}

function displayComments(comments) {
  const commentsList = document.getElementById("comments-list");

  comments.forEach((comment) => {
    const li = document.createElement("li");
    li.textContent = comment.user + ": " + comment.description; // Mostrar nombre de usuario y comentario
    commentsList.appendChild(li);
  });
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
      dateTime: new Date().toISOString(),
    };

    // Obtener los comentarios existentes del localStorage
    const existingComments = JSON.parse(localStorage.getItem("comments[comments.length - 1]")) || [];

    // Agregar el nuevo comentario a la lista de comentarios
    existingComments.push(newComment);

    // Guardar la lista actualizada en el localStorage
    localStorage.setItem("comments", JSON.stringify(existingComments));

    // Mostrar los comentarios actualizados
    displayComments(existingComments);

    // Limpiar el campo de comentario y la selección de calificación
    document.getElementById("comment-text").value = "";
    rating.checked = false; // Desmarcar la calificación seleccionada
  } else {
    // Si falta el comentario o la calificación, muestra un mensaje de error o toma la acción apropiada
    alert("Por favor, ingresa un comentario y selecciona una calificación.");
  }
});


$(document).ready(function() {
  
  // Inicializa el carrusel
  const myCarousel = $('#carouselExampleIndicators');
  myCarousel.carousel();

  // Controla manualmente la transición del carrusel
  $('#carousel-control-prev').click(function() {
    myCarousel.carousel('prev');
  });

  $('#carousel-control-next').click(function() {
    myCarousel.carousel('next');
  });
});
