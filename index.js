LightJsonP = function(callback, callbackParamName) {
  var self = this;
  self.callback = callback;
  this.expando = Math.random().toString().replace(/\D/g, "");
  this.nonce = new Date().getTime();

  this.fetch = function(url) {
    var jsonpCallback = "keanu" + this.expando + "_" + this.nonce;
    this.nonce = this.nonce + 1;

    this.registerCallbackFunction(jsonpCallback, function(response) {
      self.callback(response);
    });

    var urlObj = new URL(url);
    urlObj.searchParams.append(callbackParamName, jsonpCallback);
    var e = document.createElement("script");
    e.src = urlObj.toString();
    document.body.appendChild(e);
  };

  this.registerCallbackFunction = function(callbackName, callbackFunction) {
    window[callbackName] = function(response) {
      callbackFunction(response);
      delete window[callbackName];
    }
  }
};