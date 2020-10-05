const SQL = require("./db.js");

exports.list = (result) => {
    SQL.query("SELECT * FROM Service", (err, res) => {
        if (err) {
            console.log("Error en la consulta - Lista de servicios:");
            console.log(err);
            result(null, err);
        } else {
            console.log("Consulta exito - Lista de servicios:");
            console.log("Datos del arreglo:");
            console.log(res);
            result(null, res);
        }
    });
};

exports.listUser = (result) => {
    SQL.query("SELECT * FROM ServiceReq", (err, res) => {
        if (err) {
            console.log("Error en la consulta - Lista de servicios de usuarios:");
            console.log(err);
            result(null, err);
        } else {
            console.log("Consulta exito - Lista de servicios de los usuarios:");
            console.log("Datos del arreglo:");
            console.log(res);
            result(null, res);
        }
    });
};


exports.listAUser = (id , result) => {
    SQL.query(`SELECT Service.Service_name, ServiceUser.serviceuser_description, ServiceUser.serviceuser_serviceid FROM Service INNER JOIN ServiceUser on Service.service_id = ServiceUser.serviceuser_serviceid WHERE ServiceUser.serviceuser_userid = "${id}"`, (err, res) => {
        if (err) {
            console.log("Error en la consulta - Lista de servicios de un usuarios:");
            console.log(err);
            result(null, err);
        } else {
            console.log("Consulta exito - Lista de servicios del usuarios:");
            console.log("Datos del arreglo:");
            console.log(res);
            result(null, res);
        }
    });
};

exports.add = (nameService, result) => {
    let datos = {
        message: "",
        action: false
    }
    console.log(nameService);
    SQL.query("SELECT * FROM Service WHERE service_name = ?", [nameService], (err, res) => {
        if (err) {
            console.log("Error en la consulta para ver si ya esta agregado:");
            datos.message = ("Error en la consulta para ver si ya esta agregado: " + err)
            datos.action = false
            console.log(err);
            result(null, datos)
            return
        } else if (res.length) {
            console.log("Consulta realizada con exito");
            datos.message = "El servicio ya existe"
            datos.action = false
            console.log(datos.message);
            result(null, datos);
            return
        } else {
            console.log("Consulta realizada con exito");
            SQL.query(`INSERT INTO Service (service_name) VALUES ("${nameService}")`, (err, res) => {
                if (err) {
                    console.log("Error en la consulta para agregarlo:");
                    console.log(err);
                    datos.message = ("Error en la consulta para agregarlo:" + err)
                    datos.action = false
                    result(null, datos)
                    return
                } else {
                    datos.message = "Servicio agregado correctamente";
                    datos.action = true
                    console.log(datos.message);
                    result(null, datos);
                    return
                }
            })
        }
    })
}

exports.addAUser = (nameService, result) => {
    let datos = {
        message: "",
        action: false
    }
    SQL.query(`INSERT INTO ServiceReq (servicereq_name) VALUES ("${nameService}")`, (err, res) => {
        if (err) {
            console.log("Error en la consulta para agregarlo:");
            console.log(err);
            datos.message = ("Error en la consulta para agregarlo:" + err)
            datos.action = false
            result(null, datos)
            return
        } else {
            datos.message = "Servicio agregado correctamente";
            datos.action = true
            console.log(datos.message);
            result(null, datos);
            return
        }
    })
}


exports.delete = (id, result) => {
    let datos = {
        message: "",
        action: false
    }
    SQL.query("DELETE FROM Service WHERE service_id = ?", [id], (err, res) => {
        if (err) {
            datos.message = "Error en la consulta eliminar servicio:";
            console.log(datos.message);
            console.log(err);
            datos.action = false
            datos.message = "Error en la consulta: " + err
            result(null, datos);
        } else {
            console.log("Consulta exito");
            datos.message = "El servicio fue eliminado";
            datos.action = true
            console.log(datos.message);
            result(null, datos);
        }
    });
};

exports.deleteUser = (id, result) => {
    let datos = {
        message: "",
        action: false
    }
    SQL.query(`DELETE FROM ServiceReq WHERE servicereq_id = "${id}"`, (err, res) => {
        if (err) {
            datos.message = "Error en la consulta eliminar servicio del usuario:";
            console.log(datos.message);
            console.log(err);
            datos.action = false
            datos.message = "Error en la consulta: " + err
            result(null, datos);
        } else {
            console.log("Consulta exito");
            datos.message = "El servicio de usuario fue eliminado";
            datos.action = true
            console.log(datos.message);
            result(null, datos);
        }
    });
};

exports.deleteOneFromUser = (idUser, idService, result) => {
    let datos = {
        message: "",
        action: false
    }
    SQL.query(`DELETE FROM ServiceUser WHERE serviceuser_userid = "${idUser}" AND serviceuser_serviceid = "${idService}"`, (err, res) => {
        if (err) {
            datos.message = "Error en la consulta eliminar servicio del usuario:";
            console.log(datos.message);
            console.log(err);
            datos.action = false
            datos.message = "Error en la consulta: " + err
            result(null, datos);
        } else {
            console.log("Consulta exito");
            datos.message = "El servicio fue eliminado del usuario";
            datos.action = true
            console.log(datos.message);
            result(null, datos);
        }
    });
};

exports.addToUser = (idUser, idService, description, result) => {
    let datos = {
        action: false,
        message: ""
    }
    SQL.query(`SELECT * FROM ServiceUser WHERE serviceuser_userid = "${idUser}" AND serviceuser_serviceid = "${idService}"`, (err, res) => {
        if (err) {
            datos.message = "Error en la consulta buscar ya agregado:";
            console.log(datos.message);
            console.log(err);
            datos.action = false
            datos.message = "Error en la consulta: " + err
            result(null, datos);
            return
        } else if (res.length) {
            console.log("Consulta realizada con exito");
            datos.message = "El servicio ya formaba parte del usuario"
            datos.action = false
            console.log(datos.message);
            result(null, datos);
            return
        } else {
            SQL.query(`INSERT INTO ServiceUser (serviceuser_userid,serviceuser_serviceid,serviceuser_description) VALUES ("${idUser}","${idService}","${description}")`, (err, res) => {
                if (err) {
                    console.log("Error en la consulta para agregarlo:");
                    console.log(err);
                    datos.message = ("Error en la consulta para agregarlo:" + err)
                    datos.action = false
                    result(null, datos)
                    return
                } else {
                    datos.message = "Servicio agregado correctamente al usuario";
                    datos.action = true
                    console.log(datos.message);
                    result(null, datos);
                    return
                }
            })
        }
    })
};