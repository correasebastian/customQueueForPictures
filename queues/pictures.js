var rp = require('request-promise');
var constants = require('../common/constants');
var exception = require('../common/exception');
var method = "POST";
var uri = constants.baseApi + 'test/filestwo';
module.exports = (function() {
    var root = constants.fbRoot;
    var tasksRef = root.child("pics2up").child('queue').child('tasks')
    var services = {
        startBackup: startBackup
    };

    return services;

    function startBackup() {
        tasksRef.on('child_added', onAdd)
    }

    function onAdd(snap) {
        console.log(snap, snap.val())
        var key = snap.key()
        var data = snap.val();
        if (data.error) {
            return
        }

        uploadPicture()
            .then(onSend)
            .then(onAtomicInsert)
            .catch(writeError)



        function uploadPicture() {

            var tokensArray = []
            tokensArray.push(token);
            // ESTE METODO TAMBIEN FUNCIONA Y LUCE MAS ORGANIZADO
            var options = {
                method: method,
                uri: uri,
                body: getJson(data.placa, tokensArray),
                headers: pushHeaders,
                json: true // Automatically stringifies the body to JSON 
            };

            return rp(options);
        }

        function onSend(response) { // resolve('ok')

            console.log('ok push', response);
            var updatedMessage = {}
            var main = 'notificacionesByInspeccion/' + data.idInspeccion + '/' + data.idNotification + '/info'
            updatedMessage[main] = response;
            return root.update(updatedMessage)
        }

        function onAtomicInsert(res) {
            // logger.success('mensaje enviado', res);
            tasksRef.child(key).remove()

        }

        function writeError(err) {
            console.log(err)
            tasksRef.child(key).child('error').set(err)

        }


    }






})();
