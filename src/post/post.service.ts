import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository, Equal, In } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Post } from '../post/entities/post.entity';
import { CreatePostDto } from './dto/post.dto';
import { Errormessage } from 'src/Errormessage';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'src';
const bcrypt = require('bcrypt');


export class PostService {
    constructor(
      @InjectDataSource() private readonly datasource: DataSource,
      @InjectRepository(User) private readonly userModel: Repository<User>,
      @InjectRepository(Post) private readonly postModel: Repository<Post>,
    ) {}

    async createPost(postDto: CreatePostDto, user: User): Promise<any> {
      try {
        if (!user)
          throw new NotFoundException(Errormessage.Userexist);
        const post = await this.postModel.create({
          text: postDto.text,
          user,
          dateCreated: new Date(Date.now()),
          dateUpdated: new Date(Date.now())
        })
        const newPost = await this.postModel.save(post);
        return {
          responseCode: 201,
          post: newPost,
          message: 'Post created',
        };
      } catch(err) {
        throw err
      }
    }
  
    async updatePost(postDto: CreatePostDto, id: number, user: User): Promise<any> {
      try{
  
        if (!user)
          throw new NotFoundException(Errormessage.Userexist);
  
       const post = await this.postModel.findOne({
          where: {
            id: id
          },
          relations: {
            user: true
          }
       })
       if(!post ) throw new NotFoundException(Errormessage.Post);
       if(post.user.id !== user.id) throw new NotFoundException(Errormessage.UnauthorisedOperation)
       post.text = postDto.text,
       post.dateUpdated = new Date(Date.now())
       const updatedPost = await this.postModel.save(post);
       return {
          responseCode: 200,
          post: updatedPost,
          message: 'Your post has been updated',
       }
      } catch(err) {
        throw err
      }
    }
  
    async deletePost(id: number, user: User): Promise<any> {
      try {
  
        if (!user)
          throw new NotFoundException(Errormessage.Userexist);
  
       const post = await this.postModel.findOne({
          where: {
            id: id
          },
          relations: {
            user: true
          }
       })
       if(!post ) throw new NotFoundException(Errormessage.Post);
       if(post.user.id !== user.id) throw new NotFoundException(Errormessage.UnauthorisedOperation)
        await this.postModel.delete(id);
        return {
          responseCode: 200,
          success: true,
          message: 'Post successfully deleted',
        };
      } catch (err) {
        throw err;
      }
    }
   
   
    async fetchPost(user: User): Promise<any> {
      try {
        if (!user)
          throw new NotFoundException(Errormessage.Userexist);
          const post = await this.postModel.find({
            where: {
              user: {
                id: user.id
              }
            }
          })
          return {
            post
          }
      } catch(err) {
        throw err
      }
    }

    async fetchAllPost(): Promise<any> {
      try {
       const post = await this.postModel.find({})
          return {
            post
          }
      } catch(err) {
        throw err
      }
    }
  
  }