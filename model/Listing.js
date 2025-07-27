const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

let schemaContent = new Schema({
    
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }, 
    image: {
        filename: {
            type: String
        },
        url: {
            type: String,
            default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHibXaLywqHFIvW00qbjF_lVUDwCgZ0j6OrA&s"
        }
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
});

// Fix typo: 'findOneAndDelate' ➜ 'findOneAndDelete'
schemaContent.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
});

const Listing = mongoose.model('Listing', schemaContent);
module.exports = Listing;
