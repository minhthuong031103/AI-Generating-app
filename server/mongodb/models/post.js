import mongoose from 'mongoose';

const Post = new mongoose.Schema({
  name: { type: String },
  prompt: { type: String },
  photo: {
    type: String,
    default:
      'http://bdbackgrounds.com/media/zoo/images/1-lightyellow-paper_7aebeb667bb535ad797b057b7234cfb9.jpg',
  },
  date: {
    type: String,
  },
  _userid: { type: String },
});
const PostSchema = mongoose.model('Post', Post);
export default PostSchema;
