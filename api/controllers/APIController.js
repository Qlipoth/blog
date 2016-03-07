var Q = require('Q');
var mkdirp = require('mkdirp');
var mkdirp_q = Q.denodeify(mkdirp);

module.exports = {
    upload: function(req, res) {
        console.info('uploading');
        var file = req.file('file');
        var path = req.param('path');

        upload(file, path)
            .then(function(uploaded) {
                if (!Array.isArray(uploaded) || uploaded.length === 0) {
                    throw new Error('no files uploaded');
                }
                var f = uploaded[0];
                return res.json({
                    status: 200,
                    files: [f],
                    filename: f.filename,
                });
            })
            .catch(function(err) {
                console.error('uploading:', err);
                return res.serverError(err);
            })
    },
    uploadCropped: function(req, res) {

        var path = req.param('path');
        var cropped = req.param('cropped');
        console.log(path);
        var Id = parseInt(path.split('/').pop());
        // var Id =_.split(path, '/').pop();
        console.log(Id);
        var path_1 = appRoot + '/assets/uploads/tmp' + path + '/';
        var path_2 = appRoot + '/.tmp/public/uploads/tmp' + path + '/';
        var name = Math.random().toString(36).substring(7) + '.jpeg';

        var params = {
                image: name
            }
            // слишком "грязно" написано
            // TODO: переписать.

        return Q.all([
                mkdirp_q(path_1),
                mkdirp_q(path_2),
            ])
            .then(function() {
                console.log(params, Id)
                return User
                  .findOne({id: Id})
                  .then(function(user) {
                    user.image = params.image;
                    console.log('save')
                    return user.save();
                  })
                // return User.update({
                //     id: Id
                // }, params)
            })
            .then(function() {
                console.log('000')
                return uploader.saveBase64Image(cropped, path_1, name);
            })
            .then(function() {
                console.log('111')
                return uploader.saveBase64Image(cropped, path_2, name);
            })
        .then(function() {
            return res.json({
                status: 200,
                filename: name,
            });
        })
        .catch(function(err) {
            console.error('uploadCropped:', err);
            return res.serverError(err);
        })
    },
}
