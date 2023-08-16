
getJSONData("https://japceibal.github.io/emercado-api/products/101.json")
  .then(result => {
    if (result.status === 'ok') {
      const productContainer = document.getElementById("product-list-container"); 
      

      result.data.forEach(producto => {
        const productCard = ` <div class"row list-group-item d-flex justify-content-start">
          <div class="col-3">
            <img src="${producto.imgSrc}" alt="${producto.name}">
            </div>
            <div class="col-7">
            <h3>${producto.name}</h3>
            <p>${producto.description}</p>
            </div>
            <div class="col-2 text muted">
            <small>Product Count: ${producto.price}</small>
            </div>
          </div>
        `;
        productContainer.innerHTML += productCard;
      });

      console.log('Datos obtenidos:', result.data);
    } else {
      console.error('Ocurrió un error:', result.data);
    }
  })
  .catch(error => {
    console.error('Error en la solicitud:', error);
  });
