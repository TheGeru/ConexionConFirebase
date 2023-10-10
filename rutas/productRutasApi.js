var rutaProduct = require("express").Router();
var {
  mostrarProductos,
  nuevoProducto,
  modificarProducto,
  buscarPorIDPro,
  borrarProducto,
} = require("../bd/productosBD.JS");
const subirArchivo = require("../middlewares/subirarchivos");


rutaProduct.get("/api/productos", async (req, res) => {  
  var productos = await mostrarProductos();
  console.log(productos);
  if (productos.length>0) {
    res.status(200).json(productos);
  }else{
    res.status(400).json("No hay productos");
  }
});

rutaProduct.post("/api/nuevoproducto", subirArchivo(), async (req, res) => {
  req.body.foto = req.file.originalname;
  var error = await nuevoProducto(req.body);
  if (error == 0) {
    res.status(200).json("Producto insertado ");
  } else {
    res.status(400).json("Error al insertar producto ");
  }
});

rutaProduct.post("/api/editarProducto",  subirArchivo(), async (req, res) => {
  var producto = await buscarPorIDPro(req.body.id); // Obtener el usuario antes del if
  if (req.file) {
    req.body.foto = req.file.originalname;
  } else {
    req.body.foto = producto.foto; // Mantener la foto existente
  }
    var error = await modificarProducto(req.body);
    if (error == 0) {
      res.status(200).json("Producto modificado");
    } else {
      res.status(400).json("Error al modificar producto");
    }
});

rutaProduct.get("/api/buscarPorIdProducto/:id", async (req, res) => {
  try {
    var producto = await buscarPorIDPro(req.params.id);
    
    if (!producto) {
      res.status(404).json("No se encontró ningún producto con ese ID ");
    } else {
      res.status(200).json(producto);
    }
  } catch (err) {
    console.error("Error al buscar producto: " + err);
    res.status(500).json("Error interno del servidor al buscar producto ");
  }
});
rutaProduct.get("/api/borrarProducto/:id", async (req, res) => {
  var error = await borrarProducto(req.params.id);
  if (error == 0) {
    res.status(200).json("Producto eliminado ");
  } else {
    res.status(400).json("No existe el producto con ese id ");
  }
});

module.exports = rutaProduct;