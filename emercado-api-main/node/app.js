const express = require("express");
const jsonwebtoken = require("jsonwebtoken");

const app = express(); // Instancia de express
const puerto = 3000; // Indico en que puerto voy a escucuhar
app.use(express.json());

// Listas de Productos
let categorias = require("../cats/cat.json");
let autos = require("../cats_products/101.json");
let juguetes = require("../cats_products/102.json");
let muebles = require("../cats_products/103.json");
let herramientas = require("../cats_products/104.json");
let computadoras = require("../cats_products/105.json");
let vestimenta = require("../cats_products/106.json");
let electrodomesticos = require("../cats_products/107.json");
let deporte = require("../cats_products/108.json");
let celulares = require("../cats_products/109.json");

// Productos
let ComputadoraDeEscritorio = require("../products/40281.json");
let OsoDePeluche = require("../products/50741.json");
let PelotaDeBasquetbol = require("../products/50742.json");
let PlayStation5 = require("../products/50743.json");
let Bicicleta = require("../products/50744.json");
let ChevroletOnixJoy = require("../products/50921.json");
let FiatWay = require("../products/50922.json");
let SuzukiCelerio = require("../products/50923.json");
let Peugeot208 = require("../products/50924.json");
let BugattiChiron = require("../products/50925.json");
let JuegoDeComedor = require("../products/60801.json");
let Sofa = require("../products/60802.json");
let Armario = require("../products/60803.json");
let MesaDeCentro = require("../products/60804.json");

//Comentarios por producto
let comentarioCDE = require("../products_comments/40281.json");
let comentarioODP = require("../products_comments/50741.json");
let comentarioPDB = require("../products_comments/50742.json");
let comentarioPS5 = require("../products_comments/50743.json");
let comentarioBici = require("../products_comments/50744.json");
let comentarioCOJ = require("../products_comments/50921.json");
let comentarioFW = require("../products_comments/50922.json");
let comentarioSC = require("../products_comments/50923.json");
let comentarioP208 = require("../products_comments/50924.json");
let comentarioBC = require("../products_comments/50925.json");
let comentarioJDC = require("../products_comments/60801.json");
let comentarioSofa = require("../products_comments/60802.json");
let comentarioArmario = require("../products_comments/60803.json");
let comentarioMDC = require("../products_comments/60804.json");

// Carrito Usuario
let cartUser = require("../user_cart/25801.json");

// ------------------------------ ROUTER ------------------------------
app.get("/", (req, res) => {
    // El primer parámetro SIEMPRE es asociado a la request (petición) y el segundo a la response (respuesta)
    res.send("<h1>jeje</h1>");
});

// Esta línea inicia el servidor para que escuche peticiones en el puerto indicado
app.listen(puerto, () => {
    console.log(`Servidor funciona uwu`);
});

app.get("/categorias", (req, res) => {
    res.json(categorias);
});

app.get("/categorias/:id", (req, res) => {
    let id = parseInt(req.params.id);

    switch (id) {
        case 101:
            res.json(autos);
        case 102:
            res.json(juguetes);
        case 103:
            res.json(muebles);
        case 104:
            res.json(herramientas);
        case 105:
            res.json(computadoras);
        case 106:
            res.json(vestimenta);
        case 107:
            res.json(electrodomesticos);
        case 108:
            res.json(deporte);
        case 109:
            res.json(celulares);
        default:
            res.status(404).json({ mensaje: "Categoría no encontrada" });
    }
});

app.get("/producto/:id", (req, res) => {
    let id = parseInt(req.params.id);

    switch (id) {
        case 40281:
            res.json(ComputadoraDeEscritorio);
        case 50741:
            res.json(OsoDePeluche);
        case 50742:
            res.json(PelotaDeBasquetbol);
        case 50743:
            res.json(PlayStation5);
        case 50744:
            res.json(Bicicleta);
        case 50921:
            res.json(ChevroletOnixJoy);
        case 50922:
            res.json(FiatWay);
        case 50923:
            res.json(SuzukiCelerio);
        case 50924:
            res.json(Peugeot208);
        case 50925:
            res.json(BugattiChiron);
        case 60801:
            res.json(JuegoDeComedor);
        case 60802:
            res.json(Sofa);
        case 60803:
            res.json(Armario);
        case 60804:
            res.json(MesaDeCentro);
        default:
            res.status(404).json({ mensaje: "Producto no encontrado uwu" });
    }
});

app.get("/comentario/:id", (req, res) => {
    let id = parseInt(req.params.id);

    switch (id) {
        case 40281:
            res.json(comentarioCDE);
        case 50741:
            res.json(comentarioODP);
        case 50742:
            res.json(comentarioPDB);
        case 50743:
            res.json(comentarioPS5);
        case 50744:
            res.json(comentarioBici);
        case 50921:
            res.json(comentarioCOJ);
        case 50922:
            res.json(comentarioFW);
        case 50923:
            res.json(comentarioSC);
        case 50924:
            res.json(comentarioP208);
        case 50925:
            res.json(comentarioBC);
        case 60801:
            res.json(comentarioJDC);
        case 60802:
            res.json(comentarioSofa);
        case 60803:
            res.json(comentarioArmario);
        case 60804:
            res.json(comentarioMDC);
        default:
            res.status(404).json({ mensaje: "Comentarios no encontrados para el producto" });
    }
});