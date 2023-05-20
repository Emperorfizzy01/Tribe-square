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
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../user/entities/user.entity");
const post_entity_1 = require("../post/entities/post.entity");
const Errormessage_1 = require("../Errormessage");
const bcrypt = require('bcrypt');
let PostService = class PostService {
    constructor(datasource, userModel, postModel) {
        this.datasource = datasource;
        this.userModel = userModel;
        this.postModel = postModel;
    }
    async createPost(postDto, user) {
        try {
            if (!user)
                throw new common_1.NotFoundException(Errormessage_1.Errormessage.Userexist);
            const post = await this.postModel.create({
                text: postDto.text,
                user,
                dateCreated: new Date(Date.now()),
                dateUpdated: new Date(Date.now())
            });
            const newPost = await this.postModel.save(post);
            return {
                responseCode: 201,
                post: newPost,
                message: 'Post created',
            };
        }
        catch (err) {
            throw err;
        }
    }
    async updatePost(postDto, id, user) {
        try {
            if (!user)
                throw new common_1.NotFoundException(Errormessage_1.Errormessage.Userexist);
            const post = await this.postModel.findOne({
                where: {
                    id: id
                },
                relations: {
                    user: true
                }
            });
            console.log(post);
            if (!post)
                throw new common_1.NotFoundException(Errormessage_1.Errormessage.Post);
            if (post.user.id !== user.id)
                throw new common_1.NotFoundException(Errormessage_1.Errormessage.UnauthorisedOperation);
            post.text = postDto.text,
                post.dateUpdated = new Date(Date.now());
            const updatedPost = await this.postModel.save(post);
            return {
                responseCode: 200,
                post: updatedPost,
                message: 'Your post has been updated',
            };
        }
        catch (err) {
            throw err;
        }
    }
    async deletePost(id, user) {
        try {
            if (!user)
                throw new common_1.NotFoundException(Errormessage_1.Errormessage.Userexist);
            const post = await this.postModel.findOne({
                where: {
                    id: id
                },
                relations: {
                    user: true
                }
            });
            if (!post)
                throw new common_1.NotFoundException(Errormessage_1.Errormessage.Post);
            if (post.user.id !== user.id)
                throw new common_1.NotFoundException(Errormessage_1.Errormessage.UnauthorisedOperation);
            await this.postModel.delete(id);
            return {
                responseCode: 200,
                success: true,
                message: 'Post successfully deleted',
            };
        }
        catch (err) {
            throw err;
        }
    }
    async fetchPost(user) {
        try {
            if (!user)
                throw new common_1.NotFoundException(Errormessage_1.Errormessage.Userexist);
            const post = await this.postModel.find({
                where: {
                    user: {
                        id: user.id
                    }
                }
            });
            return {
                post
            };
        }
        catch (err) {
            throw err;
        }
    }
    async fetchAllPost() {
        try {
            const post = await this.postModel.find({});
            return {
                post
            };
        }
        catch (err) {
            throw err;
        }
    }
};
PostService = __decorate([
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(post_entity_1.Post)),
    __metadata("design:paramtypes", [typeorm_2.DataSource,
        typeorm_2.Repository,
        typeorm_2.Repository])
], PostService);
exports.PostService = PostService;
//# sourceMappingURL=post.service.js.map