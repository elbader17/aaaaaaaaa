const SQL = require('./db.js')

// Constructor
const Person = function(Person){
  this.person_name = Person.namePerson;
  this.person_lastname = Person.lastnamePerson;
  this.person_dni = Person.dniPerson;
  this.person_phonenumber = Person.phonenumberPerson;
  this.person_address = Person.addressPerson;
  this.person_cityid = Person.cityPerson;
  this.person_userid = Person.idPerson;
}

Person.create = (newPerson, result) => {
  SQL.query('INSERT INTO Person SET ?', newPerson, (err, res) => {
    if (err) {
      result(err, null);
      return;
    } else {
      result(null, {idPerson: res.insertId, ...newPerson })
    }
  })
}

Person.deleteId = (id, result) => {

  SQL.query('DELETE FROM Person WHERE person_userid = ?', id, (err, res) => {
    if (err) {
      result(null, res)
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: 'Person_Not_Found'}, null)
      return;
    }

    result(null, res);
  });
}

module.exports = Person;