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
  let server = new Server(server_config);
  if(!token_header && server.routeSecurity(req.originalUrl)) {
    console.log("No Auth token");
    res.send("Unauthorized", 404);
    res.end();
    return;
  }
  let token = String(token_header).split(" ")[1];
  let key = await server.getSigningKey();
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
  let response = await server.getToken(req);
  console.log("GET TOKEN DONE: ", response);
  res.json(response);
});
app.post('/token', async function(req, res) {
  let server = new Server(server_config);
  res.json(await server.postToken(req));
});
app.delete('/token', async function(req, res) {
  let server = new Server(server_config);
  await server.deleteToken(req);
  res.end();
});

app.post('/goal', async function(req, res){
  let server = new Server(server_config);
  res.json(await server.postGoal(req));
});

app.get('/goal', async function(req, res) {
  let server = new Server(server_config);
  res.json(await server.getGoal(req));
});

app.listen(port, () => console.log(`Listening on ${port}`));

function log(msg) {
  console.log("SERVER: ", msg)
}