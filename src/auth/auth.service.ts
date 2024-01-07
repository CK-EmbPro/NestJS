import { Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma.service";
import { UsersService } from "src/Users/users.service";
import { LoginDto } from "./dto/login.dto";
import * as bcrypt from 'bcrypt'
import { RegisterUserDto } from "./dto/register-usr.dto";
import { Users } from "src/Users/users.model";

@Injectable()

export class AuthService{
    constructor(private jwtService: JwtService, private prismaService:PrismaService, private userService: UsersService){}

    async login(loginDto: LoginDto):Promise<any>{
        const {username, password} = loginDto

        const users = await this.prismaService.user.findUnique({
            where:{
                username: username,
            }
        })

        if(!users)
            throw new NotFoundException('user not found')

        const validatePassword = await bcrypt.compare(password, users.password)

        if(!validatePassword)
            throw new NotFoundException('Invalid password')

        return {
            token: this.jwtService.sign({username})
        }
    }

    async register(registerDto: RegisterUserDto): Promise<any>{
        const createUsers = new Users()
        createUsers.name = registerDto.name
        createUsers.password = await bcrypt.hash(registerDto.password, 10)
        createUsers.email = registerDto.email
        createUsers.username= registerDto.username

        const user = await this.userService.createUser(createUsers)

        return {
            token: this.jwtService.sign({username: user.username})
        }
    }
}