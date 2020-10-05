const Province = require("../models/province.model.js");

exports.findAll = (req, res) => {
    Province.findAll((err, data) => {
        if (err)
            res.send(data);
        else {
            res.send(data);
        }
    });
};