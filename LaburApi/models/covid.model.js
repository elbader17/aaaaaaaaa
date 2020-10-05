const SQL = require("./db.js");

exports.requestCovid = (id, result) => {
    let datos = {
        message : "",
        action: false
    }
    SQL.query(`UPDATE User SET user_stateid = 1 WHERE user_id = "${id}"`, (err, res) => {
        if(err) {
            console.log("Error en la consulta:");
            console.log(err);
            datos.message = "Error en la consulta:" + err
            datos.action = false
            result(null, datos)
            return
        }
        console.log("Consulta realizada con exito");
        console.log(res);
        datos.message = "Terminos y condicicones aceptados con exito"
        datos.action = true
        result(null, datos);
    });
};
