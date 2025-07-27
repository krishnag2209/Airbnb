const Joi = require('joi');
const { count } = require('./model/Listing');

module.exports.ListingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        price: Joi.number().required().min(0),
        description: Joi.string().required(),
        location: Joi.string().required(),
        // review: Joi.string().allow("", null),
        country: Joi.string().required(),
        image: Joi.string().uri()
    }).required()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required()
    }).required(),
});