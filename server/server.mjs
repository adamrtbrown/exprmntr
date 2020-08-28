import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import Server from './Server.js';


let env = dotenv.config({path: './server/.env'});
let port = process.env.SERVER_PORT;
let app = express();
let accessExpiry = 60 * 30;
let signing_key = null;

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());

app.use(function (req, res, next) {
  if (req.query) {
    for(var i in req.query) {
      if(!req.body[i]) {
        req.body[i] = req.query[i];
      }
    }
  }
  next();
});

app.use(cors());
app.use(express.static('src'));

app.use(function(req, resp, next){
  console.log("Request: ", req.method, req.originalUrl);
  next();
})

app.use(async function (req, res, next) {
  let token_header = req.get("Authorization");
  let token = String(token_header).split(" ")[1];
  let key = await getSigningKey();
  try {
    var decoded = jwt.verify(token, key, {algorithms: ['HS256']});
    req.token_claims = decoded;
  } catch(err) {
    console.log("Invalid token");
    req.token_claims = false;
  }
  next();
});

let server_config = {
  app_id: process.env.ABCIAM_APP_ID,
  app_secret: process.env.ABCIAM_APP_SECRET,
  url: process.env.ABCIAM_URL
}
app.get('/test', function(req, res){
  res.json({test:1});
});
app.get('/token', async function(req, res) {
  let server = new Server(server_config);
  res.json(server.getToken(req));
});
app.post('/token', async function(req, res) {
  let server = new Server(server_config);
  res.json(server.getToken(req));
});
app.delete('/token', async function(req, res) {
  let server = new Server(server_config);
  server.deleteToken(req);
  res.end();
});

app.post('/goal', function(req, res){
  let server = new Server(server_config);
  res.json(server.postGoal(req));
});

app.get('/goal', function(req, res) {
  let server = new Server(server_config);
  res.json(server.getGoal(req));
});

app.listen(port, () => console.log(`Listening on ${port}`));