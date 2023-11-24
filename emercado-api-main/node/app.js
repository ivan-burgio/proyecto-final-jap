const express = require("express");
const cors = require("cors");
const jsonwebtoken = require("jsonwebtoken");
const SECRET_KEY = "EL MEJOR SUBGRUPO";

const app = express(); // Instancia de express
const puerto = 3000; // Indico en que puerto voy a escucuhar
app.use(express.json());
app.use(cors());

// Listas de Productos
const categorias = require("../cats/cat.json");
const autos = require("../cats_products/101.json");
const juguetes = require("../cats_products/102.json");
const muebles = require("../cats_products/103.json");
const herramientas = require("../cats_products/104.json");
const computadoras = require("../cats_products/105.json");
const vestimenta = require("../cats_products/106.json");
const electrodomesticos = require("../cats_products/107.json");
const deporte = require("../cats_products/108.json");
const celulares = require("../cats_products/109.json");

// Productos
const ComputadoraDeEscritorio = require("../products/40281.json");
const OsoDePeluche = require("../products/50741.json");
const PelotaDeBasquetbol = require("../products/50742.json");
const PlayStation5 = require("../products/50743.json");
const Bicicleta = require("../products/50744.json");
const ChevroletOnixJoy = require("../products/50921.json");
const FiatWay = require("../products/50922.json");
const SuzukiCelerio = require("../products/50923.json");
const Peugeot208 = require("../products/50924.json");
const BugattiChiron = require("../products/50925.json");
const JuegoDeComedor = require("../products/60801.json");
const Sofa = require("../products/60802.json");
const Armario = require("../products/60803.json");
const MesaDeCentro = require("../products/60804.json");

//Comentarios por producto
const comentarioCDE = require("../products_comments/40281.json");
const comentarioODP = require("../products_comments/50741.json");
const comentarioPDB = require("../products_comments/50742.json");
const comentarioPS5 = require("../products_comments/50743.json");
const comentarioBici = require("../products_comments/50744.json");
const comentarioCOJ = require("../products_comments/50921.json");
const comentarioFW = require("../products_comments/50922.json");
const comentarioSC = require("../products_comments/50923.json");
const comentarioP208 = require("../products_comments/50924.json");
const comentarioBC = require("../products_comments/50925.json");
const comentarioJDC = require("../products_comments/60801.json");
const comentarioSofa = require("../products_comments/60802.json");
const comentarioArmario = require("../products_comments/60803.json");
const comentarioMDC = require("../products_comments/60804.json");

// Carrito Usuario
const cartUser = require("../user_cart/25801.json");

// ------------------------------ ROUTER ------------------------------
app.get("/", (req, res) => {
    // El primer parámetro SIEMPRE es asociado a la request (petición) y el segundo a la response (respuesta)
    res.send("<h1>jeje</h1>");
});

app.post("/login", (req, res)=> {
    const {username, password} = req.body;
    if(username === "subgrupo1" && password === "subgrupo1password"){
        const token = jsonwebtoken.sign({username}, SECRET_KEY);
        res.status(200).json({token});
    } else {
        res.status(401).json({message: "Usuario y/o contraseña incorrecta"});
    }
});

app.use("/cart", (req, res, next)=> {
    try {
        const decoded = jsonwebtoken.verify(req.headers["access-token"], SECRET_KEY);
        console.log(decoded)
        next();
    } catch(error) {
        res.status(401).json({message: "Usuario no autorizado"});
    }
})

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

// Esta línea inicia el servidor para que escuche peticiones en el puerto indicado
app.listen(puerto, () => {
    console.log(`Servidor funciona uwu`);
});