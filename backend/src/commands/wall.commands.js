const { Post, User, Comment, Like } = require('../models/databaseConnector');
const moment = require('moment');


class PostCommand {
    constructor() {}

    async createPost(post, user) {
        await Post.create({...post, userId: user.id });
        return { message: 'Post created successfully' };
    };

    async allPosts() {
        const allPosts = await Post.findAll({ include: [User], raw: true });
        for (const post of allPosts) {
            const comments = await Comment.findAll({ where: { postId: post.id } });
            // console.log(comments)
            const likes = await Like.findAll({ where: { postId: post.id } });
            // console.log(likes)
            // console.log(post.createdAt)
            // console.log(moment(post.createdAt).format('MMMM Do YYYY, h:mm:ss a'))
            // console.log(moment(post.createdAt).startOf('day').fromNow());
            // console.log(moment(post.createdAt).subtract(1, 'days').calendar());
            // console.log(moment(post.createdAt).calendar());
            // post.createdAt = moment().calendar();
            // console.log(post.createdAt)
            post.comments = comments.length;
            post.likes = likes.length;
            post.dateFormatted = moment(post.createdAt).calendar();
        }
        return { allPosts: allPosts.reverse() };
    }

    async viewPost(postID) {
        const post = await Post.findOne({ where: { id: postID } });
        if (!post) {
            return { message: 'No post with that ID found' }
        }
        return { post };
    }

    async updatePost(postID, editedPost) {
        try {
            console.log(postID)
            console.log(editedPost)
            await Post.update(editedPost, { where: { id: postID } });
            return { message: 'Post updated successfully' };
        } catch (e) {
            return { message: 'error' + e }
        }
    }

    async deletePost(postID) {
        try {
            await Post.destroy({ where: { id: postID } });
            return { message: 'Post deleted successfully' };
        } catch (e) {
            return { message: 'error' + e }
        }
    }

    async likePost(request) {
        try {
            const searchForLike = await Like.findAll({ where: { userId: request.userID, postId: request.postID } });
            if (searchForLike.length <= 0) {
                await Like.create({...request, postId: request.postID, userId: request.userID });
                return { message: 'Liked' }
            } else {
                await Like.destroy({ where: { postId: request.postID, userId: request.userID } })
                return { message: 'Post Unliked' }
            }
        } catch (e) {
            return { message: 'error' + e }
        }
    }
    async getComments(postID) {
        const comments = await Comment.findAll({ where: { postId: postID } })
            // console.log(comments)
        for (const comment of comments) {
            const userName = await User.findOne({ where: { id: comment.userId } });
            comment.dataValues.name = userName.name;
        }
        // console.log(comments)
        return { comments }
    }
    async createComment(request) {
        try {
            await Comment.create({ message: request.message, postId: request.postID, userId: request.userID })
            return { message: 'Comment created successfully' }
        } catch (e) {
            return { message: 'error' + e }
        }
    }
}

module.exports = PostCommand;