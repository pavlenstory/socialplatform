const {UserInputError, AuthenticationError} = require('apollo-server');
const checkAuth = require('../../util/check-auth');
const Post = require('../../models/Posts');

module.exports = {
    Mutation: {
        async createComment(parent, {postId, body}, context) {
            const {username} = checkAuth(context);
            if(body.trim() === '') {
                throw new UserInputError('Comment is empty', {
                    errors: {
                        body: 'Comment body must not empty'
                    }
                })
            }
            const post = await Post.findById(postId)
            
            if(post){
                post.comments.unshift({
                    body,
                    username,
                    createdAt: new Date().toISOString()
                })
                await post.save()
                return post
            } else throw new UserInputError('Post not found', {
                errors: {
                    body: 'Post is not exist'
                }
            })
        },
        async deleteComment(parent, {postId, commentId}, context) {
            const {username} = checkAuth(context);
            const post = await Post.findById(postId);
            if(post){
                const commentIndex = post.comments.findIndex(c => c.id === commentId)

                if(post.comments[commentIndex].username === username){
                    post.comments.splice(commentIndex, 1)
                    await post.save();
                    return post;
                }else throw new AuthenticationError('Action not allowed', {
                    errors: {
                        body: 'You can not delete this post'
                    }
                })
            } else throw new UserInputError('Post not found', {
                errors: {
                    body: 'Post is not exist'
                }
            })
        }
    }
}