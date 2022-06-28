const db = require('../util/database');

module.exports = class question {
  constructor( title, description, postdate,userid) {
    this.title=title;
    this.description = description;
    this.postdate = postdate;
    this.userid= userid;
  }

  //if there is an error try to delete postdate in the constructor
  static fetchAll() {
    return db.execute('SELECT question.id as id, question.title as title, question.description as description, question.postdate, users.name as name FROM question JOIN users ON question.userId = users.id');
  }


  static findByPk(id) {
    return db.execute('SELECT * FROM question where id = ?', [id]);
  }

  static save(question) {
    return db.execute(
      'INSERT INTO question (title, description, userid) VALUES (?, ?, ?)', [question.title, question.description, question.userid]
  );
  }
  
 

  static post(title , description, userid) {
    db.execute('INSERT INTO history (question) VALUES (?)', [ "new question added"]);
    return db.execute('INSERT INTO question (title, description, userid) VALUES (?, ?, ?)', [title, description, userid]);
  }
  /*

  static post(title,description,userid) {
    return db.execute('INSERT INTO question (title, description, userid) VALUES (?, ?, ?)', [title, description, userid]);
  }
*/


  static update(id,title, description) {
    return db.execute('UPDATE question SET title = ?, description = ? WHERE id = ?', [title, description, id]);
  }

  static delete(id) {
    return db.execute('DELETE FROM question WHERE id = ?', [id]);
  }

/*
  static updatenew(id){
    console.log(req.body,'updatedata');
    //let gID = req.params.id;
    let title = req.params.title;
    let description = req.params.description;
  
    return db.execute(`UPDATE question SET title = '${title}', description = '${description}' WHERE id = ${id}`);
  }
*/
  /*
  static compare(id) {
    return db.execute('SELECT * FROM answer WHERE question.id  = answer.questionid', [id]);
  }
  */
};


