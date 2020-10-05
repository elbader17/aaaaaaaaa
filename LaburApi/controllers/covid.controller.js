const Covid = require("../models/covid.model.js");

exports.requestCovid = (req, res) => {
    let id = req.body.id
    Covid.requestCovid(id, (err,data) => {
        res.send (data);
    })
}