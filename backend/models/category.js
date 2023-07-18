const mongoose = require('mongoose');

// Schema for category
const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    color: {
        type: String
    },
    icon: {
        type: String
    }
})

exports.Category = mongoose.model('Category', categorySchema);
