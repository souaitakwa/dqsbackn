//const db = require('./util/database');

const express = require('express');


const bodyParser = require('body-parser');


var session = require("express-session"),
cors = require("cors"),
dialogflowIndex = require("./routes/api"),
mainRoute = require("./routes"),
errorhandler = require("errorhandler");
var multer  = require('multer');

var isProduction = process.env.NODE_ENV === "production";


const authRoutes = require('./routes/auth');

const questionRoutes = require('./routes/question');

const answerRoutes = require('./routes/answer');
const commentRoutes = require('./routes/comment');
const historyRoutes = require('./routes/history');



const errorController = require('./controllers/error');
const reportController = require('./controllers/reports.js');

const app = express();

app.use(cors());

app.use(require("morgan")("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(require("method-override")()); 
app.use(express.static(__dirname + '/public'));

app.use(session({ secret: 'conduit', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

if(!isProduction){
  app.use(errorhandler());
}

app.use("/", mainRoute);
app.use("/api", dialogflowIndex);

app.use(function(err, req, res, next){ 
  res.status(err.status || 500);
  res.json({'error': {
    message: err.message,
    error: {}
  }})
});



//////////for upload image with multer/////

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage })

app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));

app.post('/profile-upload-single', upload.single('file'), function (req, res, next) {
  // req.file is the `profile-file` file
  // req.body will hold the text fields, if there were any
  console.log(JSON.stringify(req.file))
  return res.send({status:true,file:req.file.filename})
})


const ports = process.env.PORT || 3000;



app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Accept, X-Custom-Header, Authorization'
  );
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});


/*
app.put('/question/:id', (req, res) => {
  let id =req.body.id;
  let title = req.params.title;
  let description = req.params.description;
 let qr = `UPDATE question SET title = '${title}', description = '${description}' WHERE id = ${id}`;

 db.query(qr,(err,result)=>{
  if (err) {
    console.log(err);
  }
  res.send({
    message : 'updated new'
  });

 });
 
})
*/
app.use('/auth', authRoutes);

app.use('/question', questionRoutes);

app.use('/answer', answerRoutes);

app.use('/comment', commentRoutes);

app.use('/history', historyRoutes);

////reports routes

app.post('/addReport',function(req,res){
  reportController.saveReport(req,res);
});
app.get('/getReports',function(req,res){
  reportController.fetchAll(req,res);
});





app.use(errorController.get404);

app.use(errorController.get500);

app.listen(ports, () => console.log(`Listening on port ${ports}`));