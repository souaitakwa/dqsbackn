const db = require('../util/database');

module.exports = class alert {
  constructor(idalert, description) {
    this.idalert = idalert;
    this.description = description;
  }

  static fetchAll() {
    return db.execute('SELECT * FROM alert');
  }

  static post(description) {
    return db.execute('INSERT INTO alert (description) VALUES (?)', [description]);
  }

  static update(idalert, description) {
    return db.execute('UPDATE alert SET description = ? WHERE idalert = ?', [description, idalert]);
  }

  static delete(idalert) {
    return db.execute('DELETE FROM alert WHERE idalert = ?', [idalert]);
  }
};