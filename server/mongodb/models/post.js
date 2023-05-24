import mongoose from 'mongoose';

const Post = new mongoose.Schema({
  name: { type: String, requied: true },
  prompt: { type: String, required: true },
  photo: {
    type: String,
    default:
      'http://bdbackgrounds.com/media/zoo/images/1-lightyellow-paper_7aebeb667bb535ad797b057b7234cfb9.jpg',
  },
  date: {
    type: String,
  },
});
const PostSchema = mongoose.model('Post', Post);
export default PostSchema;
