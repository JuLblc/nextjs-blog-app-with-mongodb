import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({
  title: String,
  content: String,
  published: Boolean,
  createdAt:String
})

module.exports = mongoose.models.Post || mongoose.model('Post', PostSchema)