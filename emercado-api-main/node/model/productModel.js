// Productos
const ComputadoraDeEscritorio   = require("../../products/40281.json");
const OsoDePeluche              = require("../../products/50741.json");
const PelotaDeBasquetbol        = require("../../products/50742.json");
const PlayStation5              = require("../../products/50743.json");
const Bicicleta                 = require("../../products/50744.json");
const ChevroletOnixJoy          = require("../../products/50921.json");
const FiatWay                   = require("../../products/50922.json");
const SuzukiCelerio             = require("../../products/50923.json");
const Peugeot208                = require("../../products/50924.json");
const BugattiChiron             = require("../../products/50925.json");
const JuegoDeComedor            = require("../../products/60801.json");
const Sofa                      = require("../../products/60802.json");
const Armario                   = require("../../products/60803.json");
const MesaDeCentro              = require("../../products/60804.json");

const getIdProduct = (id) => {
  
    switch (id) {
        case 40281:
            return ComputadoraDeEscritorio;
        case 50741:
            return OsoDePeluche;
        case 50742:
            return PelotaDeBasquetbol;
        case 50743:
            return PlayStation5;
        case 50744:
            return Bicicleta;
        case 50921:
            return ChevroletOnixJoy;
        case 50922:
            return FiatWay;
        case 50923:
            return SuzukiCelerio;
        case 50924:
            return Peugeot208;
        case 50925:
            return BugattiChiron;
        case 60801:
            return JuegoDeComedor;
        case 60802:
            return Sofa;
        case 60803:
            return Armario;
        case 60804:
            return MesaDeCentro;
        default:
            return null;
    }
    
};

module.exports = {
    getIdProduct,
};
