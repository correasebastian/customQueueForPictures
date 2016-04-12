var auth = require('./common/auth');

auth.authWithToken().then(onAuth)

function onAuth(argument) {
    console.log('autenticatec');
    console.log(process.env.SEBAS || 'not definde SEBAS');


}