const City = require("../models/city.model.js");

exports.findAll = (req, res) => {
    let idProvince = req.body.id
    City.findAll(idProvince, (err,data) => {
        res.send (data);
    })
}