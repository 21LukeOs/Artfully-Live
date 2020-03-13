const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const cloudinary = require('cloudinary');
require('dotenv').config();

const User = require('../../models/User');
const Photo = require('../../models/Photo');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

//@route   POST api/photos
//@desc    Create a post
//@access  Private
router.post(
	'/',
	[
		auth,
		[
			check('name', 'Text is required')
				.not()
				.isEmpty(),
			check('artist', 'Text is required')
				.not()
				.isEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {

			// const newPhoto = new Photo({
			// 	title: req.body.title,
			// 	name: req.body.name,
			// 	photo: imgUrl,
			// 	user: req.user.id
			// });

			// const photo = await newPhoto.save();

			// res.json(photo);
		} catch (err) {
			console.log(err.message);
			res.status(500).send('Server Error');
		}
	}
);

module.exports = router;
