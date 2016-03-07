// /**
//  * Полностекстовый поиск:
//  * - Post
//  * - Material
//  * - Org
//  * - Project
//  * - Tech
//  */
// var lunr = require('lunr');
// require('lunr-languages/lunr.stemmer.support')(lunr);
// require('lunr-languages/lunr.ru')(lunr);

// var search_obj = {}
//     // var me = {};
//     // var Index = function() {}

// function init() {
//     return Q()
//         .then(function() {
//             return Q.all([
//                 function() {
//                     search_obj.create(Post, Post.title, {
//                         fields: [{
//                             name: 'title',
//                             opts: {
//                                 boost: 10
//                             }
//                         }, {
//                             name: 'text'
//                         }, ]

//                     });
//                 },
//             ])
//         })
// }


// function create(Model, indexName, opts) {
//     var name = indexName;
//     search_obj[name] = lunr(function() {
//         var that = this;
//         _.each(opts.fields, function(field) {
//             that.field(field.name, field.opts);
//         })
//         that.use(lunr.ru);
//     });

//     search_obj[name].getModel = function() {
//             return Model;
//         }
//         // заполнение индекса
//     Model
//         .find(opts.req)
//         .then(function(items) {
//             _.each(items, function(item) {
//                 search_obj[name].add(item);
//             })
//         })
// }



// // TODO:  заменить на промисы
// Index.prototype.init = function(cb) {
//     var that = this;
//     async.series([
//         function(next) {
//             that.create(Post, Post.globalId, {
//                 fields: [{
//                     name: 'title',
//                     opts: {
//                         boost: 10
//                     }
//                 }, {
//                     name: 'text'
//                 }, ],
//                 req: {
//                     isInArchive: false,
//                     visible: true,
//                 },
//             }, next);
//         },
//         function(next) {
//             that.create(Post, 'PostArch', {
//                 fields: [{
//                     name: 'title',
//                     opts: {
//                         boost: 10
//                     }
//                 }, {
//                     name: 'text'
//                 }, ],
//                 req: {
//                     isInArchive: true,
//                     visible: true,
//                 },
//             }, next);
//         },
//         function(next) {
//             that.create(Material, Material.globalId, {
//                 fields: [{
//                     name: 'name',
//                     opts: {
//                         boost: 10
//                     }
//                 }, {
//                     name: 'text'
//                 }, ],
//                 req: {
//                     isFolder: false,
//                 },
//             }, next);
//         },
//         function(next) {
//             that.create(Org, Org.globalId, {
//                 fields: [{
//                     name: 'name',
//                     opts: {
//                         boost: 10
//                     }
//                 }, {
//                     name: 'link',
//                     opts: {
//                         boost: 10
//                     }
//                 }, {
//                     name: 'about'
//                 }, {
//                     name: 'resources'
//                 }, ],
//                 req: {},
//             }, next);
//         },
//         function(next) {
//             that.create(Project, Project.globalId, {
//                 fields: [{
//                     name: 'name',
//                     opts: {
//                         boost: 10
//                     }
//                 }, {
//                     name: 'shortName',
//                     opts: {
//                         boost: 10
//                     }
//                 }, {
//                     name: 'text'
//                 }, ],
//                 req: {},
//             }, next);
//         },
//         function(next) {
//             that.create(Tech, Tech.globalId, {
//                 fields: [{
//                     name: 'name',
//                     opts: {
//                         boost: 10
//                     }
//                 }, {
//                     name: 'text'
//                 }, ],
//                 req: {
//                     isFolder: false,
//                 },
//             }, next);
//         },
//         function(next) {
//             that.create(User, User.globalId, {
//                 fields: [{
//                     name: 'surname',
//                     opts: {
//                         boost: 10
//                     }
//                 }, {
//                     name: 'name',
//                     opts: {
//                         boost: 8
//                     }
//                 }, {
//                     name: 'midname',
//                     opts: {
//                         boost: 5
//                     }
//                 }, {
//                     name: 'info'
//                 }, ],
//                 req: {},
//             }, next);
//         },
//         function(next) {
//             console.log('search index inited')
//             next();
//         }
//     ], cb)
// }



// // смотри доки lunr
// // opts: {
// //   fields: [
// //     {name: '', opts: {}},
// //   ],
// //   req: {},
// // }
// Index.prototype.create = function(Model, indexName, opts, next) {
//     var name = indexName;
//     this[name] = lunr(function() {
//         var that = this;
//         _.each(opts.fields, function(field) {
//             that.field(field.name, field.opts);
//         })
//         that.use(lunr.ru);
//     });
//     this[name].getModel = function() {
//             return Model;
//         }
//         // заполнение индекса
//     var that = this;
//     Model
//         .find(opts.req)
//         .then(function(items) {
//             _.each(items, function(item) {
//                 that[name].add(item);
//             })
//         })
//         .nodeify(next)
// }

// me.init = function(cb) {
//     me.Index = new Index();
//     async.series([
//         me.updateIndex,
//     ], function() {
//         if (cb) cb();
//     })
// }

// me.updateIndex = function(cb) {
//     async.series([
//         me.Index.init.bind(me.Index),
//     ], function() {
//         me.addSearchMethods();
//         if (cb) cb();
//     })
// }



// me.addSearchMethods = function() {
//     // EXAMPLE: me.inPost('qwe')
//     _.each(me.Index, function(idx, name) {
//         me['in' + name] = function(str) {
//             return idx.search(str);
//         }
//     });

//     me.inEverything = function(str) {
//         var result = {};
//         _.each(me.Index, function(idx, name) {
//             var found = me['in' + name](str);
//             result[name] = found;
//         })
//         return result;
//     }
// }

// module.exports = search;
