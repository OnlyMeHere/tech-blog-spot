const User = require('./User')
const Comments = require('./Comments')
const Blogs = require('./Blogs')


// User has many blogs

User.hasMany(Blogs, {
    foreignKey: 'blog_id',
    onDelete: 'CASCADE'
});

// blogs have one user

Blogs.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// Comments belong to one User and one blog

Comments.belongsTo(User, {
    foreignKey: 'user_id',
    foreignKey: 'blog_id'
});



module.exports = {
    User, Comments, Blogs
};