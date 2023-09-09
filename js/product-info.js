const productID = localStorage.getItem("productID");
const containerInfo = document.getElementById("container-Info");
const commentsList = document.getElementById("comments-list");
const noCommentsMessage = document.getElementById("no-comments-message");

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
    <div id="${result.id}" 
      <div>
        <h2>${result.name}</h2>
        <hr>
        <div>
        <p>Precio: ${result.currency} - ${result.cost}</p>
        <p>Descripción: ${result.description}</p>
        <p>Categoría: ${result.category}</p>
        <p>Cantidad de vendidos: ${result.soldCount}</p>
        <img src="${result.images[0]}">
      </div>
      
    </div>`;
  containerInfo.innerHTML += productCard;
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
  commentsList.innerHTML = ""; // Limpiar la lista de comentarios

  comments.forEach((comment) => {
    const li = document.createElement("li");
    li.textContent = `${comment.user} - ${comment.description} (${comment.score}) - ${comment.dateTime}`;
    commentsList.appendChild(li);
  });
}