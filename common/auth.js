var constants = require('../common/constants');
var FirebaseTokenGenerator = require("firebase-token-generator");
var tokenGenerator = new FirebaseTokenGenerator(constants.fbSecret);
// var tokenGenerator = new FirebaseTokenGenerator(process.env.FBSECRET);

var token = tokenGenerator.createToken({
    uid: "nodeServerQueueFotos"
});

function authWithToken() {
    return new Promise(function(resolve, reject) {
        constants.fbRoot.authWithCustomToken(token, function(error, authData) {
            if (error) {
                console.log("Login Failed!", error);
                reject(error)
            } else {
                console.log("Login Succeeded!", authData);
                resolve(authData)
            }
        });

    });
}


function authWithPassword() {
    return new Promise(function(resolve, reject) {
        constants.fbRoot.authWithPassword({
            email: 'a@a.com',
            password: 'a'
        }, function(error, authData) {
            if (error) {
                console.log("Login Failed!", error);
                reject(error)
            } else {
                console.log("Login Succeeded!", authData);
                resolve(authData)
            }
        });

    });
}


var services = {
    authWithToken: authWithToken
};


module.exports = services;
