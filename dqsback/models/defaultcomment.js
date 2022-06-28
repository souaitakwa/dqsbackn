const db = require('../util/database');

module.exports = class defaultcomment {
  constructor(id, description) {
    this.id = id;
    this.description = description;
  }

  static fetchAll() {
    return db.execute('SELECT * FROM defaultcomment');
  }

  static post(description) {
    return db.execute('INSERT INTO defaultcomment (description) VALUES (?, ?)', [description]);
  }

  static update(id, description) {
    return db.execute('UPDATE defaultcomment SET description = ? WHERE id = ?', [description, id]);
  }

  static delete(id) {
    return db.execute('DELETE FROM defaultcomment WHERE id = ?', [id]);
  }
};