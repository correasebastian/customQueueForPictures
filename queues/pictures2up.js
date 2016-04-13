var rp = require('request-promise');
var constants = require('../common/constants');
var exception = require('../common/exception');
var method = "POST";
var uri = constants.baseApi + 'test/filestwo';
module.exports = (function() {
    var root = constants.fbRoot;
    var tasksRef = root.child("pictures2up").child('queue').child('tasks')
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

        var body = {
            "base64Data": data.base64Data,
            "name": data.timestamp + '.jpeg',
            "idFoto": key,
            "idInspeccion": data.idInspeccion,
            "placa": data.placa

        }

        function uploadPicture() {
            var options = {
                method: method,
                uri: uri,
                body: body,
                json: true // Automatically stringifies the body to JSON 
            };

            return rp(options);
        }

        function onSend(response) { // resolve('ok')
            console.log('ok upload picture', response);
            var updatedMessage = {}
            var main = 'fotosByInspeccion/' + data.idInspeccion + '/' + key + '/uploaded'
            updatedMessage[main] = true;
            return root.update(updatedMessage)
        }

        function onAtomicInsert(res) {
            // logger.success('mensaje enviado', res);
            tasksRef.child(key).remove()

        }

        function writeError(err) {
            console.log(err)
            var errObj = { message: err.message || 'error', name: err.name || 'name' }
            tasksRef.child(key).child('error').set(errObj)

        }


    }






})();