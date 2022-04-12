const Post = require('../../models/Posts')
const checkAuth = require('../../util/check-auth')
const {AuthenticationError} = require('apollo-server');

module.exports = {
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find().sort({createdAt: -1});
                return posts;
            }catch (err) {
                throw new Error(err);
            }
        },
        async getPost(parent, {postId}) {
            try{
                const post = await Post.findById(postId)
                if(post){
                    return post
                } else {
                    throw new Error('Post not found')
                }
            }catch (err) {
                throw new Error(err)
            }
        }
    },
    Mutation: {
        async createPost(parent, {body}, context){
            const user = checkAuth(context);
            console.log(user)
            const newPost = new Post({
                body,
                user: user.id,
                username: user.username,
                createdAt: new Date().toISOString()
            })

            const post = await newPost.save();
            return post
        },
        async deletePost(parent, {postId}, context) {
            const user = checkAuth(context);

            try{
                const post = await Post.findById(postId);
                if(user.username === post.username){
                    await post.delete();
                    return 'Post was deleted'
                } else {
                    throw new AuthenticationError('This is not your post')
                }
            }catch(err){
                throw new Error(err)
            }
        }
    }
}
