const SQL = require('./db.js');

// Constructor
const User = function(User) {
  this.user_email = User.emailUser;
  this.user_password = User.passwordUser;
  // this.user_type = User.typeUser;
  // this.user_state = User.stateUser;
}

User.create = (newUser, result, status) => {
  SQL.query('INSERT INTO User SET ?', newUser, (err, res) => {
    if (err) {
      result(err,null);
      return;
    } else {
      result(status === 'ok', {
        idUser: res.insertId,
        ...newUser,
        messageOk: 'User created seccessfully'
      });
      return;
    }
  });
};

// Usuarios.findById = (UsuarioId, result) => {
//   sql.query(`SELECT * FROM usuario WHERE id = ${UsuarioId}`, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(err, null);
//       return;
//     }

//     if (res.length) {
//       console.log("usuario encontrado : ", res[0]);
//       result(null, res[0]);
//       return;
//     }

//     // not found Usuarios with the id
//     result({ kind: "not_found" }, null);
//   });
// };

User.findDni = (dni, result) => {
  SQL.query("SELECT * FROM Person WHERE person_dni = ?", [dni], (err, res) => {
      let mensaje = ''
      if (err) {
          console.log('Error en la consulta');
          console.log(err);
      } else {
          if (res.length) {
              /* DNI is already token */
              mensaje = true
              result(null, mensaje)
          } else {
          mensaje = false
          /* DNI is available */
          result(null, mensaje);
          }
      }
  });
};

User.findEmail = (email, result) => {
  SQL.query("SELECT * FROM User WHERE user_email = ?", [email], (err, res) => {
      let mensaje = ''
      if (err) {
          console.log('Error en la consulta');
          console.log(err);
      } else {
          if (res.length) {
              /* Email is already token */
              mensaje = true
              result(null, mensaje)
          } else {
          mensaje = false
          /* Email is available */
          result(null, mensaje);
          }
      }
  });
};




// Usuarios.getAll = result => {
//   sql.query("SELECT * FROM Usuario", (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }
//     // console.log("Lista usuarios: ", res);
//     result(null, res);
//   });
// };

// Usuarios.updateById = (id, Usuario, result) => {
//   sql.query(
//     "UPDATE usuario SET emailUsu = ?, nombreUsu = ?, estadoUsu = ? WHERE idUsu = ?",
//     [Usuario.email, Usuario.nombre, Usuario.estado, id],
//     (err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         result(null, err);
//         return;
//       }

//       if (res.affectedRows == 0) {
//         // not found Usuarios with the id
//         result({ kind: "not_found" }, null);
//         return;
//       }

//       console.log("Usuario actualizado: ", { id: id, ...Usuario });
//       result(null, { id: id, ...Usuarios });
//     }
//   );
// };

User.deleteId = (id, result) => {
  SQL.query('DELETE FROM User WHERE user_id = ?', id, (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) { // Not found User with ID
      result({ kind: 'User_Not_Found' }, null)
      return;
    } 
    result(null, res);
  });
} 



// Usuarios.remove = (id, result) => {
//   sql.query("DELETE FROM usuario WHERE idUsu = ?", id, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     if (res.affectedRows == 0) {
//       // not found Usuarios with the id
//       result({ kind: "not_found" }, null);
//       return;
//     }

//     console.log("Usuario con el id:< ", id, " > eliminado exitosamente");
//     result(null, res);
//   });
// };

// Usuarios.removeAll = result => {
//   sql.query("DELETE FROM usuario", (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     console.log(`Se borraron ${res.affectedRows} usuarios de la base de datos`);
//     result(null, res);
//   });
// };

User.listTypeUser = (result) => {
  SQL.query("SELECT * FROM TypeUser", (err, res) => {
      if (err) {
          console.log("Error en la consulta - Lista de servicios:");
          console.log(err);
          result(null, err);
      } else {
          console.log("Consulta exito - Lista de tipos de usuario:");
          console.log("Datos del arreglo:");
          console.log(res);
          result(null, res);
      }
  });
};

module.exports = User;

