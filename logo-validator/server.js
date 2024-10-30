const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const app = express();
const upload = multer({ dest: 'uploads/' });

// Configure Cloudinary
cloudinary.config({
    cloud_name: 'ddnzmt5mz',
    api_key: '972477263476751',
    api_secret: '7fvqXVnkMPisV2zG5uX5Zic3p28'
});

// Endpoint to upload image
app.post('/upload', upload.single('logo'), async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path, {
            resource_type: 'image',
            format: 'png' // Ensure the image is in PNG format for transparency
        });

        // Check if the image has transparency
        if (result.transformation && result.transformation.includes('e_transparency')) {
            res.send("The image has a transparent background.");
        } else {
            res.send("The image does not have a transparent background.");
        }
    } catch (error) {
        res.status(500).send("Error uploading image: " + error.message);
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});