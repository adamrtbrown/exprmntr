class Request {
  constructor(authObject = null) {
    this.authObject = null;
  }

  get auth() {
    if(this.authObject === null) {
      return {
        refreshToken: "",
        authToken: ""
      }
    }
    return this.authObject;
  }
  set auth(authObject) {
    this.authObject = authObject;
  }

  request(config) {
    if(!config.url) {
      throw new Error("No URL specified");
      return;
    }
    let url = config.url;
    delete config.url;
    if(!config.method) {
      config.method = "GET";
    }
    if(!config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json';
    }
    if(config.auth !== false) {
      config.headers["Authorization"] = "Bearer " + this.auth.authToken;
    }
    let config = {
      method: "delete",
      headers: {
          'Content-Type': 'application/json', 
      },
      body: JSON.stringify({'token': this.refreshToken, 'all': all}),
  }
    let response = await fetch(url, config);
    let data = await response.json();
  }
}