const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
let currentCategoriesArray = [];
let arregloFiltrar = [];
let currentSortCriteria = ORDER_ASC_BY_NAME;
let minCount = undefined;
let maxCount = undefined;

function sortCategories(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME)
    {
        result = array.sort(function(a, b) {
            if ( a.name < b.name ){ return -1; }
            if ( a.name > b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_NAME){
        result = array.sort(function(a, b) {
            if ( a.name > b.name ){ return -1; }
            if ( a.name < b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.productCount);
            let bCount = parseInt(b.productCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function setCatID(id) {
    localStorage.setItem("catID", id);
    window.location = "products.html"
}

function showCategoriesList(currentCategoriesFilter){

    let categoriesToDisplay;
    if(currentCategoriesFilter != undefined && currentCategoriesFilter.length !== 0){
        categoriesToDisplay = currentCategoriesFilter;
    }else{
        categoriesToDisplay = currentCategoriesArray;
    }

    let htmlContentToAppend = "";
    for(let i = 0; i < categoriesToDisplay.length; i++){
        let category = categoriesToDisplay[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(category.productCount) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(category.productCount) <= maxCount))){

            htmlContentToAppend += `
            <div onclick="setCatID(${category.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${category.imgSrc}" alt="${category.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${category.name}</h4>
                            ${outOfStock(category.productCount).outerHTML} 
                        </div>
                        <p class="mb-1">${category.description}</p>
                    </div>
                </div>
            </div>
            `
        }

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
}

//Agrega las clases correspondientes según la cantidad de artículos 
function outOfStock(productCount){
     const smallProductCount = document.createElement("small")
    
    if (productCount === 0){
      
        smallProductCount.classList.add("sinStock-style")
        smallProductCount.textContent ='Sin stock';

    }else {
     smallProductCount.textContent  = productCount + ' artículos';
     smallProductCount.classList.add("text-muted")
    }  
   return smallProductCount
}


function sortAndShowCategories(sortCriteria){

    currentSortCriteria = sortCriteria;

    let arrayCategoriesFilter;
    //Si hay datos ya filtrados por el buscador toma esos sino, todo el listado
    if(arregloFiltrar != undefined && arregloFiltrar.length !== 0){
        arrayCategoriesFilter = arregloFiltrar;
    }else{
        arrayCategoriesFilter = currentCategoriesArray;
    }

    dataSorted = sortCategories(currentSortCriteria, arrayCategoriesFilter);

    // Muestro las categorías ordenadas
    showCategoriesList(dataSorted);
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CATEGORIES_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentCategoriesArray = resultObj.data
            showCategoriesList();
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_ASC_BY_NAME);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_DESC_BY_NAME);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowCategories(ORDER_BY_PROD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showCategoriesList(arregloFiltrar); //arregloFiltrar por si hay datos ya filtrados por el buscador
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showCategoriesList(arregloFiltrar); //arregloFiltrar por si hay datos ya filtrados por el buscador
    });

 
    // Obtener referencia al campo de búsqueda por su ID
    const searchInput = document.getElementById("searchInputC");

        searchInput.addEventListener("keyup", function(event) {
        
            // Obtener el valor del campo de búsqueda y limpiar espacios en blanco
            let searchText = event.target.value.trim().toLowerCase();
            
            // Filtrar categorías según el texto de búsqueda
            let filteredCategories = currentCategoriesArray.filter(function(category){
                // Verificar si el nombre de la categoría contiene el texto de búsqueda en minúsculas
                return category.name.toLowerCase().includes(searchText);
            });

            //Array Gral para que quede guardada la busqueda y se trabaje en ella ej para ordenar
            arregloFiltrar = filteredCategories;

            // Mostrar las categorías filtradas
            if(arregloFiltrar.length !== 0){
                searchInput.style.borderColor = "#3498db";
                showCategoriesList(arregloFiltrar);
            }else{
                searchInput.style.borderColor = "red";
            }
        });

        //Evalua si está en modo oscuro o claro la pagina desde el local storge
        const storedTheme = localStorage.getItem('theme');

        if (storedTheme === 'dark') {
          document.documentElement.setAttribute('data-bs-theme', 'dark');
          document.body.classList.add('dark-mode');
          addModoDark(1)
        } else {
          document.documentElement.setAttribute('data-bs-theme', 'light');
          addModoDark(0)
        }
})



        document.getElementById('btnSwitch').addEventListener('click',()=>{
            const storedTheme = localStorage.getItem('theme');

            if (storedTheme === 'dark') {
                document.documentElement.setAttribute('data-bs-theme','light')
                document.body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light'); // Almacena el tema en localStorage
                addModoDark(0)
            }
            else {
                document.documentElement.setAttribute('data-bs-theme','dark')
                document.body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark'); // Almacena el tema en localStorage
                addModoDark(1)
            }
        })

        function addModoDark(modo){
            let modoOscuro = document.getElementById('btnSwitch');
            let icono = '';
            if(modo === 1){
                icono = `<ion-icon name="sunny-outline"></ion-icon> 
                            Modo claro
                        `;
                            
            }else if(modo === 0){
                icono = `<ion-icon name="moon-outline"></ion-icon>
                            Modo oscuro
                        `;
            }
            let html = `${icono}`;

            modoOscuro.innerHTML = '';
            modoOscuro.innerHTML = html;
        }

