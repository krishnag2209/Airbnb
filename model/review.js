const mongoose = require('mongoose');
const SChema = mongoose.Schema;
const ReviewSchema = new SChema({
    comment: String,
    rating: {
         type: Number,
        min: 1,
        max: 5
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    author: {
        type: SChema.Types.ObjectId,
        ref: 'User',
    },
});

const Review = mongoose.model('Review', ReviewSchema);
module.exports = Review;