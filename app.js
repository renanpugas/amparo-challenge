const express = require("express");
const path = require("path");
const { calcValores } = require("./src/calcValor")

const app = express();

const port = process.env.PORT || 3000;

const publicDirectoryPath = "./public";


app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(publicDirectoryPath));

app.get("/", (req, res, next)=>{
    res.render("index");
});

app.get("/api/orapma", (req, res, next)=>{
    
    let origem = req.query.origem;
    let destino = req.query.destino;
    let minutos = req.query.minutos;
    let plano = req.query.plano;

    res.send(calcValores(origem, destino, minutos, plano));

});

app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}.`);
});