import { CreatePostDto } from './dto/post.dto';
import { PostService } from './post.service';
export declare class PostController {
    private service;
    constructor(service: PostService);
    createPost(createDto: CreatePostDto, req: any): Promise<any>;
    updatePost(createDto: CreatePostDto, id: any, req: any): Promise<any>;
    deletePost(id: number, req: any): Promise<any>;
    fetchPost(req: any): Promise<any>;
    fetchAllPost(): Promise<any>;
}
