const Listing = require('../model/Listing');


// Title route :-
module.exports.index = async(req,res) =>{
    const AllListing =  await Listing.find({});
    res.render('listings/index.ejs', { AllListing });
}

//Cresting a new listing
module.exports.renderNewForm = (async (req, res) => {
    res.render('./listings/CreateListing.ejs');
});

// Show route :-
module.exports.ShowListing = async (req, res) => {
     let id = req.params.id.trim();
    const listing = await Listing.findById(id)
    .populate({path :"reviews", 
        populate: {path: "author"},
    })
    .populate("owner");
    if (!listing) {     
        req.flash('error', 'Listing not found');
        
    }
     res.render('listings/show.ejs',{ listing });
};

// Add new listing (POST)
module.exports.NewListing = async (req, res) => {
    if (!req.body.listing) {
        throw new ExpressError(400, "Invalid Listing Data");
    }
    
    let newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id; // Set the owner to the current user
    await newListing.save();
    req.flash('success', 'New Listing Created Successfully!');
    res.redirect('/listings');
}

// Edit route   :--
module.exports.renderEditForm = async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
     if (!listing) {     
        req.flash('error', 'Listing not found');
        return res.redirect('/listings');
    }
    res.render('listings/edit.ejs', { listing });
}

//  Updated route :--
module.exports.UpdateListing = async(req, res) => {
    let {id} = req.params;
     await Listing.findByIdAndUpdate(id, {...req.body.listing} );
     req.flash('success',' EDIT Successfully!');
     res.redirect(`/listings/${id}`);
};

// DELETE route :-
module.exports.deleteListing = async (req,res) =>{
    let {id} = req.params;-

     await Listing.findByIdAndDelete(id);
      req.flash('success',' Listing DELETED Successfully!');
    res.redirect('/listings');
}

