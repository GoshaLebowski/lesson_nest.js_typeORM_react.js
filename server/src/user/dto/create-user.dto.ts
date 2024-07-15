import {IsEmail, IsNotEmpty, IsString, MinLength} from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    @MinLength(3, { message: 'Password must be at least 3 characters' })
    password: string
}
