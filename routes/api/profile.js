const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const User = require('../../models/User');
const Photo = require('../../models/Photo');

// @route   GET api/profile
//@desc    Get current users profile
//@access  Private
router.get('/', auth, async (req, res) => {

  const profile = {};

	try {
		const vote = await User.findById(req.user.id, 'vote');

    const photos = await Photo.find({ user: req.user.id });

    profile.vote = vote;
    profile.photos = photos;
    // console.log(profile);
		res.json(profile);
	} catch (err) {
		console.log(err.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
