export class CreateUserDto {
    readonly id?: number;
    readonly firstname?: string;
    readonly surname?: string;
    readonly password: string;
    readonly confirmPassword: string;
    readonly phone: string;  
  }
  