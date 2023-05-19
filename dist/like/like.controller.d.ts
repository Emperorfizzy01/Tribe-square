import { LikeService } from 'src/like/like.service';
export declare class LikeController {
    private service;
    constructor(service: LikeService);
    likePost(id: number, req: any): Promise<any>;
    unlikePost(id: number, req: any): Promise<any>;
}
