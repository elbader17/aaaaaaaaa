const User = require('../models/user.model.js');
const Person = require('../models/person.model.js');

const procResponse = (error, response) => {
  if (error) {
    return {
      status: 'e',
      message: error
    }
  } else {
    return {
      status: 'ok',
      data: response
    }
  }
}

// Create
exports.create = (req,res) => {
  const user = new User({
    emailUser: req.body.email,
    passwordUser: req.body.password,
    // typeUser: req.body.typeUser          -- Self DB
    // stateUser: req.body.stateUser        -- Self DB
  })
  User.create(user, (err, data) => {
    if (err) {
      res.status(500).send(
        procResponse(err.message || 'An error occurred while trying to create the user.', null)
      )
    } else {
      // Create PersonObject
      const person = new Person({
        namePerson: req.body.name,
        lastnamePerson: req.body.lastname,
        dniPerson: req.body.dni,
        phonenumberPerson: req.body.phonenumber,
        addressPerson: req.body.address,
        cityPerson: req.body.city,
        idPerson: data.idUser,
      });
      Person.create(person,(err2) => {
        if (err2) {
          User.deleteId(data.idUser, (res) => {});
          res.send(procResponse(err2, null))
        } else {
          res.send(procResponse(null, data))
        }
      })
    }
  })
}

// Find by DNI
exports.findDni = (req, res) => {
  let dni = req.body.dni;
  User.findDni(dni, (err,data) => {
      res.send (data);
  })
}


// Find by Email
exports.findEmail = (req, res) => {
  let email = req.body.email;
  User.findEmail(email, (err,data) => {
      res.send (data);
  })
}


//retrieve all objects

// exports.findAll = (req, res) => {
//       Usuario.getAll((err, data) => {
//       if (err)
//         res.status(200).send(
//           procResponse(err.message || "Some error occurred while retrieving usuarios.",null)
//         )          
//       else {
//         res.status(200);
//         res.send(procResponse(null,data));
//       } 
//     });
//   };

// //Retrieve a single object
// exports.findOne = (req, res) => {
//     Usuario.findById(req.params.usuarioId, (err, data) => {
//       if (err) {
//         if (err.kind === "not_found") {
//           res.status(404).send(procResponse(`Not found Usuario with id ${req.params.usuarioId}.`,null));
//         } else {
//           res.status(500).send(procResponse("Error retrieving Usuario with id " + req.params.usuarioId,null));
//         }
//       } else res.send(procResponse(null,data));
//     });
//   };

// //Update an object
// exports.update = (req, res) => {
//     // Validate Request
//     if (!req.body) {
//       res.status(400).send(procResponse("Content can not be empty!",null));
//     }
  
//     Usuario.updateById(
//       req.params.usuarioId,
//       new Usuario(req.body),
//       (err, data) => {
//         if (err) {
//           if (err.kind === "not_found") {
//             res.status(404).send(procResponse(`Not found Usuario with id ${req.params.usuarioId}.`,null));
//           } else {
//             res.status(500).send(procResponse("Error updating Usuario with id " + req.params.usuarioId,null));
//           }
//         } else res.send(procResponse(null, data));
//       }
//     );
//   };

exports.deleteId = (req, res) => {
  let reqId = req.params.id;
  Person.deleteId(reqId, (err) => {
    if (err) {
      if (err.kind === 'Person_Not_Found') {
        res.status(404).send(procResponse('Person with ID ' + reqId + ' not found', null));
      } else {
        res.status(500).send(procResponse('Could not delete Person with ID' + reqId, null));
      }
    } else {
      User.deleteId(reqId, (err) => {
        if (err) {
          if (err.kind === 'User_Not_Found') {
            res.status(404).send(procResponse('User with ID ' + reqId + ' not found', null));
          } else {
            res.status(500).send(procResponse('Could not delete User with ID' + reqId, null));
          }
        }
      });
      res.send(procResponse(null, 'User-Person was deleted seccessfully! :)'));
    }
  });
}

exports.listTypeUser = (req, res) => {
  User.listTypeUser((err, data) => {
      res.send(data);
  });
};



// //Delete an object
// exports.delete = (req, res) => {
//     Usuario.remove(req.params.usuarioId, (err, data) => {
//       if (err) {
//         if (err.kind === "not_found") {
//           res.status(404).send(procResponse(`Not found Usuario with id ${req.params.usuarioId}.`,null));
//         } else {
//           res.status(500).send(procResponse("Could not delete Usuario with id " + req.params.usuarioId,null));
//         }
//       } else res.send(procResponse(null,`Usuario was deleted successfully!`));
//     });
//   };

// //Delete all objects
// exports.deleteAll = (req, res) => {
//     Usuario.removeAll((err, data) => {
//       if (err)
//         res.status(500).send(procResponse(err.message || "Some error occurred while removing all usuarios.",null));
//       else res.send(procResponse(null,`All Usuarios were deleted successfully!`));
//     });
//   };
  