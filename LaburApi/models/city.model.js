const SQL = require("./db.js");

exports.findAll = (idProvince, result) => {
    SQL.query("SELECT * FROM City WHERE city_provinceid = ?", [idProvince] , (err, res) => {
        if(err) {
            console.log("Error en la consulta:");
            console.log(err);
            result(null, err)
            return
        }
        console.log("Consulta realizada con exito");
        console.log(err);
        result(null, res);
    });
};

