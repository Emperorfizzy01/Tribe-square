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
  import { CreateUserDto } from './dto/user.dto';
  import { CreateLoginDto } from 'src/user/dto/login.dto';
  import { UserService } from 'src/user/user.service';

@Controller({
  version: '1'
})
export class UserController {
constructor(private service: UserService) {}

  @Post('/signup')
  signUp(@Body() createDto: CreateUserDto): Promise<any> {
    return this.service.createAccount(createDto);
  }

  @Post('/login')
  login(@Body() loginDto: CreateLoginDto): Promise<any> {
    return this.service.login(loginDto);
  }

  @Get('/user/:id')
  getUser(@Param('id') id: number): Promise<any> {
    return this.service.getUser(id)
  }

}