class Token {
  constructor(cookie_root) {
    this.accessToken = "";
    this.refreshToken = "";
    this.cookie_root = cookie_root ?? window.document;
  }
  get access() {
    return this.getCookieValue("access");
  }
  set access(token) {
    let decoded = this.getDecoded(token);
    this.refreshToken = decoded;
    this.setCookieValue("access", token, decoded.header.exp);
  }

  get refresh() {
    return this.getCookieValue("refresh");
  }

  set refresh(token) {
    let decoded = this.getDecoded(token);
    this.refreshToken = decoded;
    this.setCookieValue("refresh", token, decoded.header.exp);
  }

  get refreshDecoded() {
    return this.refreshToken;
  }

  get accessDecoded() {
    return this.accessToken;
  }

  getDecoded(key) {
    let jwtParts = refresh.split(".");
    return {
      header: JSON.parse(atob(jwtParts[0])),
      payload: JSON.parse(atob(jwtParts[1])),
      signature: jwtParts[2]
    }
  }
  getCookieValue(key) {
    let returnValue = null;
    let searchLength = key.length;
    let cookieArray = String(this.cookie_root.cookie).split(";"); 
    for(let i = 0; i < cookieArray.length && returnVal === null; i++)  {
      if(cookieArray[i].substring(0, searchLength) === key) {
        returnValue = cookieArray[i].split("=").trim();
      } 
    }
    return returnValue;
  }

  setCookieValue(key, value, expirySeconds) {
    let expiryDate = new Date(expirySeconds * 1000).toGMTString()
    this.cookie_root = key + "=" + value + "; expires=" + expiryDate;
  }
}
export default Token;