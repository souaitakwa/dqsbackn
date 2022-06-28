const db = require('../util/database');

module.exports = class answer {
  constructor(id, answer, questionid, postdate, userid) {
    this.id = id;
    this.answer = answer;
    this.questionid = questionid;
    this.postdate= postdate;
    this.userid=userid
  }

  static fetchAll() {
    return db.execute('SELECT * FROM answer');
  }

  static post(answer, questionid, userid) {
    db.execute('INSERT INTO history (answer) VALUES (?)', [ "new answer added"]);
    return db.execute('INSERT INTO answer (answer, questionid, userid) VALUES (?, ?, ?)', [answer, questionid, userid]);
  }

  static update(id, answer) {
    return db.execute('UPDATE answer SET answer = ? WHERE id = ?', [answer, id]);
  }

  static delete(id) {
    return db.execute('DELETE FROM answer WHERE id = ?', [id]);
  }

  static findOne(questionid) {
    console.log('SELECT * FROM answer where questionid = ', questionid);
    return db.execute('SELECT * FROM answer where questionid = ?', [questionid]);
  }



};