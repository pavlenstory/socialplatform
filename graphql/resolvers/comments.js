const {UserInputError} = require('apollo-server');

const Post = require('../../models/Posts');

module.exports = {
    Mutation: {
        async createComment(parent, {postId, body}, context) {
            const user = checkAuth(context);
            if(body.trim() === '') {
                throw new UserInputError('Comment is empty', {
                    errors: {
                        body: 'Comment body must not empty'
                    }
                })
            }
            const post = Post.findById(postId)
            
        },
        async deleteComment(parent, {postId, commentId}, context) {
            
        }
    }
}