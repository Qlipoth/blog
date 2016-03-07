var moment = require('moment');
var url = require("url");
var Q = require('q');
var mkdirp = require('mkdirp');
var cheerio = require('cheerio');

function recToArr(el, html, arr) {
    var re = new RegExp(el)
    if (!(re.test(html))) {
        arr.push(el.toString())
    }
    console.log('Files: ' + el, re);
}

function checkContent(html, path) {
    var rem_files = [];
    var tasks = [];
    return Q()
        .then(function() {
            if (fs.existsSync(path)) {
                return fs.readdirSync(path);
            } else return [];
        })
        .then(function(readed_files) {
            if (readed_files) {
                readed_files.forEach(function(f) {
                    recToArr(f, html, rem_files)
                })
            }
            console.warn('r___files!!!!', rem_files);
            return rem_files
        })
}

function processPost(html, field, d, params) {
    console.warn('зашел сюда');
    var $ = cheerio.load(html);
    var tasks = [];
    console.log($('img'));
    $('img, .fr-file').each(function(i, el) {
        var el = $(el);
        var data;
        if (el.is('img')) {
            data = el.attr('src');
        } else if (el.is('.fr-file')) {
            data = el.attr('href');
        }

        if (data && data.indexOf('/uploads/') !== -1) {
            console.log('какая-то ошибка!!');
            return;
        }
        tasks.push(
            uploader
            .uploadBase64Image(data, 'posts/' + d + '/')
            .then(function(uploaded) {
                if (!uploaded) {
                    console.warn('Картинка не загружена. Удаляю.');
                    el.remove();
                } else {
                    console.warn('Добавлен SRC');
                    if (el.is('img')) {
                        el.attr('src', '/uploads/posts/' + d + '/' + uploaded);
                    } else if (el.is('.fr-file')) {
                        el.attr('href', '/uploads/posts/' + d + '/' + uploaded);
                    }
                    params[field] = $.html();
                    console.log('название поля: ', params[field]);
                }
            })
        );
    });
    return Q.all(tasks);
}

