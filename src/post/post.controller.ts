import {
    Body,
    Controller,
    Post,
    Put,
    Headers,
    Get,
    Param,
    UploadedFile,
    UseInterceptors,
    Res,
    Delete,
    Patch,
  } from '@nestjs/common';
  import { CreatePostDto } from './dto/post.dto';
  import { PostService } from './post.service';
  

@Controller('')
export class PostController {
constructor(private service: PostService) {}

  @Post('/post')
  createPost(@Headers('token') token: string, @Body() createDto: CreatePostDto): Promise<any> {
    return this.service.createPost(token, createDto);
  }

  @Put('/update-post/:id')
  updatePost(@Headers('token') token: string,  @Body() createDto: CreatePostDto, @Param('id') id,): Promise<any> {
    return this.service.updatePost(token, createDto, id)
  }

  @Delete('/delete-post/:id')
  deletePost(@Headers('token') token: string, @Param('id') id: number): Promise<any> {
    return this.service.deletePost(token, id);
  }

  @Get('/fetch-post')
  fetchPost(@Headers('token') token: string): Promise<any> {
    return this.service.fetchPost(token)
  }

  @Get('/fetch-all-post')
  fetchAllPost(): Promise<any> {
    return this.service.fetchAllPost()
  }
}


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicGhvbmUiOiIwNzAzMzk4ODQzMiIsImlhdCI6MTY4NDMyOTkzMSwiZXhwIjoxNjg0NDE2MzMxfQ.99CgX3W-PJP-ZTXcEcKYLHfXesA7tSEWdix0LuHPrIQ