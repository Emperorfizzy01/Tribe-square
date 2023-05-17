import { CreateUserDto } from './dto/user.dto';
import { CreateLoginDto } from 'src/user/dto/login.dto';
import { UserService } from 'src/user/user.service';
export declare class UserController {
    private service;
    constructor(service: UserService);
    signUp(createDto: CreateUserDto): Promise<any>;
    login(loginDto: CreateLoginDto): Promise<any>;
    getUser(id: number): Promise<any>;
}
