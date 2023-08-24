const catID = localStorage.getItem("catID");
const productContainer = document.getElementById("product-list-container"); 

fetch(PRODUCTS_URL + catID + EXT_TYPE)
  .then(response => response.json())
  .then(result => {
    if (result.catID == catID && result.products.length > 0) { // Verificar el catID si es necesario
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
      const alertProducts = `
      <div class="alert alert-success" role="alert">
        <h4 class="alert-heading">¡No hay artículos!</h4>
          <p>En este momento no se encuentra ningún articulo disponible para esta categoría.</p>
      <hr>
          <p class="mb-0">Si deseas vender un articulo, dirígete a nuestra zona de <a href="sell.html" target="_blank">venta</a>.</p>
    </div>
    `
      productContainer.innerHTML += alertProducts;

      console.error('No se encontraron productos para la categoría especificada.');
    }
  })
  .catch(error => {
    console.error('Error en la solicitud:', error);
  });