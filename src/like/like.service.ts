import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository, Equal, In } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Like } from 'src/like/entities/like.entity';
import { Post } from 'src/post/entities/post.entity';
import { Errormessage } from 'src/Errormessage';
import * as jwt from 'jsonwebtoken'
import { JwtPayload } from 'src';
const bcrypt = require('bcrypt');


export class LikeService {
  constructor(
    @InjectDataSource() private readonly datasource: DataSource,
    @InjectRepository(User) private readonly userModel: Repository<User>,
    @InjectRepository(Like) private readonly likeModel: Repository<Like>,
    @InjectRepository(Post) private readonly postModel: Repository<Post>
  ) {}


  async likePost(id: number, user: User): Promise<any> {
    try {
      if (!user)
        throw new NotFoundException(Errormessage.Userexist);
      const post = await this.postModel.findOne({
        where: {
          id: Equal(id)
        },
        relations: {
          likes: true
        }
      })
      if(!post ) throw new NotFoundException(Errormessage.Post);
      const alreadyLiked = await this.likeModel.findOne({
        where: {
          userId: user.id,
          post : { id: post.id }
        }
      })
     if(!alreadyLiked) {
      const likePost = await this.likeModel.create({
        userId: user.id,
        post,
        dateCreated: new Date(Date.now())
      })
      const likedPost = await this.likeModel.save(likePost)
      return {
        responseCode: 200,
        likedPost,
        message: "You liked the post"
      }
     }
     throw new NotFoundException(Errormessage.AlreadyLiked)
      
    } catch(err) {
      throw err
    }
  }

  async unlikePost(id: number, user: User): Promise<any> {
    try {
      if (!user)
        throw new NotFoundException(Errormessage.Userexist);
        const post = await this.postModel.findOne({
          where: {
            id: Equal(id)
          },
          relations: {
            likes: true
          }
        })
        if(!post ) throw new NotFoundException(Errormessage.Post);
        const alreadyLiked = await this.likeModel.findOne({
          where: {
            userId: user.id,
            post : { id: post.id }
          }
        })
        if(!alreadyLiked) throw new NotFoundException(Errormessage.NotLike)
        const unlikePost = await this.likeModel.delete(alreadyLiked.id)

        return {
          responseCode: 200,
          success: true,
          message: "You unliked the post"
        }
    } catch(err) {
      throw err
    }
  }

}