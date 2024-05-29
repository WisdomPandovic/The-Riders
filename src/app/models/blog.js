const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    header: { type: String, required: true },
    content: { type: String, required: true },
    tags: [{ type: String }],
    image: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    published: { type: Boolean, default: false }
});

module.exports  = mongoose.model('Blog', blogSchema);
