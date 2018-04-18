import { GraphQLResolveInfo } from "graphql";
import { DbConnection } from "../../../interfaces/DbConnectionInterface";
import { PostInstance } from "../../../models/PostModel";
import { Transaction } from "sequelize";

export const postResolvers = {

  Post: {

    author: (post, {id}, {db}: {db: DbConnection}, info: GraphQLResolveInfo) => {
      return db.User
        .findById(post.get('author'));
    },

    comments: (post, {first = 10, offset = 0}, {db}: {db: DbConnection}, info: GraphQLResolveInfo) => {
      return db.Comment
        .findAll({
          where: {post: post.get('id')},
          limit: first,
          offset: offset
        });
    }

  },

  Query: {

    posts: (parent, {first = 10, offset = 0}, {db}: {db: DbConnection}, info: GraphQLResolveInfo) => {
      return db.Post
        .findAll({
          limit: first,
          offset: offset
        });
    },

    post: (parent, {id}, {db}: {db: DbConnection}, info: GraphQLResolveInfo) => {
      return db.Post
        .findById(id)
        .then((post: PostInstance) => {
          if (!post) throw new Error(`Post with ${id} not found!`);

          return post;
        });
    }

  },

  Mutations: {

    createPost: (parent, {input}, {db}: {db: DbConnection}, info: GraphQLResolveInfo) => {
      return db.sequelize.transaction((t: Transaction) => {
        return db.Post.create(input, {transaction: t});
      });
    },

    updatePost: (parent, {id, input}, {db}: {db: DbConnection}, info: GraphQLResolveInfo) => {
      id = parseInt(id);
      return db.sequelize.transaction((t: Transaction) => {
        return db.Post
          .findById(id)
          .then((post: PostInstance) => {
            if (!post) throw new Error(`Post with ${id} not found!`);

            return post.update(input, {transaction: t});
          })
      });
    },

    deletePost: (parent, {id}, {db}: {db: DbConnection}, info: GraphQLResolveInfo) => {
      id = parseInt(id);
      return db.sequelize.transaction((t: Transaction) => {
        return db.Post
          .findById(id)
          .then((post: PostInstance) => {
            if (!post) throw new Error(`Post with ${id} not found!`);

            return post.destroy({transaction: t})
              .then(post => !!post);
          })
      });
    }

  }

}