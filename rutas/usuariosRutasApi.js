var ruta=require("express").Router();
var subirArchivo= require("../middlewares/subirarchivos")
var {mostrarUsuarios, nuevoUsuario, modificarUsuario, buscarPorID, borrarUsuario}=require("../bd/usuariosBD");

ruta.get("/api/mostrarusuarios",async(req, res)=>{
    var usuarios=await mostrarUsuarios();
    console.log(usuarios);
    if(usuarios.length>0){
    res.status(200).json(usuarios);
   }else{
        res.status(400).json("No hay usuarios");
    } 
});

ruta.post("/api/nuevousuario", subirArchivo(), async (req, res) => {
  req.body.foto = req.file.originalname;
  var error = await nuevoUsuario(req.body);
  if (error == 0) {
    res.status(200).json("Usuario insertado 🥳");
  } else {
    res.status(400).json("Error al insertar usuario 🥺");
  }
});

ruta.get("/api/buscarUsuarioPorId/:id", async (req,res)=>{
    var usuario= await buscarPorID(req.params.id);
    if(usuario==""){
      res.status(400).json("No hay usuarios con ese ID 🥺");
    }else{
      res.status(200).json(usuario); 
    }
  });
  
  ruta.post("/api/editarUsr", subirArchivo(), async (req, res) => {
    var usuario = await buscarPorID(req.body.id); // Obtener el usuario antes del if
    if (req.file) {
      req.body.foto = req.file.originalname;
    } else {
      req.body.foto = usuario.foto; // Mantener la foto existente
    }
    var error = await modificarUsuario(req.body);
    if (error == 0) {
      res.status(200).json("Usuario modificado ");
    } else {
      console.error(error);
      res.status(400).json("Error al modificar usuario ");
    }
  });

  ruta.get("/api/borrarUsr/:id", async (req, res) => {
    var error = await borrarUsuario(req.params.id);
    if (error == 0) {
      res.status(200).json("Usuario eliminado ");
    } else {
      res.status(400).json("Error al eliminar usuario ");
    }
  });
  
  ruta.post("/api/borrarUsr", async (req, res) => {
    var usuario = await buscarPorID(req.params.id);
    if (usuario) {
      var fotoUsuario = usuario.foto;
      fs.unlinkSync("public/img/${fotoUsuario}"); // Borrar la foto
    }
    
    var error = await borrarUsuario(req.params.id);
    if (error == 0) {
      res.status(200).json("Usuario eliminado ");
    } else {
      res.status(400).json("Error al eliminar usuario ");
    }
  });

module.exports=ruta;