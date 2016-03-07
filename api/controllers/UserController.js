/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
// var passport = require('passport');
module.exports = {
    //@API - создание пользователя

    /**
     * Создание нового пользователя,
     * в качестве параметров передаем
     * имя пользователя, пароль, и булевое
     * значение админ. После создания
     * пользователя он аутентифицируется
     * в сессии. После создания пользователя
     * администратора мы установим политику
     * admin (api/policies/admin.js) чтобы к
     * этой функции больше не могли обращаться
     * не привелегированные пользователи
     */

    create: function(req, res) {
        var elem = {
            username: req.param('username'),
            password: req.param('password'),
            admin: req.param('admin'),
            role: 3
        };
        console.log('qweqweqwe', elem)

        var accum = {};
        User.create(elem)
            .then(function(user) {
                console.log('qweqweqwe_1', user)
                return User.findOne({
                    id: user.id
                }).populateAll();
            })
            .then(function(user) {
                console.log('qweqweqwe_2', user)
                accum.user = user;
                return Role.findOne({ name: 'user' });
            })
            .then(function(role) {
                console.log('qweqweqwe_3', role)
                accum.user.roles.add(role.id);

                return accum.user.save();
            })
            .catch(res.serverError)
    },
    update: function(req, res) {

        var Id = parseInt(req.param('id'));
        var email = req.param('email');
        var password = req.param('password');

        // var params = {
        //     email    : req.param('email'),
        //     password: req.param('password'),
        // };
        return Q()
            .then(function() {
                if (password) {
                    console.log('SESSION!!!!!!!!!!!!!', req.session);
                    sails.hooks.email.send(
                        "testEmail", {
                            recipientName: req.session.User.username,
                            senderName: req.session.User.username,
                            password: password
                        }, {
                          from:"arkabelz@gmail.com",
                            to: "arkabelz@gmail.com",
                            subject: "Вы подали заявку на смену пароля"
                        },
                        function(err) { console.log(err || "It worked!"); }
                    )
                }
            })
            .then(function() {
                if (password) {
                    Passport.update({
                        user: Id
                    }, { password: password });
                }

            })
            .then(function() {
                if (email) {
                    return User.update({
                        id: Id
                    }, { email: email });
                }
            })
            .then(function() {
                res.send('done');
            })
            .catch(res.serverError);
    },
    // @MAIN
    index: function(req, res) {
        res.view();
    },
    settings: function(req, res) {
        res.view('user/settings');
    }
};
