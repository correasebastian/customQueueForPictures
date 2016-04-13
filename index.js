var auth = require('./common/auth');
var i2up = require('./queues/inspecciones2up');
var p2up = require('./queues/pictures2up');


auth.authWithToken().then(onAuth)

function onAuth(argument) {
    console.log('autenticatec');
    console.log(process.env.SEBAS || 'not definde SEBAS');
    console.log(i2up)
    i2up.startBackup();
    p2up.startBackup();
}