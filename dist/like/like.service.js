"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../user/entities/user.entity");
const like_entity_1 = require("./entities/like.entity");
const post_entity_1 = require("../post/entities/post.entity");
const Errormessage_1 = require("../Errormessage");
const bcrypt = require('bcrypt');
let LikeService = class LikeService {
    constructor(datasource, userModel, likeModel, postModel) {
        this.datasource = datasource;
        this.userModel = userModel;
        this.likeModel = likeModel;
        this.postModel = postModel;
    }
    async likePost(id, user) {
        try {
            if (!user)
                throw new common_1.NotFoundException(Errormessage_1.Errormessage.Userexist);
            const post = await this.postModel.findOne({
                where: {
                    id: (0, typeorm_2.Equal)(id)
                },
                relations: {
                    likes: true
                }
            });
            if (!post)
                throw new common_1.NotFoundException(Errormessage_1.Errormessage.Post);
            const alreadyLiked = await this.likeModel.findOne({
                where: {
                    userId: user.id,
                    post: { id: post.id }
                }
            });
            if (!alreadyLiked) {
                const likePost = await this.likeModel.create({
                    userId: user.id,
                    post,
                    dateCreated: new Date(Date.now())
                });
                const likedPost = await this.likeModel.save(likePost);
                return {
                    responseCode: 200,
                    likedPost,
                    message: "You liked the post"
                };
            }
            throw new common_1.NotFoundException(Errormessage_1.Errormessage.AlreadyLiked);
        }
        catch (err) {
            throw err;
        }
    }
    async unlikePost(id, user) {
        try {
            if (!user)
                throw new common_1.NotFoundException(Errormessage_1.Errormessage.Userexist);
            const post = await this.postModel.findOne({
                where: {
                    id: (0, typeorm_2.Equal)(id)
                },
                relations: {
                    likes: true
                }
            });
            if (!post)
                throw new common_1.NotFoundException(Errormessage_1.Errormessage.Post);
            const alreadyLiked = await this.likeModel.findOne({
                where: {
                    userId: user.id,
                    post: { id: post.id }
                }
            });
            if (!alreadyLiked)
                throw new common_1.NotFoundException(Errormessage_1.Errormessage.NotLike);
            const unlikePost = await this.likeModel.delete(alreadyLiked.id);
            return {
                responseCode: 200,
                success: true,
                message: "You unliked the post"
            };
        }
        catch (err) {
            throw err;
        }
    }
};
LikeService = __decorate([
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(like_entity_1.Like)),
    __param(3, (0, typeorm_1.InjectRepository)(post_entity_1.Post)),
    __metadata("design:paramtypes", [typeorm_2.DataSource,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], LikeService);
exports.LikeService = LikeService;
//# sourceMappingURL=like.service.js.map