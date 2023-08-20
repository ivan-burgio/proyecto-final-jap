fetch("https://japceibal.github.io/emercado-api/cats_products/101.json")
  .then(response => response.json())
  .then(result => {
    if (result.catID === 101) { // Verificar el catID si es necesario
      const productContainer = document.getElementById("product-list-container"); 
      
      result.products.forEach(producto => {
        const productCard = `
          <div class="row list-group-item d-flex justify-content-start">
            <div class="col-3">
              <img src="${producto.image}" alt="${producto.name}" style="max-width: 100%; height: auto;">
            </div>
            <div class="col-7">
              <h3>${producto.name} - USD ${producto.cost}</h3>
              <p>${producto.description}</p>
              </div>
              <div class="col-2 text-muted text-end" >
              <small>${producto.soldCount} vendidos</small>
            </div>
            </div>
            
          </div>
        `;
        productContainer.innerHTML += productCard;
      });

      console.log('Datos obtenidos:', result);
    } else {
      console.error('No se encontraron productos para la categoría especificada.');
    }
  })
  .catch(error => {
    console.error('Error en la solicitud:', error);
  });