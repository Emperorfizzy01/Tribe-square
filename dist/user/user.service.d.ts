import { DataSource, Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Like } from '../like/entities/like.entity';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { CreateLoginDto } from 'src/user/dto/login.dto';
export declare class UserService {
    private readonly datasource;
    private readonly userModel;
    private readonly likeModel;
    constructor(datasource: DataSource, userModel: Repository<User>, likeModel: Repository<Like>);
    createAccount(userDto: CreateUserDto): Promise<any>;
    login(loginDto: CreateLoginDto): Promise<any>;
    getUser(id: number): Promise<any>;
}
