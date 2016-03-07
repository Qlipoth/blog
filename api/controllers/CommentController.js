module.exports = {
    create: function(req, res) {
        var params = {
            content: req.param('content'),
            author: req.param('com_author'),
            post:req.param('post_id'),
            comment : req.param('comment')
        };
        console.log(params)
        var accum = {};
        Coment.create(params)
            // .then(function(comment) {
            //     console.log('new comment', comment)
            //     return Coment.findOne({
            //         id: comment.id
            //     })
            // })
            // .then(function(comment) {
            //     accum.comment = comment;
            //     return Post.findOne({
            //         id: post_id
            //     });
            // })
            // .then(function(post) {

            //    console.log('CREATED',post)
            //     console.log('this post!!!!!!', post)
            //     accum.comment.post=post.id;

            //     return accum.comment.save();
            // })
            // .then(function(created){
            //   return User.findOne({
            //         id: created.author
            //     })
            // })
            // .then(function(user) {
            //     console.log('this user!!!!!!', user)
            //     accum.comment.author=user.id;
            //     return accum.comment.save();
            // })
            .then(function(created) {
                console.log(created)
                 res.redirect('/post/watch/' + req.param('post_id'))
            })
            .catch(res.serverError)
    },
    remove_com: function(req, res) {
        var comments = req.param('comments');
        Coment.destroy({id:comments})
        .then(function(err) {

            res.redirect('/');
        })
        .catch(res.serverError);
    }
}
