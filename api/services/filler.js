// добавление ролей

var self = {};
var accum = {};
self.fillRoles = function() {
    //НЕ МЕНЯТЬ ИД, только дописываться в конец
    var list = [{
        id: 1,
        name: 'Администратор'
    }, {
        id: 2,
        name: 'Редактор'
    }, {
        id: 3,
        name: 'Зарегистрированный пользователь'
    }];
    console.log('qqweqwe')
    return Role.findOrCreate(_.map(list, function(l) {
        return {
            id: l.id
        };
    }), list);
};
self.fillUsers = function() {

    var list = [{
        id: 1,
        email:'admin@mail.ru',
        username: 'admin',
        admin: true,
        role: 1,
    }, {
        id: 2,
        username: 'editor',
        email:'editor@mail.ru',
        admin: false,
        role: 2,
    }, {
        id: 3,
        username: 'user',
        email:'user@mail.ru',
        admin: false,
        role: 3,
    }];
    return User.findOrCreate(_.map(list, function(l) {
        return {
            id: l.id
        };
    }), list);

};
self.fillPassports = function() {

    var list = [{
        id: 1,
        user: 1,
        strategy: 'local',
        password: 'admin',
        protocol: 'local'
    },
    {
        id: 2,
        user: 2,
        strategy: 'local',
        password: 'editor',
        protocol: 'local'
    },
    {
        id: 3,
        user: 3,
        strategy: 'local',
        password: 'user',
        protocol: 'local'
    },

    ];
    return Passport.findOrCreate(_.map(list, function(l) {
        return {
            id: l.id
        };
    }), list)

};
self.fillPosts = function() {
    var test_post = {
        title: 'тестовый пост',
        description: 'Описание тестового поста',
        content: 'Контент тестового поста',
        author: 1,
        id: 1
    }
    return Post.findOrCreate(test_post)
};
self.fillComments = function() {
    var test_comment = {
        content: 'тестовый коммент',
        post: 1,
        author: 3,
        id: 1
    }
    var list = [{
        content: ' ответ на тестовый коммент',
        post: 1,
        author: 2,
        id: 2,
        comment: 1
    }, {
        content: 'ответ на ответ на тестовый коммент',
        post: 1,
        author: 1,
        id: 3,
        comment: 2
    }];

    return Coment.findOrCreate(_.map(list, function(l) {
        return {
            id: l.id
        };
    }), list)
}


module.exports = self
