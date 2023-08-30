const catID = localStorage.getItem("catID");
const productContainer = document.getElementById("product-list-container"); 
let currentProductsArray = [];
let minCost = undefined;
let maxCost = undefined;
let botonFiltrado;


  function getDataProduct(){
    fetch(PRODUCTS_URL + catID + EXT_TYPE)
      .then(response => response.json())
      .then(result => {
          currentProductsArray = result.products;
          showProductList();
      })
      .catch(error => {
        console.error('Error en la solicitud:', error);
      });
  }

  function showProductList(){
    if(currentProductsArray.length !== 0){

      if(botonFiltrado === true){
        const productCard = `
          <div class="row list-group-item d-flex justify-content-start"></div>`;
          productContainer.innerHTML = productCard;
      }
        currentProductsArray.forEach(producto => {
          let productCard = "";
          if (((minCost == undefined) || (minCost != undefined && parseInt(producto.cost) >= minCost)) &&
              ((maxCost == undefined) || (maxCost != undefined && parseInt(producto.cost) <= maxCost))){
                productCard = `
                  <div class="row list-group-item d-flex justify-content-start">
                    <div class="col-3">
                      <img src="${producto.image}" alt="${producto.name}" style="max-width: 100%; height: auto;">
                    </div>
                    <div class="col-7">
                      <h3>${producto.name} - USD ${producto.cost}</h3>
                      <p>${producto.description}</p>
                    </div>
                    <div class="col-2 text-muted text-end">
                        <small>${producto.soldCount} vendidos</small>
                    </div>
                  </div>`;
          } 
        productContainer.innerHTML += productCard;
        });
    }else{
      const alertProducts = `
        <div class="alert-empty-product" role="alert">
          <h4 class="alert-heading">¡No hay artículos!</h4>
          <p>En este momento no se encuentra ningún articulo disponible para esta categoría.</p>
        <hr>
          <p class="mb-0">Si deseas vender un articulo, dirígete a nuestra zona de <a href="sell.html" target="_blank">venta</a>.</p>
        </div>`;
        productContainer.innerHTML += alertProducts;
        console.error('No se encontraron productos para la categoría especificada.');
    }      
  }

document.addEventListener("DOMContentLoaded", function(e){

  getDataProduct();

  document.getElementById("sortAsc").addEventListener("click", function(){
      sortAndShowCategories(ORDER_ASC_BY_NAME);
  });

  document.getElementById("sortDesc").addEventListener("click", function(){
      sortAndShowCategories(ORDER_DESC_BY_NAME);
  });

  document.getElementById("sortByCost").addEventListener("click", function(){
      sortAndShowCategories(ORDER_BY_PROD_COUNT);
  });

  document.getElementById("clearRangeFilter").addEventListener("click", function(){
      document.getElementById("rangeFilterCostMin").value = "";
      document.getElementById("rangeFilterCostMax").value = "";

      minCost = undefined;
      maxCost = undefined;

      showProductList();
  });

  document.getElementById("rangeFilterCost").addEventListener("click", function(){
      //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
      //de productos por categoría.

      botonFiltrado = true;

      minCost = document.getElementById("rangeFilterCostMin").value;
      maxCost = document.getElementById("rangeFilterCostMax").value;

      if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0){
          minCost = parseInt(minCost);
      }
      else{
          minCost = undefined;
      }

      if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0){
          maxCost = parseInt(maxCost);
      }
      else{
          maxCost = undefined;
      }
      showProductList();
  });
});