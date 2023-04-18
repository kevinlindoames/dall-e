import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';


import Post from '../mongodb/models/post.js';


dotenv.config();

const router = express.Router();

cloudinary.config({
    cloud_name: "dwtycyp6q",
    api_key: "645639224392687",
    api_secret: "WyoLqIa4lQHByDInVbc2OG1YL-0",
});

//GET ALL POSTS
router.route('/').get(async (req, res) => {
    try {
        const post = await Post.find({});
        res.status(200).json({ success: true, data: post });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Fetching posts failed, please try again' });
    }
});



//CREATE POST
router.route('/').post(async (req, res) => {
    try {
        const { name, prompt, photo } = req.body;
        const photoUrl = await cloudinary.uploader.upload(photo);

        const newPost = await Post.create({
            name,
            prompt,
            photo: photoUrl.url,
        });

        res.status(200).json({ success: true, data: newPost });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Unable to create a post, please try again' });
    }
});

export default router;