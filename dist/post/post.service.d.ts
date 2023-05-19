import { DataSource, Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Post } from '../post/entities/post.entity';
import { CreatePostDto } from './dto/post.dto';
export declare class PostService {
    private readonly datasource;
    private readonly userModel;
    private readonly postModel;
    constructor(datasource: DataSource, userModel: Repository<User>, postModel: Repository<Post>);
    createPost(postDto: CreatePostDto, user: User): Promise<any>;
    updatePost(postDto: CreatePostDto, id: number, user: User): Promise<any>;
    deletePost(id: number, user: User): Promise<any>;
    fetchPost(user: User): Promise<any>;
    fetchAllPost(): Promise<any>;
}
