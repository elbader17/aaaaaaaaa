const Login = require("../models/login.model.js");

exports.checkLogin = (req, res) => {

    // Llevo los dos datos a variables mas manejables
    let email = req.body.email
    let password = req.body.password

    Login.checkLogin(email,password, (err,data) => {
        // Devuelvo una respuesta en forma de JSON son 3 campos. "access,id,description y permits"
        res.send (data);
    })
}