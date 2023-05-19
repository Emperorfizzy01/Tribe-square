import {
    Body,
    Controller,
    Post,
    Get,
    Param,
    Headers,
    Request,
    UseGuards
  } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
  import { LikeService } from 'src/like/like.service';

@Controller({
  version: '1'
})
export class LikeController {
constructor(private service: LikeService) {}

  @UseGuards(AuthGuard)
  @Post('/like/:id')
  likePost(@Param('id') id: number, @Request() req): Promise<any> {
    return this.service.likePost(id, req.user);
  }

  @UseGuards(AuthGuard)
  @Post('/unlike/:id')
  unlikePost(@Param('id') id: number, @Request() req): Promise<any> {
    return this.service.unlikePost(id, req.user);
  }

}