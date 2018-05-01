import { PostModel, PostInstance } from "../models/PostModel";

export class PostLoader {

  static batchPost(Post: PostModel, ids: number[]): Promise<PostInstance[]> {
    return Promise.resolve(
        Post.findAll({
          where: { id: { $in: ids} }
        })
    );
  }

}