import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator"

export class RegisterUserDto{

    @IsString()
    @Length(5,10)
    name: string


    @IsString()
    @Length(6,12)
    @IsNotEmpty()
    password: string


    @IsString()
    @Length(5,10)
    username: string


    @IsString()
    @IsEmail()
    email: string
}