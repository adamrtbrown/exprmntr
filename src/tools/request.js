import axios from 'axios';
import Token from './token';
class Request {
    constructor() {
        this.T = new Token();
        if(this.T.access === "") {
            throw new Error("Unauthorized");
        }
    }

    async request(method, url, data) {
        let config = {
            method: method,
            url: process.env.REACT_APP_API_URL + url,
            withCredentials: true,
            headers: {
                'Bearer': this.T.access
            } 
        }
        if(String(method).toUpperCase() === "GET") {
            config.params = data;
        } else {
            config.data = data;
        }
        try {
            let response = await axios(config);
            return response;
        } catch(error) {
            console.error("Request error: ", error);
            return false;
        }
        
    }
}
export default Request;