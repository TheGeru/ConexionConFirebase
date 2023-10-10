class Usuario {
    constructor(id, data) {
        this.bandera = 0;
        this.id = id;
        this.nombre = data.nombre;
        this.usuario = data.usuario;
        this.password = data.password;
        this.foto = data.foto;
    }

    set id(id) {
        if(id != null){
            id.length > 0 ? this._id = id : this.bandera = 1;
        }
    }

    set nombre(nombre) {
        if(nombre != null){
            nombre.length > 0 ? this._nombre = nombre : this.bandera = 1;
        }
    }

    set password(password) {
        if(password != null){
            password.length > 0 ? this._password = password : this.bandera = 1;
        }
    }

    set usuario(usuario) {
        if(usuario != null){
            usuario.length > 0 ? this._usuario = usuario : this.bandera = 1;
        }
    }

    set foto(foto){
        if(foto != null){
            foto.length > 0 ? this._foto = foto : this.bandera = 1;
        }
    }

    get id() {
        return this._id;
    }


    get nombre() {
        return this._nombre;
    }

    get password() {
        return this._password;
    }

    get usuario() {
        return this._usuario;
    }

    get foto(){
        return this._foto;
    }

    get obtenerDatos() {
        if(this._id != null)
            return {
                id: this.id,
                nombre: this.nombre,
                usuario: this.usuario,
                password: this.password,
                foto: this.foto
            }
        else{
            return {
                nombre: this.nombre,
                usuario: this.usuario,
                password: this.password,
                foto: this.foto
            }
        }
    }
}

module.exports = Usuario;