const productID = localStorage.getItem("productID");
const containerInfo = document.getElementById("container-Info");

//document.addEventListener("DOMContentLoaded", function () {
  //getDataProduct();

  document.addEventListener('DOMContentLoaded', function() {
    let url = PRODUCT_INFO_URL + productID + EXT_TYPE;
    getJSONData(url)
    .then(function(result) {
        showProductInfo(result);
    });


  function showProductInfo(result) { 
    console.log(result)
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
});

    