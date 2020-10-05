const Service = require("../models/service.model.js");

exports.list = (req, res) => {
    Service.list((err, data) => {
        res.send(data);
    });
};

exports.listUser = (req, res) => {
    Service.listUser((err, data) => {
        res.send(data);
    });
};

exports.listAUser = (req, res) => {
    let id = req.body.id;
    Service.listAUser(id , (err, data) => {
        res.send(data);
    });
};

exports.add = (req, res) => {
    let nameService = req.body.nameService;
    Service.add (nameService, (err,data) => {
        res.send(data);
    })
}


exports.addAUser = (req, res) => {
    let nameService = req.body.nameService
    Service.addAUser(nameService, (err,data) => {
        res.send(data);
    })
}

exports.delete = (req, res) => {
    let id = req.body.id;
    Service.delete (id, (err,data) => {
        res.send(data);
    })
}

exports.deleteUser = (req, res) => {
    let id = req.body.id;
    Service.deleteUser (id, (err,data) => {
        res.send(data);
    })
}

exports.deleteOneFromUser = (req, res) => {
    let idUser = req.body.idUser;
    let idService = req.body.idService;
    Service.deleteOneFromUser (idUser,idService, (err,data) => {
        res.send(data);
    })
}

exports.addToUser = (req,res) => {
    let idUser = req.body.idUser
    let idService = req.body.idService
    let description = req.body.descriptionService
    Service.addToUser(idUser,idService,description, (err,data) => {
        res.send(data);
    })

}