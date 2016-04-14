var Firebase = require('firebase');
var fbRoot = new Firebase('https://testingajonline.firebaseio.com/');
var fbSecret = 'tpA8HFIZg6DUvt0wxUcZvH6NaKpGbFE7pt253UB2';
module.exports = {
    fbRoot: fbRoot,    
    fbSecret:fbSecret,
    baseApi: "http://localhost:58472/api/"
};
