var User = {
    // Enforce model schema in the case of schemaless databases
    schema: true,

    attributes: {
        username: {
            type: 'string',
            unique: true
        },
        email: {
            type: 'email',
            unique: true
        },
        passports: {
            collection: 'Passport',
            via: 'user'
        },
        role: {
            model: 'Role',
        },
        image: {
            type: 'string',
            required: false,
            unique: false
        },
        admin: {
            type: 'boolean',
            defaultsTo: false
        },
        posts: {
            collection: 'Post',
            via: 'author'
        },
        comments: {
            collection: 'Coment',
            via: 'author'
        },
        toJSON: function() {
            var element = this.toObject();
            delete element.password;
            return element;
        }
    }
};

module.exports = User;
