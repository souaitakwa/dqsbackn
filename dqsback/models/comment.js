const db = require('../util/database');

module.exports = class comment {
  constructor(id, description, defaultcomment,picture, userid) {
    this.id = id;
    this.description = description;
    this.defaultcomment = defaultcomment;
    this.picture= picture;
    this.userid=userid;
  }

  static fetchAll(reportId) {
    return db.execute('SELECT * FROM comment where reportId = ?', [reportId]);
  }

  static post(description, defaultcomment,picture , userid,reportId) {
    db.execute('INSERT INTO history (comment) VALUES (?)', [ "new comment added"]);
    return db.execute('INSERT INTO comment (description, defaultcomment, picture, userid,reportId) VALUES (?, ?, ?, ?,?)', [description, defaultcomment, picture, userid,reportId]);
  }

  static update(id, description, defaultcomment, picture) {
    return db.execute('UPDATE comment SET description = ?, defaultcomment = ?, picture = ? WHERE id = ?', [description, defaultcomment,picture , id]);
  }

  static delete(id) {
    return db.execute('DELETE FROM comment WHERE id = ?', [id]);
  }
};