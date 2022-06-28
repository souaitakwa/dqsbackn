const db = require('../util/database');

// module.exports = class answer {
//   constructor(id, answer, questionid, postdate, userid) {
//     this.id = id;
//     this.answer = answer;
//     this.questionid = questionid;
//     this.postdate= postdate;
//     this.userid=userid
//   }

  async function fetchAll(req,res) {
    try {
        let userid = req.query.userid;
        let records =  await db.execute('SELECT * FROM report where user_id = ?', [userid]);
        let UserReport = [];
        if(records){
          records[0].forEach((item, index) => {
            UserReport.push([item.hostname.toString(),item.self_Referral.toString(),item.sessions.toString(),item.pages_views_plateformes.toString(),item.page_views.toString(),item.enddate.toString(),item.Sessions_with_Search.toString(),item.Results_Found.toString()]);
          });
        }
        
      console.log(records);
      return res.send({status:true,result:records[0],UserReport:UserReport});

        // res.status(200).json(allquestions);
      } catch (err) {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      }

     
    //   console.log(req);
    //   console.log('SELECT * FROM report where user_id = '+userid+'');
      
  }


  async function saveReport(req,res) {
    let report = JSON.parse(req.body.report);
    await deleteRecord(req.body.userid);
      report.forEach((element,index) => {
          if(index > 0){
          console.log(element[0]);
          // console.log(element[0]);
          db.execute('INSERT INTO report (user_id,hostname, self_Referral, sessions,pages_views_plateformes,page_views,enddate,Sessions_with_Search,Results_Found) VALUES (?, ?, ?,?,?,?,?,?,?)', [req.body.userid, element[0], element[1], element[2], element[3], element[4], element[5], element[6], element[7]]);
          }
      });
    
    return res.send({status:true});
  }


    async function deleteRecord(user_id) {
    return db.execute('DELETE FROM report WHERE user_id = ?', [user_id]);
  }



//   static update(id, answer) {
//     return db.execute('UPDATE answer SET answer = ? WHERE id = ?', [answer, id]);
//   }

//   static delete(id) {
//     return db.execute('DELETE FROM answer WHERE id = ?', [id]);
//   }

//   static findOne(questionid) {
//     console.log('SELECT * FROM answer where questionid = ', questionid);
//     return db.execute('SELECT * FROM answer where questionid = ?', [questionid]);
//   }



// };
module.exports = {
    saveReport,
    fetchAll
}