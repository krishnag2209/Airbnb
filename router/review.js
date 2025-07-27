const express = require('express');
const router = express.Router({mergeParams: true});
const Listing  = require("../model/Listing.js");
const WrapAsync = require('../util/WrapAsync.js');
const Review = require('../model/review.js');
const { loggedIn, validatereview, isReviewAuthor } = require('../Middlewear.js');
const reviewController = require('../Controller/reviews.js');

// For review Adding on Show page :--
router.post("/", loggedIn,  validatereview, WrapAsync(reviewController.AddReview));

// For reviews deleting button 
router.delete("/:reviewId", loggedIn,isReviewAuthor, (reviewController.deleteReview));


module.exports = router;