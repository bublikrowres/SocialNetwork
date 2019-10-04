const { Post } = require('../models/databaseConnector');

class WallCommand {
    constructor() {}

    async createPost(post) {
        await Post.create(post);
        return { author: post.author, title: post.title, description: post.description, likes: post.likes, comments: post.comments, email: post.email };
    };

    async allPosts() {
        const allPosts = await Post.findAll({ options: Object });
        if (allPosts.length < 1) {
            return { Message: 'No posts in DB' }
        }
        return { numberOfPosts: allPosts.length, allPosts };
    }

    async viewPost(postID) {
        const post = await Post.findOne({ where: { id: postID } });
        if (!post) {
            return { Message: 'No post with that ID found' }
        }
        return { post };
    }

    async updatePost(postID, editedPost) {
        await Post.update(editedPost, { where: { id: postID } });
        return { message: 'Post updated successfully' };
    }

    async deletePost(postID) {
        await Post.destroy({ where: { id: postID } });
        return { message: 'Post deleted successfully' };
    }
}

module.exports = WallCommand;