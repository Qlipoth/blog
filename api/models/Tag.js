module.exports = {
    attributes: {
        name: {type: 'string', required: true, unique: true},

        posts: {
            collection: 'Post',
            via: 'tags',
        }
    }
}
