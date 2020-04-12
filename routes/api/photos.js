const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

const User = require('../../models/User');
const Photo = require('../../models/Photo');

router.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: '/tmp/'
	})
);

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET,
	upload_preset: process.env.UPLOAD_PRESET
});

//@route   POST api/photos
//@desc    Create a post
//@access  Private
router.post(
	'/up',
	[
		auth,
		[
			check('title', 'Title is required')
				.not()
				.isEmpty()
			// check('file', 'File is required')
			// 	.not()
			// 	.isEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

    const photo = await Photo.find({ user: req.user.id });
    
    const name = await User.findById(req.user.id, 'name');

    const titleExists = await Photo.find({ title: req.body.title })

    if (titleExists.length >= 1) {
      return res.status(400).json({ errors: [{ msg: 'Choose a different title' }] });
    }

		if (photo.length >= 1) {
      return res.status(400).json({ errors: [{ msg: 'Already posted a photo' }] });
    }

		try {
			const title = req.body.title;

			cloudinary.uploader.upload(
				req.files.file.tempFilePath,
				{ folder: 'artfully/', public_id: title, width: 1000 },
				async function(error, result) {
					const newPhoto = new Photo({
						title: title,
						photo: result.secure_url,
            user: req.user.id,
            uploader: name.name
					});

					const photo = await newPhoto.save();

					res.json(photo);
				}
			);
		} catch (err) {
			console.log(err.message);
			res.status(500).send('Server Error');
		}
	}
);

//@route   GET api/photos
//@desc    Get all photos
//@access  Private
router.get('/', auth, async (req, res) => {
	try {
		const photos = await Photo.find().sort({ date: -1 });
		res.json(photos);
	} catch (err) {
		console.log(err.message);
		res.status(500).send('Server Error');
	}
});

//@route   PUT api/photos/vote/:id
//@desc    Vote on photo
//@access  Private
router.put('/vote/:id', auth, async (req, res) => {
	try {
    const photo = await Photo.findById(req.params.id);
    
    const vote = await User.findById(req.user.id, 'vote');

    // Check if the user has already voted
		if (vote.vote.link) {
		  return res.status(400).json({ msg: 'Already voted' });
    }
    
    // Check if the photo is user's
    if (photo.user.toString() === req.user.id) {
      return res.status(400).json({ msg: 'Cannot vote for yourself' });
    }
    
		await User.findOneAndUpdate(
			{ _id: req.user.id },
			{ vote: { link: photo.photo, title: photo.title, uploader: photo.uploader } },
			{ new: true }
		);

		photo.votes.unshift({ user: req.user.id });

		await photo.save();

		res.json(photo.votes);
	} catch (err) {
		console.log(err.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
