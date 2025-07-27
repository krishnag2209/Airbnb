const express = require('express');
const router = express.Router();
const Listing = require('../model/Listing.js');
const { loggedIn , validateListing, isOwner} = require('../Middlewear.js');
const WrapAsync = require('../util/WrapAsync.js');
const listController = require('../Controller/list.js');



router
.route('/')
.get( WrapAsync(listController.index));

// // Add new listing (POST)
router.post('/port', loggedIn, WrapAsync(listController.NewListing));


//Cresting a new listing
router.get('/new', loggedIn, WrapAsync(listController.renderNewForm));

router
.route('/:id')
.get( WrapAsync(listController.ShowListing))
.put(loggedIn,isOwner, (listController.UpdateListing))
.delete( loggedIn,isOwner,  WrapAsync(listController.deleteListing));


// Edit route   :--
router.get('/:id/edit', loggedIn,  isOwner, WrapAsync(listController.renderEditForm));


module.exports = router;