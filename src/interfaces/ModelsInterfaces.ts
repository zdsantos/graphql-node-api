import { UserModel } from "../models/UserModel";
import { PostModel } from "../models/PostModel";
import { CommentModel } from "../models/CommentModel";

export interface ModelsInterfaces {
  
  User: UserModel;
  Post: PostModel; 
  Comment: CommentModel;

}