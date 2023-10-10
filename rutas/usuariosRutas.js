var ruta=require("express").Router();
var subirArchivo=require("../middlewares/subirarchivos");
var {mostrarUsuarios, nuevoUsuario, modificarUsuario, buscarPorID, borrarUsuario}=require("../bd/usuariosBD");

ruta.get("/",async(req, res)=>{
    var usuarios=await mostrarUsuarios();
    res.render("usuarios/mostrar",{usuarios})
});

ruta.get("/nuevoUsuario", async(req, res)=>{
    res.render("usuarios/nuevo")
});

ruta.post("/nuevoUsuario", subirArchivo(), async(req, res)=>{
    //console.log(req.file);
    req.body.foto= req.file.originalname;
    var error = await nuevoUsuario(req.body);
    //console.log(req.body)
    //var error = await nuevoUsuario(req.body);
    //res.end();
    res.redirect("/");
});

ruta.get("/editar/:id", subirArchivo(), async(req, res)=>{
    var user = await buscarPorID(req.params.id);
    res.render("usuarios/modificar", {user});
});

ruta.post("/editar", subirArchivo(), async (req, res) => {
    var usuario = await buscarPorID(req.body.id); // Obtener el usuario antes del if
    if (req.file) {
      req.body.foto = req.file.originalname;
    } else {
      req.body.foto = usuario.foto; // Mantener la foto existente
    }
    var error = await modificarUsuario(req.body);
    res.redirect("/");
  });

ruta.get("/borrar/:id", async(req, res)=>{
    await borrarUsuario(req.params.id);
    res.redirect("/");
});

module.exports=ruta;