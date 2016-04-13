var auth = require('./common/auth');
var i2up = require('./queues/inspecciones2up');

auth.authWithToken().then(onAuth)

function onAuth(argument) {
    console.log('autenticatec');
    console.log(process.env.SEBAS || 'not definde SEBAS');
    console.log(i2up)
    i2up.startBackup();
}