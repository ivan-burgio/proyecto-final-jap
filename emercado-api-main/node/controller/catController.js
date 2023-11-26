const catModel = require('../model/catModel');

const getCategories = (req, res) => {
    const categories = catModel.getCategories();
    res.json(categories);
};


const getIdCategories = (req, res) => {
    const id = parseInt(req.params.id);
    const categoryData = catModel.getCategoriesId(id);

    if (categoryData) {
        res.json(categoryData);
    } else {
        res.status(404).json({ mensaje: "Categoría no encontrada" });
    }
};

module.exports = {
    getCategories,
    getIdCategories
};
