var admin=require("firebase-admin");
var keys2=require("../serviceAcountKeys.json");

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(keys2),
        appName: 'productosBD'
    });
 }else {
    admin.app(); // if already initialized, use that one
 }
var micuenta=admin.firestore();
var conexion2 =micuenta.collection("productosBD");

module.exports=conexion2;
