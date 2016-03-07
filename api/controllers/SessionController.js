var passwordHash = require('password-hash');

module.exports = {


	create: function (req, res) {

		var username = req.param('username'),
			password = req.param('password');

		if (!username || !password) {
			return res.redirect('/session');
		};

		User.findOneByUsername(username).exec(function (err, user) {
			if (!user || err){
				return res.send(500);
			}
				console.warn(password, user.encryptPassword);
				console.warn('hashed',passwordHash.verify(password, user.encryptPassword));
			// if (passwordHash.verify(password, user.encryptPassword)) {

				// Авторизовать пользователя в сессии
                                // Дать доступ к данным авторизованного
                                // пользователя из сессии
				req.session.auth = true;
				req.session.User = user;

				if (req.session.User.admin) {
					console.warn('admin!!!!!!!!!!!!!!!!!')
					return res.redirect('/admin');
				};
			// }
			// else{
			// 	console.error('бляяяяять!!!');
			// }
		});
	},

	destroy: function (req, res) {
		User.findOne(req.session.User.id).exec(function (err, user) {
			if (user) {
				req.session.destroy();
				res.redirect('/');
			} else { res.redirect('/login'); };
		});
	},

	index: function (req, res) {

		res.view();
	}
};
