const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const uris = 'mongodb://localhost:27017/edx-course-db';
mongoose.connect(uris);

const Post = mongoose.model('Post', {
    name: String,
    url: String,
    text: String,
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

const Comment = mongoose.model('Comment', {
    text: String,
});

let ca = [{ text: 'Cruel…..var { house, mouse} = No type optimization at all' },
{ text: 'I think you’re undervaluing the benefit of ‘let’ and ‘const’.' },
{ text: '(p1,p2)=>{ … } ,i understand this ,thank you !' }
].map(comment => {
    const c = new Comment(comment);
    c.save((err) => {
        if (err)
            return console.error(err);
    });
    return c._id;
});
let post = new Post({
    name: 'Top 10 ES6 Features every Web Developer must know',
    url: 'https://webapplog.com/es6',
    text: 'This essay will give you a quick introduction to ES6. If you don’t know what is ES6, it’s a new JavaScript implementation.',
    comments: ca
});
post.save((err) => {
    if (err)
        return console.error(err);
        console.log('The post is saved: ', post.toJSON());
});
// Populate

Post.
    findOne({ name: /Top 10 ES6/i })
    .populate('comments')
    .exec(function (err, post) {
        if (err) return console.error(err)
        console.log(`The post is ${post}`)
        mongoose.disconnect();
    });