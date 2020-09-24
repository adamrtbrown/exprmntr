class Request {
  constructor() {
    this.tokenRaw = null;
  }

  get token() {
    return this.tokenRaw;
  }
  set token(token){
    this.tokenRaw = token;
  }
  
  async request(config) {
    if (!this.isTokenExpired(this.refreshToken)) {
        console.log("refresh is not expired")
        if(this.isTokenExpired(this.accessToken) || this.isTokenExpired(this.refreshToken, 30 * 60)) {
            await this.refresh();
        }
    } else {
        console.log("refresh is expired. logging out");
        this.logout();
    }
    
    if(!config.headers){
        config.headers = {'Content-Type': 'application/json'};
    }
    config.headers.Authorization = "Bearer " + this.accessToken;
    
    let url = this.serverURL + config.url;
    console.log("Fetching: ", url, config);
    let response = await fetch(url, config);
    return response;
  }
}