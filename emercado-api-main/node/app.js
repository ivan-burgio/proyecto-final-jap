const express = require("express");
const cors = require("cors");
const jsonwebtoken = require("jsonwebtoken");
const SECRET_KEY = "EL MEJOR SUBGRUPO";

const app = express(); // Instancia de express
const puerto = 3000; // Indico en que puerto voy a escucuhar
app.use(express.json());
app.use(cors());



app.get("/", (req, res) => {
    // El primer parámetro SIEMPRE es asociado a la request (petición) y el segundo a la response (respuesta)
    res.send("<h1>Funcionando...</h1>");
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

//No utilizamos la dirección porque manejamos el carrito con un array en la pagina
app.use("/cart", (req, res, next)=> {
    try {
        const decoded = jsonwebtoken.verify(req.headers["access-token"], SECRET_KEY);
        console.log(decoded)
        next();
    } catch(error) {
        res.status(401).json({message: "Usuario no autorizado"});
    }
})

const catRoutes     = require("./router/catRoutes");
const productRoutes = require("./router/productRoutes");
const commentRoutes = require("./router/commentRoutes");
const sellRoutes = require("./router/sellRoutes");

// Rutas
app.use("/categorias", catRoutes);
app.use("/producto", productRoutes);
app.use("/comentario", commentRoutes);
app.use("/sell", sellRoutes);


// Esta línea inicia el servidor para que escuche peticiones en el puerto indicado
app.listen(puerto, () => {
    console.log(`Servidor funcionando...`);
});