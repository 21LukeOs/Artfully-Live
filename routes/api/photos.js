const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

const User = require('../../models/User');
const Photo = require('../../models/Photo');

router.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/'
}));

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
		auth,
		[
			check('title', 'Text is required')
				.not()
        .isEmpty(),
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

    if (photo.length >= 1) {
      return res.status(400).json({ msg: 'Already posted a photo' });
    }
    
		try {
      const title = req.body.title;

      cloudinary.uploader.upload(
        req.files.file.tempFilePath,
        { folder: 'artfully/', public_id: title },
        async function(error, result) {
          
          const newPhoto = new Photo({
            title: title,
            photo: result.secure_url,
            user: req.user.id
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

module.exports = router;
