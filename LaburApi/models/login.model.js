const SQL = require("./db.js");

// JSON que va a ser devuelto como respuesta a la peticion 
let message = {
    access: false,
    id: "",
    permits: "",
    description: "Default"
}

exports.checkLogin = (email, password, result) => {

    // Se verifica que el email este registrado
    SQL.query("SELECT * FROM User WHERE user_email = ?", [email], (err, res) => {
        if (err) {
            console.log('Error en la consulta:');
            console.log(err);
            message.access = false
            message.id = ""
            message.permits = ""
            message.description = "Error de conexion, intentelo de nuevo"
            result(null, message);
        } else {
            if (res.length) {
                //Confirmado el Email, se procede a verificiar mail y contraseña
                SQL.query("SELECT * FROM User WHERE user_email = ? AND user_password = ?", [email, password], (err2, res2) => {
                    if (err2) {
                        console.log('Error en la consulta:');
                        console.log(err2);
                        message.access = false
                        message.id = ""
                        message.permits = ""
                        message.description = "Error de conexion, intentelo de nuevo"
                    } else {
                        if (res2.length) {
                            console.log('Usuario y contraseña correctos');
                            message.id = res2[0].user_id
                            message.permits = res2[0].user_typeuserid
                            message.access = true
                            message.description = 'Usuario y contraseña correctos'
                            result(null, message);
                        } else {
                            message.access = false
                            message.id = ""
                            message.permits = ""
                            console.log('Usuario y contraseña incorrectos');
                            message.description = 'Usuario y contraseña incorrectos'
                            result(null, message);
                        }
                    }
                });
            } else {
                message.access = false
                message.id = ""
                message.permits = ""
                console.log("Email no registrado");
                message.description = "Email no registrado"
                result(null, message);
            }
        }
    });
};