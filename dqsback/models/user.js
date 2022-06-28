const db = require('../util/database');

module.exports = class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
    this.picture = picture;
    this.description= description;
    this.element= this.element;
  }

  static fetchAll() {
    return db.execute('SELECT * FROM users WHERE role = "client"');
  }
  static find(email) {
    return db.execute('SELECT * FROM users WHERE email = ?', [email]);
  }

  static save(user) {
    return db.execute(
      'INSERT INTO users (name, email, password, role, picture, description, element) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [user.name, user.email, user.password, user.role, user.picture , user.description, user.element]
    );
  }
  
  static delete(id) {
    return db.execute('DELETE FROM users WHERE id = ?', [id]);
  }

};