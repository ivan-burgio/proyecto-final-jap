//Comentarios por producto
const comentarioCDE     = require("../../products_comments/40281.json");
const comentarioODP     = require("../../products_comments/50741.json");
const comentarioPDB     = require("../../products_comments/50742.json");
const comentarioPS5     = require("../../products_comments/50743.json");
const comentarioBici    = require("../../products_comments/50744.json");
const comentarioCOJ     = require("../../products_comments/50921.json");
const comentarioFW      = require("../../products_comments/50922.json");
const comentarioSC      = require("../../products_comments/50923.json");
const comentarioP208    = require("../../products_comments/50924.json");
const comentarioBC      = require("../../products_comments/50925.json");
const comentarioJDC     = require("../../products_comments/60801.json");
const comentarioSofa    = require("../../products_comments/60802.json");
const comentarioArmario = require("../../products_comments/60803.json");
const comentarioMDC     = require("../../products_comments/60804.json");

const getIdComment = (id) => {
  
    switch (id) {
        case 40281:
            return comentarioCDE;
        case 50741:
            return comentarioODP;
        case 50742:
            return comentarioPDB;
        case 50743:
            return comentarioPS5;
        case 50744:
            return comentarioBici;
        case 50921:
            return comentarioCOJ;
        case 50922:
            return comentarioFW;
        case 50923:
            return comentarioSC;
        case 50924:
            return comentarioP208;
        case 50925:
            return comentarioBC;
        case 60801:
            return comentarioJDC;
        case 60802:
            return comentarioSofa;
        case 60803:
            return comentarioArmario;
        case 60804:
            return comentarioMDC;
        default:
            return { mensaje: "Comentarios no encontrados para el producto" };
    }
    
    
};

module.exports = {
    getIdComment,
};
