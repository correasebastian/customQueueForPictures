var rp = require('request-promise');
var constants = require('../common/constants');
var exception = require('../common/exception');
var method = "POST";
var uri = constants.baseApi + 'inspecciones';
var root = constants.fbRoot;
var tasksRef = root.child("inspecciones2up").child('queue').child('tasks')
module.exports = (function() {


    var services = {
        startBackup: startBackup
    };

    return services;

    function startBackup() {
        console.info('init inspecciones2up');
        tasksRef.on('child_added', onAdd)
    }

    function onAdd(snap) {
        console.log(snap, snap.val())
        var key = snap.key()
        var data = snap.val();
        if (data.error) {
            return
        }
        var body =
            {
                "idInspeccion": key,
                "placa": data.placa
            };

        uploadPicture()
            .then(onSend)
            .then(onAtomicInsert)
            .catch(writeError)



        function uploadPicture() {

            // ESTE METODO TAMBIEN FUNCIONA Y LUCE MAS ORGANIZADO
            var options = {
                method: method,
                uri: uri,
                body: body,
                json: true // Automatically stringifies the body to JSON 
            };

            return rp(options);
        }

        function onSend(response) { // resolve('ok')

            console.log('ok insert in sql ', response);
            var updatedMessage = {}
            var main = 'inspecciones/' + key + '/uploaded'
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
