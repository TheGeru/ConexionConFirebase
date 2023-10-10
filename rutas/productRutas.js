var rutaProduct = require("express").Router();
var subirArchivo = require("../middlewares/subirarchivos"); //variable de ruta
var {
  mostrarProductos,
  nuevoProducto,
  modificarProducto,
  buscarPorIDPro,
  borrarProducto,
} = require("../bd/productosBD.JS");


rutaProduct.get("/productos", async (req, res) => {  
  var productos = await mostrarProductos();
  res.render("productos/mostrarPro", { productos });
});

rutaProduct.get("/nuevoproducto", async (req, res) => {
  res.render("productos/registrarPro");
});

rutaProduct.post("/nuevoproducto", subirArchivo(), async (req, res) => {
  req.body.foto = req.file.originalname;
  var error = await nuevoProducto(req.body);
  res.redirect("/productos");
});

rutaProduct.get("/editarProducto/:id", async (req, res) => {
  var producto = await buscarPorIDPro(req.params.id);
  res.render("productos/editPro", { producto });
});

rutaProduct.post("/editarProducto", subirArchivo(), async (req, res) => {
  var producto = await buscarPorIDPro(req.body.id); // Obtener el usuario antes del if
  if (req.file) {
    req.body.foto = req.file.originalname;
  } else {
    req.body.foto = producto.foto; // Mantener la foto existente
  }
  var error = await modificarProducto(req.body);
  res.redirect("/productos");
});

rutaProduct.get("/borrarProducto/:id", async (req, res) => {
  await borrarProducto(req.params.id);
  res.redirect("/productos");
});

module.exports = rutaProduct;