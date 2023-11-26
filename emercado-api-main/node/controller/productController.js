const productModel = require('../model/productModel');


const getIdProduct = (req, res) => {
    const id = parseInt(req.params.id);
    const productData = productModel.getIdProduct(id);

    if (productData) {
        res.json(productData);
    } else {
        res.status(404).json({ mensaje: "Producto no encontrado" });
    }
};

module.exports = {
    getIdProduct
};
