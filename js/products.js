const catID = localStorage.getItem("catID");
const productContainer = document.getElementById("product-list-container");
const script = document.getElementById("script");
let currentProductsArray = [];
let arregloFiltrar = [];
let minCost = undefined;
let maxCost = undefined;
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
    })
    .catch(error => {
      console.error('Error en la solicitud:', error);
    });
}

//Función que inserta la estructura HTML con los datos de producto en el contenedor div 
function showProductList(currentProductsFilter) {

  
  let count = 0; 
  let productsToDisplay;
  // Si no se proporciona un array filtrado de productos, usamos el array completo
  if(currentProductsFilter != undefined && currentProductsFilter.length != 0){
    productsToDisplay = currentProductsFilter;
  }else{
    productsToDisplay = currentProductsArray;
  }

  // Limpiamos el contenido del contenedor de productos
  productContainer.innerHTML = '';
  let valor = false;
  if (productsToDisplay.length !== 0) {
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
    
    if(count == 0){
      //alertNoData();    //Función por arreglar
    }

  } else {
    // No hay productos disponibles
    //alertNoData(); //Funcion por arreglar
  }



}

function colorCelda(valor){ //Funcion por arreglar
   minCost = document.getElementById("rangeFilterCostMin");
   maxCost = document.getElementById("rangeFilterCostMax");

  if(valor == 0){
    minCost.style.borderColor = "red";
    maxCost.style.borderColor = "red";
  }else if(valor == 1){
    minCost.style.borderColor = "#3498db";
    maxCost.style.borderColor = "#3498db";
  }
  
}

// Esta funcion spamea muchas alertas, una detras de otra, revisar luego
function alertNoData(){
  alert("No hay productos en este rango");

  //Se marca indefinida las variables
  minCost = undefined;
  maxCost = undefined;

  //Se llama a la funcion que inserta la estructura HTML en el contenedor
  showProductList(arregloFiltrar);
}

document.addEventListener("DOMContentLoaded", function(e){

  //Función que trae los datos de la API
  getDataProduct();

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
      showProductList(arregloFiltrar); //arregloFiltrar por si hay datos ya filtrados por el buscador
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
      showProductList(arregloFiltrar); //arregloFiltrar por si hay datos ya filtrados por el buscador
  });


    // Obtener referencia al campo de búsqueda por su ID
    const searchInput = document.getElementById("searchInputP");
    searchInput.addEventListener("keyup", function(event) {
        // Obtener el valor del campo de búsqueda y limpiar espacios en blanco
        let searchText = event.target.value.trim().toLowerCase();

        // Filtrar productos según el texto de búsqueda
        let filteredProducts = currentProductsArray.filter(function(product){
            // Verificar si el nombre de la categoría contiene el texto de búsqueda en minúsculas
            return product.name.toLowerCase().includes(searchText);
        });


         //Array Gral para que quede guardada la busqueda y se trabaje en ella ej para ordenar
         arregloFiltrar = filteredProducts;

        // Mostrar los productos filtrados
        if(arregloFiltrar.length !== 0){
          searchInput.style.borderColor = "#3498db";
          showProductList(arregloFiltrar);
        }else{
          searchInput.style.borderColor = "red";
        }
    });

});

function sortAndShowProducts(sortCriteria){
  currentSortCriteria = sortCriteria;

  let arrayProductsFilter;
  //Si hay datos ya filtrados por el buscador toma esos sino, todo el listado
  if(arregloFiltrar != undefined && arregloFiltrar.length !== 0){
    arrayProductsFilter = arregloFiltrar;
  }else{
    arrayProductsFilter = currentProductsArray;
  }

  //Se llama a la función que ordena el array
  dataSorted = sortProducts(currentSortCriteria, arrayProductsFilter);

  //Muestro los productos ordenadaos
  showProductList(dataSorted);

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