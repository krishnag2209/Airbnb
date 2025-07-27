const Listing = require('../model/Listing');
const Review = require('../model/review');


// For review Adding on Show page :--
module.exports.AddReview = async (req, res) => {
    let list =  await Listing.findById(req.params.id);
    
    let Addreview = new Review(req.body.review);
    Addreview.author = req.user._id; // Assuming req.user is the logged-in user
    list.reviews.push(Addreview);
+
    await Addreview.save(); 
    await list.save();
      req.flash('success',' Added review Successfully!');
     res.redirect(`/listings/${list._id}`);
}

// For reviews deleting button 
module.exports.deleteReview = async (req, res) =>{
    let {id, reviewId} = req.params;
    console.log({id, reviewId});
 await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId} });
   await Review.findByIdAndDelete(reviewId);
     req.flash('success',' DELETED review Successfully!');
    res.redirect(`/listings/${id}`);

}