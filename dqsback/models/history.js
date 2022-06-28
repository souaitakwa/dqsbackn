const db = require('../util/database');

module.exports = class history {
  constructor(id, comment, question, answer,  userid, dateposted) {
      this.id=id;
    this.comment= comment;
    this.question = question;
    this.answer = answer;
    this.userid= userid;
    this.dateposted= dateposted;

  }

  static fetchAll() {
    return db.execute('SELECT * FROM history');
  }

  /*static post(history) {
    return db.execute(
      'INSERT INTO history (comment, question, answer, userid) VALUES (?, ?, ?, ?)', [history.comment, history.question, history.answer, 1]
  );
  }
*/
  static post(comment , question, answer,userid) {
    return db.execute('INSERT INTO history (comment, question, answer, userid) VALUES (?, ?, ?, ?)', [comment, "new question added",answer, 1]);
  }


}
