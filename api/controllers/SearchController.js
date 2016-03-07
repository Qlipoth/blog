module.exports = {
    index: function(req, res) {
        Post.find()
            .populateAll()
            .sort('id DESC')
            .then(function(posts) {
                console.log('POSTS!!!!!!!!!!!!!!!!!!',posts);
                 res.view('search/index',{
                        posts: posts
                    });
            })
            .catch(res.serverError)
    },
    findByParam: function(req, res) {
        var search_string = req.param('search_string');
        if (search_string) {
            Post.find({
                    title: search_string
                })
                .populateAll()
                .sort('id DESC')
                .then(function(posts) {
                    console.log('POSTS!!!!!!!!!!!!!!!!!!',posts)
                    res.view('search/index',{
                        posts: posts
                    });
                })
                .catch(res.serverError)
        } else {
            Post.find()
                .populateAll()
                .sort('id DESC')
                .then(function(posts) {
                    console.log(posts);
                     res.view('search/index',{
                        posts: posts
                    });
                })
                .catch(res.serverError)
        }

    }

};
