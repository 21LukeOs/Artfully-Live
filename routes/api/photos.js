const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const formidable = require('formidable');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

const User = require('../../models/User');
const Photo = require('../../models/Photo');

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
	'/',
	[
		auth
		// [
		// 	check('text', 'Text is required')
		// 		.not()
		// 		.isEmpty()
		// ]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const form = formidable();

			form.parse(req, (err, fields, files) => {
				if (err) {
					next(err);
					return;
        }
        
        const title = fields.title;

				cloudinary.uploader.upload(
					files.file.path,
					{ folder: 'artfully/', public_id: title },
					async function(error, result) {
            console.log(result, error);
            const newPhoto = new Photo({
              title: title,
              photo: result.secure_url,
              user: req.user.id
            });

            const photo = await newPhoto.save();

            res.json(photo);
					}
				);

				res.json({ fields, files });
			});
		} catch (err) {
			console.log(err.message);
			res.status(500).send('Server Error');
		}
	}
);

module.exports = router;
