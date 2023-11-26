const categories        = require('../../cats/cat.json');
const autos             = require("../../cats_products/101.json");
const juguetes          = require("../../cats_products/102.json");
const muebles           = require("../../cats_products/103.json");
const herramientas      = require("../../cats_products/104.json");
const computadoras      = require("../../cats_products/105.json");
const vestimenta        = require("../../cats_products/106.json");
const electrodomesticos = require("../../cats_products/107.json");
const deporte           = require("../../cats_products/108.json");
const celulares         = require("../../cats_products/109.json");

const getCategories = () => {
    return categories;
};

const getCategoriesId = (id) => {
    switch (id) {
        case 101:
            return autos;
        case 102:
            return juguetes;
        case 103:
            return muebles;
        case 104:
            return herramientas;
        case 105:
            return computadoras;
        case 106:
            return vestimenta;
        case 107:
            return electrodomesticos;
        case 108:
            return deporte;
        case 109:
            return celulares;
        default:
            return null;
    }
};

module.exports = {
    getCategories,
    getCategoriesId
};
