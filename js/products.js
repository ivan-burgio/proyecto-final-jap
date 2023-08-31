const catID = localStorage.getItem("catID");
const productContainer = document.getElementById("product-list-container");
const script = document.getElementById("script");
let currentProductsArray = [];
let minCost = undefined;
let maxCost = undefined;
let botonFiltrado;
const ORDER_ASC_BY_COST = "menor a mayor";
const ORDER_DESC_BY_COST = "mayor a menor";
const ORDER_BY_PROD_SOLDCOUNT = "Cant.";

function getDataProduct(){
  //Consulta a la API que trae los datos 'Producto' a mostrar
  fetch(PRODUCTS_URL + catID + EXT_TYPE)
    .then(response => response.json())
    .then(result => {
        currentProductsArray = result.products;
        showProductList();
        searchProducts(currentProductsArray);
    })
    .catch(error => {
      console.error('Error en la solicitud:', error);
    });
}

//Función que inserta la estructura HTML con los datos de producto en el contenedor div 
function showProductList(productsArray) {
  // Si no se proporciona un array de productos, usamos el array completo
  const productsToDisplay = productsArray || currentProductsArray;

  // Limpiamos el contenido del contenedor de productos
  productContainer.innerHTML = '';

  if (productsToDisplay.length !== 0) {
    let count = 0;
    productsToDisplay.forEach(producto => {
      let productCard = '';
      // Filtramos por rango de precio si es necesario
      if (
        ((minCost === undefined) || (minCost !== undefined && parseInt(producto.cost) >= minCost)) &&
        ((maxCost === undefined) || (maxCost !== undefined && parseInt(producto.cost) <= maxCost))
      ) {
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
        productContainer.innerHTML += productCard;
        count += 1;
      }
    });

    if (count === 0) {
      // No hay productos en este rango
    }
  } else {
    // No hay productos disponibles
  }
}

  

// Esta funcion spamea muchas alertas, una detras de otra, revisar luego
function alertNoData(){
  alert("No hay productos en este rango");

  //Se marca indefinida las variables
  minCost = undefined;
  maxCost = undefined;

  //Se llama a la funcion que inserta la estructura HTML en el contenedor
  showProductList();
}

document.addEventListener("DOMContentLoaded", function(e){

  //Función que trae los datos de la API
  getDataProduct();
  searchProducts(currentProductsArray);

  //sortAsc sortDesc sortByCost botones que ordena el listado
  document.getElementById("sortAsc").addEventListener("click", function(){
      sortAndShowProducts(ORDER_ASC_BY_COST);
  });

  document.getElementById("sortDesc").addEventListener("click", function(){
      sortAndShowProducts(ORDER_DESC_BY_COST);
  });

  document.getElementById("sortByCost").addEventListener("click", function(){
      sortAndShowProducts(ORDER_BY_PROD_SOLDCOUNT);
  });

  document.getElementById("clearRangeFilter").addEventListener("click", function(){

      //Se borra lo ingresado por el usuario en los campos rango de precio
      document.getElementById("rangeFilterCostMin").value = "";
      document.getElementById("rangeFilterCostMax").value = "";

      //Se marca indefinida las variables
      minCost = undefined;
      maxCost = undefined;
    
      //Se llama a la funcion que inserta la estructura HTML en el contenedor
      showProductList();
  });

  document.getElementById("rangeFilterCost").addEventListener("click", function(){
      //Obtengo el mínimo y máximo de los intervalos para filtrar por precio

      //Contenedor listado queda vacio, para luego mostrar los datos filtrados
      productContainer.innerHTML = '';

      //Guardamos los datos de los campo minimo y maximo
      minCost = document.getElementById("rangeFilterCostMin").value;
      maxCost = document.getElementById("rangeFilterCostMax").value;

      //Se guarda como nro entero o indefinido segun corresponda
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

      //Llamamos a la función que que muestra el listado
      showProductList();
  });
});

function sortAndShowProducts(sortCriteria, productsArray){
  currentSortCriteria = sortCriteria;

  if(productsArray != undefined){
    currentProductsArray = productsArray;
  }

  //Se llama a la función que ordena el array
  currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);
  productContainer.innerHTML = "";

  //Muestro los productos ordenadaos
  showProductList();

}

function sortProducts(criteria, array){
  //Ordena el array que luego se va a mostrar, segun el boton cliceado
  let result = [];

  if (criteria === ORDER_ASC_BY_COST)
  {
      result = array.sort(function(a, b) {
          if ( a.cost < b.cost ){ return -1; }
          if ( a.cost > b.cost ){ return 1; }
          return 0;
      });
  }else if (criteria === ORDER_DESC_BY_COST){
      result = array.sort(function(a, b) {
          if ( a.cost > b.cost ){ return -1; }
          if ( a.cost < b.cost ){ return 1; }
          return 0;
      });
  }else if (criteria === ORDER_BY_PROD_SOLDCOUNT){
      result = array.sort(function(a, b) {
          let asoldCount = parseInt(a.soldCount);
          let bsoldCount = parseInt(b.soldCount);

          if ( asoldCount > bsoldCount ){ return -1; }
          if ( asoldCount < bsoldCount ){ return 1; }
          return 0;
      });
  }

  return result;
}

function searchProducts(productsArray) {
  const productSearchInput = document.getElementById("searchInputP");

  productSearchInput.addEventListener("keyup", function(event) {
    const searchText = event.target.value.trim().toLowerCase();

    // Filtramos los productos según el texto de búsqueda
    const filteredProducts = filterProducts(productsArray, searchText);

    // Mostramos los productos filtrados
    showProductList(filteredProducts);
  });
}


function filterProducts(productsArray, searchText) {
  return productsArray.filter(function(product) {
    return product.name.toLowerCase().includes(searchText);
  });
}