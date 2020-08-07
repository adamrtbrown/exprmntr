import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import Goal from './lib/Goal.js'
import {ABCIAMAppServer} from 'ABCIAM';
import jwt from 'jsonwebtoken';
import DB from './tools/db.js';

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


app.get('/test', function(req, res){
  res.json({test:1});
});
app.get('/token', async function(req, res) {
  console.log("Getting token", req.body, req.query,"\n\n");
  try {
    let config = {
      app_id: process.env.ABCIAM_APP_ID,
      app_secret:process.env.ABCIAM_APP_SECRET,
      url: process.env.ABCIAM_URL
    }
    let abc = new ABCIAMAppServer(config);
    let refreshToken = await abc.login(req.body.id_token, req.body.provider);
    console.log("\n\n","ABCIAM Login complete","\n");
    let decoded = jwt.decode(refreshToken);
    console.log("decoded", decoded);
    let expiry = Math.round(new Date().getTime() / 1000) + accessExpiry;
    let accessToken = await createToken({user: decoded.user}, expiry);
    
    let retvar = {'refreshToken': refreshToken, 'accessToken': accessToken};
    console.log("created Token", retvar);
    res.json(retvar);
  } catch (err) {
    console.log(err);
    res.json({"err":1})
  }
});

app.delete('/token', async function(req, res) {
  console.log("deleting token");
  let config = {
    app_id: process.env.ABCIAM_APP_ID,
    app_secret:process.env.ABCIAM_APP_SECRET,
    url: process.env.ABCIAM_URL
  }
  let abc = new ABCIAMAppServer(config);
  await abc.logout(req.body.token, req.body.all);
  res.end();
});

app.post('/goal', function(req, res){
  let data = req.body;
  console.log("GOAL", req.body)
  //Add Security here
  //Add access control here
  let entity = null;
  let goal = new Goal();
  console.log("GOAL TOKEN CLAIMS",  req.token_claims);
  let user = req.token_claims.user
  if(data.id) { 
    entity = goal.editGoal(data.id, user, data.title, data.success, data.metrics);
  } else {
    entity = goal.createNew(user, data.title, data.success, data.metrics);
  } 
  res.json({id: entity.id});

});

app.get('/goal', function(req, res) {
  let goal = new Goal();
  let entity = goal.readGoal(req.body.id);
  res.json({id:entity.id, user: entity.user, goal:entity.goal, success:entity.success});
});

async function createToken(claims, expirySeconds) {
  claims.exp = expirySeconds;
  
  signing_key = await getSigningKey();
  let token = jwt.sign(claims, signing_key, {algorithm: 'HS256'});
  return token;
}
async function getSigningKey() {
  let db = new DB();
  if(signing_key === null) {
    let result = await db.query('SELECT `latest` FROM `signing_keys` LIMIT 1');
    signing_key = result.results[0].latest;
  }
  return signing_key;
}

app.listen(port, () => console.log(`Listening on ${port}`));