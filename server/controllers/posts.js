import PostMessage from '../Models/postMessage.js';
import mongoose from 'mongoose';

//Handlers for our routes
export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({message: error });
  }
  res.send("This works!");
}

export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new PostMessage(post);

  try {
    await newPost.save();
    return res.status(201).json(newPost);
  } catch (error) {
    return res.status(409).json({message: error.message });
  } 
  res.send('Post creation');
}

export const updatePost =  async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');
  try {
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, { new: true })

    res.json(updatedPost);
  } catch (error) {
    res.status(404).json({message: error.message });
  }
}

export const deletePost = async (req, res) => {
  const { id } = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

  try{
    await PostMessage.findByIdAndRemove(id);
    //console.log("delete!")
    res.json({message: 'Post deleted successfully'});

  } catch ( error) {
    res.status(404).json({message: error.message });
  }
}

export const likePost = async (req, res) => {
  const { id } = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');
  try {
    const post = await PostMessage.findById(id);
    const updatedPost = await PostMessage.findByIdAndUpdate(id, {likeCount: post.likeCount + 1}, { new: true })
  
    res.json(updatedPost);
  } catch (error) {
    res.status(404).json({message: error.message });
  }
}