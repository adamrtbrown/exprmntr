import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import axios from 'axios'
import cors from 'cors'
import Goal from './lib/Goal'

dotenv.config({path: './server/.env'});

let port = process.env.SERVER_PORT;
let app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('build'));
app.use(function(req, resp, next){
  console.log(req.originalUrl);
  next();
})
app.get('/test', function(req, res){
  res.json({test:1});
});
app.post('/login', async function(req, res){
  try {
    console.log("hit login");
    let params = {
      id_token: req.body.id_token,
      provider: req.body.provider,
      app_id: process.env.ABCIAM_APP_ID
    }
    console.log("Posting to " + process.env.ABCIAM_URL);
    let abc_res = await axios.post(process.env.ABCIAM_URL, params);
    let data = abc_res.data;
    let retvar = {'err': 1};
    if(!data.err) {
      retvar = {'token': data.token}
    }
    //console.log("user", data);
    res.json(retvar);
  } catch (err) {
    console.log(err);
    res.json({"err":1})
  }
});

app.post('/goal', function(req, res){
  let data = req.body;
  //Add Security here
  //Add access control here
  let entity = null;
  let goal = new Goal();
  if(data.id) { 
    entity = goal.editGoal(data.id, data.user, data.goal, data.success);
  } else {
    entity = goal.createNew(data.user, data.goal, data.success);
  } 
  res.json({id: entity.id});

});

app.get('/goal', function(req, res) {
  let goal = new Goal();
  let entity = goal.readGoal(req.body.id);
  res.json({id:entity.id, user: entity.user, goal:entity.goal, success:entity.success});
});

app.listen(port, () => console.log(`Listening on ${port}`));