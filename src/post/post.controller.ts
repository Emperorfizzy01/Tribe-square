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
    UseGuards,
    Request,
  } from '@nestjs/common';
  import { CreatePostDto } from './dto/post.dto';
  import { PostService } from './post.service';
  import { AuthGuard } from 'src/guards/auth.guard';
  

@Controller({
  version: '1'
})
export class PostController {
constructor(private service: PostService) {}
 

@UseGuards(AuthGuard)
  @Post('/post')
  createPost(@Body() createDto: CreatePostDto, @Request() req): Promise<any> {
    return this.service.createPost(createDto, req.user);
  }

  @UseGuards(AuthGuard)
  @Put('/update-post/:id')
  updatePost(@Body() createDto: CreatePostDto, @Param('id') id, @Request() req): Promise<any> {
    return this.service.updatePost(createDto, id, req.user)
  }

  @UseGuards(AuthGuard)
  @Delete('/delete-post/:id')
  deletePost(@Param('id') id: number, @Request() req): Promise<any> {
    return this.service.deletePost(id, req.user);
  }

  @UseGuards(AuthGuard)
  @Get('/fetch-post')
  fetchPost(@Request() req): Promise<any> {
    return this.service.fetchPost(req.user)
  }

  @Get('/fetch-all-post')
  fetchAllPost(): Promise<any> {
    return this.service.fetchAllPost()
  }
}


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicGhvbmUiOiIwNzAzMzk4ODQzMiIsImlhdCI6MTY4NDMyOTkzMSwiZXhwIjoxNjg0NDE2MzMxfQ.99CgX3W-PJP-ZTXcEcKYLHfXesA7tSEWdix0LuHPrIQ