const SQL = require("./db.js");

exports.findAll = (result) => {
    SQL.query("SELECT * FROM Province", (err, res) => {
        if (err) {
            result(null, err);
            return;
        }
        result(null, res);
        
    });
};