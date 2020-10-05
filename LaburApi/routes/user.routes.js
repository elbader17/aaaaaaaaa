module.exports = app => {
  const User = require("../controllers/user.controller.js");
  const Province = require("../controllers/province.controller.js");
  const City = require("../controllers/city.controller.js");
  const Login = require("../controllers/login.controller.js");
  const Covid = require("../controllers/covid.controller.js");
  const Service = require("../controllers/service.controller.js");

  // Create User
  app.post("/user/create", User.create);

  // Login
  app.post("/login", Login.checkLogin);

  //--------------------------------------------------------------------------
  // SEARCHS:
  //--------------------------------------------------------------------------
  // By Email
  app.post("/user/findEmail", User.findEmail);

  // By DNI
  app.post("/user/findDni", User.findDni);

  // Get User - All
  //app.post("/user/find", User.findAll);

  // list of type of User
  app.get("/user/listTypeUser", User.listTypeUser);

  //--------------------------------------------------------------------------
  // SERVICES:
  //--------------------------------------------------------------------------
  // list of services
  app.get("/service/list", Service.list);
  
  // list of services of user
  app.get("/service/listUser", Service.listUser);

  // list of a user's services
  app.post("/service/listAUser", Service.listAUser);

  // add service
  app.post("/service/add", Service.add);

  // agregar servicio de un usuario
  app.post("/service/addAUser", Service.addAUser);

  // delete service
  app.post("/service/delete", Service.delete);
  
  // delete service of user proposed
  app.post("/service/deleteUser", Service.deleteUser);

  // delete service of user 
  app.post("/service/deleteOneFromUser", Service.deleteOneFromUser);

  // add service of user
  app.post("/service/addToUser", Service.addToUser);

  //--------------------------------------------------------------------------

  // Accept terms and Conditions COVID 
  app.post("/requestCovid", Covid.requestCovid);

  // Edit User - By Id
  //  app.post("/user/find", User.edit);

  // Delete User - By ID
  app.post("/user/delete/:id", User.deleteId);

  // Delete User - All
  //  app.post("/user/delete", User.delete);

  // Retrieve Provinces - All
  app.get("/provinces", Province.findAll);

  // Get City - By idProvince
  app.post("/cities", City.findAll);

};