module.exports = {

    create: function(req, res) {
        var tags = req.param('tags');
        var _tags = _.map(tags, function(t) {
            return {
                name: t
            };
        });
        var params = {
            description: req.param('description'),
            content: req.param('content'),
            title: req.param('title'),
        };
        var accum = {};
        var saved_post;
        return Q()

        .then(function() {
                return Tag.findOrCreate(_tags);
            })
            .then(function(tags) {
                params.tags = tags;
            })
            .then(function() {
                return Post.create({ title: params.title, description: '1234', content: '12345' });
            })
            .then(function(created) {
                console.log('1', created)
                saved_post = created;
                return Q.all([
                    processPost(params.description, "description", saved_post.id, params),
                    processPost(params.content, "content", saved_post.id, params)
                ])
            })
            .then(function() {
                console.log('2', saved_post)
                return Post.update({
                    id: saved_post.id
                }, params)
            })
            .then(function() {
                return Post.findOne({
                    id: saved_post.id
                });
            })
            .then(function(post) {
                accum.post = post;
                return User.findOne({
                    id: req.user.id
                });
            })
            .then(function(user) {
                accum.post.author = user.id;
                return accum.post.save();
            })
            .then(function(created) {
                res.send({
                    post_id: created.id
                });
            })
            .catch(res.serverError);
    },
    update: function(req, res) {

        var Id = parseInt(req.param('id'));
        var _tags = _.map(req.param('tags'), function(t) {
            return {
                name: t
            };
        });
        var params = {
            description: req.param('description'),
            content: req.param('content'),
            title: req.param('title'),
        };
        var path1 = appRoot + '/assets/uploads/posts/' + Id;
        var path2 = appRoot + '/.tmp/public/uploads/posts/' + Id;

        return Q()
            .then(function() {
                return Tag.findOrCreate(_tags);
            })
            .then(function(tags) {
                params.tags = tags;
            })
            .then(function() {
                console.log('111111');
                if (path1) {
                    return Q.all([
                        checkContent(params.description, path1),
                        checkContent(params.content, path1)
                    ])
                }
            })
            .then(function(arr) {
                var arr = _.intersection(arr[0], arr[1])
                arr.forEach(function(f) {
                    console.log(path1 + '/' + f);
                    fs.removeSync(path1 + '/' + f);
                    fs.removeSync(path2 + '/' + f);
                })
            })
            .then(function() {
                console.log('22222');
                return Q.all([
                    processPost(params.description, "description", Id, params),
                    processPost(params.content, "content", Id, params)
                ])
            })

        .then(function() {
                console.log('33333')
                Post.update({
                    id: Id
                }, params).exec(function(err) {
                    if (err) return res.send(500);
                    res.redirect('/admin');
                });
                return fs.readdirSync(path1)
            })
            .then(function(arr) {
                if (!arr.length) {
                    fs.removeSync(path1);
                    fs.removeSync(path2);
                }
            })
            .catch(res.serverError)
    },
    remove_rec: function(req, res) {

        var Id = req.param('id');
        var title = req.param('title');
        return Q()
            .then(function() {
                return Post.destroy(Id).exec(function(err) {
                    if (err) return res.send(500);
                    res.redirect('/admin');
                });
            })
            .then(function() {
                var path1 = appRoot + '/assets/uploads/posts/' + Id;
                var path2 = appRoot + '/.tmp/public/uploads/posts/' + Id;
                console.warn(path2);
                return Q.all([
                    fs.removeSync(path1),
                    fs.removeSync(path2)
                ])
            })
            .then(function() {
                console.log('Полностью удален');
            })

    },

    /**
     * @MAIN - Конечная обработка
     * и отображение данных из БД
     */


    /**
     * Индексный контроллер - в REST это основная страница
     * @example /example/ это index: контроллера example.
     * В данном случае данный котроллер просматривает
     * все записи в БД для модели Post, производит сортировку,
     * первичную пагинацию постов и на выходе мы получаем
     * заветный список постов.
     */

    index: function(req, res) {
        // Поиск в модели Post
        Post.find()
            .populateAll()
            .sort('id DESC')
            .limit(5)
            .then(function(posts) {
                var obj = {};
                obj.posts = posts;
                Post.count().exec(function(error, found) {
                    obj.count = found;
                    res.view({
                        posts: obj
                    });
                })
            })
    },

    /**
     * Контроллер для отображение информации
     * отдельного элемента БД из модели Post
     * в нашем случае: findOne - поиск одной записи.
     * В качестве параметра мы передаем в строке
     * GET запрос: '/post/watch/:id' - где
     * :id - req.param('id'), и передав параметр
     * сервер ищет запись и выдает на ее полностью.
     */
    watch: function(req, res) {
        var Id = req.param('id');

        function buildCOmmentTree(item, arr) {
            var buff_arr = [];
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].comment && (arr[i].comment.id === item.id)) {
                    buff_arr.push(arr[i]);
                    arr[i].marked = true;
                }
            }
            if (buff_arr.length) {
                item.childs = buff_arr;
                return buildCOmmentTree(item.childs, arr);
            }
        }
        Post.findOne(Id).populateAll().then(function(post) {
            Coment.find({
                    post: Id
                }).populateAll().then(function(coms) {
                    var arr = coms;
                    arr.forEach(function(item) {
                        buildCOmmentTree(item, arr);
                    });
                    return _.remove(arr, function(el) {
                        return !el.hasOwnProperty('marked');
                    });
                })
                .then(function(new_coms) {
                    post.comments = new_coms;
                    res.view({
                        post: post
                    });
                })
                // return Q.forEach(post.toJSON().comments, function(value) {
                //         console.log('_12', value)
                //         return User.findOne({
                //             id: value.author
                //         }).then(function(el) {
                //           console.log('_13')
                //           console.log('elllllll',el)
                //           // if (el){
                //             value.authorname = el.username
                //           return value
                //         })
                //     })
                //     .then(function(resolutions) {
                //       console.log('resollllllllllll',resolutions)
                //       accum.comments=resolutions;
                //       console.log('accum',accum)
                //       return accum
                //     })
                //     .then(function(obj){
                //       console.log('objjjj',obj)
                //       res.view({
                //             post: obj
                //         });
                //     })
        });
    },
    page: function(req, res) {
        var page = req.param('page');
        Post.find()
            .populateAll()
            .sort('id DESC')
            .paginate({
                page: page,
                limit: 5
            })
            .then(function(posts) {
                var obj = {};
                obj.posts = posts;
                Post.count().exec(function(error, found) {
                    obj.count = found;
                    res.view({
                        posts: obj
                    });
                });
            })

    }
};
