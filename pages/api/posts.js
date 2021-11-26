// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { connectToDatabase } = require('../../lib/mongodb');

import Post from '../../models/Post.model'

export default async function handler(req, res) {
  const { method } = req

  await connectToDatabase()

  switch (method) {
    case 'GET':
      try {
        const posts = await Post.find({})
        res.status(200).json({ success: true, message: posts })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'POST':
      try {

        const { title, content, published, createdAt } = req.body

        const post = new Post({
          title: title,
          content: content,
          published: published,
          createdAt: createdAt,
        });

        await post.save();

        res.status(201).json({ success: true, message: 'Post added successfully!' })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'PUT':
      try {
        await Post.findByIdAndUpdate(req.body.postId, { published: true })
        res.status(201).json({
          message: 'Post updated successfully',
          success: true,
        });
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'DELETE':
      try {
        await Post.deleteOne({
          _id: req.body,
        });
        res.status(200).json({
          message: 'Post deleted successfully',
          success: true,
        });

      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    default:
      res.status(400).json({ success: false })
      break
  }
}