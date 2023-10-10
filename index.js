var express = require("express");
var cors = require('cors');
var path = require("path");
var routes = require("./rutas/usuariosRutas");
var productosRutas = require("./rutas/productRutas");
var productosRutasApi = require("./rutas/productRutasApi")
var rutasUsuariosApis = require("./rutas/usuariosRutasApi");


var app = express(); 
app.use(cors())

app.set("view engine", "ejs"); 

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); 
app.use("/", express.static(path.join(__dirname, "/web")))
app.use("/", routes); 
app.use("/", productosRutas); 
app.use("/", productosRutasApi);
app.use("/", rutasUsuariosApis)

var port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server in = http://localhost:${port}`); 
});