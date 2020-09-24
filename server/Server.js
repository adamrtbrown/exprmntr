import Goal from './lib/Goal.js'
import {ABCIAMAppServer} from 'ABCIAM';
import jwt from 'jsonwebtoken';
import DB from './tools/db.js';

class Server {
    constructor(server_config) {
        this.abciam_config = {
            app_id: (server_config.app_id) ? server_config.app_id : null,
            app_secret: (server_config.app_secret) ? server_config.app_secret : null,
            url: (server_config.url) ? server_config.url : null, 
        }
        this.signing_key = null;
    }

    set config(config) {
        this.abciam_config = config;
    }
    get config() {
        return this.abciam_config;
    }

    async getToken(req){
        console.log("Getting token");
        try {
            let config = {
                app_id: process.env.ABCIAM_APP_ID,
                app_secret:process.env.ABCIAM_APP_SECRET,
                url: process.env.ABCIAM_URL
            }
            let abc = new ABCIAMAppServer(this.abciam_config);
            let refreshToken = await abc.login(req.body.id_token, req.body.provider);
            let decoded = jwt.decode(refreshToken);
            let expiry = Math.round(new Date().getTime() / 1000) + Number(process.env.ACCESS_EXPIRY);
            let accessToken = await this.createToken({user: decoded.user}, expiry);
            
            let retvar = {'refreshToken': refreshToken, 'accessToken': accessToken};
            console.log("created Token", retvar);
            return retvar;
        } catch (err) {
            console.log(err);
            return {"err":1};
        }
    }
    async postToken(req) {
        let abc = new ABCIAMAppServer(this.abciam_config);
        let response = await abc.refresh(req.body.token);
        return response;
    }
    async deleteToken(req) {
        let abc = new ABCIAMAppServer(this.abciam_config);
        await abc.logout(req.body.token, req.body.all);
        return true;
    }

    async getGoal(req) {
        let goal = new Goal();
        let entity = goal.readGoal(req.body.id);
        return {id:entity.id, user: entity.user, goal:entity.goal, success:entity.success}
    }

    async postGoal(req) {
        let data = req.body;
        let entity = null;
        let goal = new Goal();
        let user = req.token_claims.user
        try{
            if(data.id) { 
                entity = goal.editGoal(data.id, user, data.title, data.success);
            } else {
                entity = goal.createNew(user, data.title, data.success);
            }  
            return {id: entity.id}
        } catch (err) {
            console.log("There was an error POSTing the goal.");
        }
        return "error";
    }

    async createToken(claims, expirySeconds) {
        claims.exp = expirySeconds;
        let signing_key = await this.getSigningKey();
        let token = jwt.sign(claims, signing_key, {algorithm: 'HS256'});
        return token;
      }
    async getSigningKey() {
        let db = new DB();
        if(this.signing_key === null) {
            let result = await db.query('SELECT `latest` FROM `signing_keys` LIMIT 1');
            this.signing_key = result.results[0].latest;
        }
        return this.signing_key;
    }

    routeSecurity(route) {
        const routes = [
            "/"
        ];
        if(routes.includes(route)) {
            return true;
        }
        return false;
    }
}
export default Server;