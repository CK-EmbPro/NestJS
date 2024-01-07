import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { PrismaService } from "src/prisma.service";
import { UsersModule } from "src/Users/users.module";
import { UsersService } from "src/Users/users.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JWTStrategy } from "./jwt.strategy";

 
 @Module({
    controllers: [AuthController],
    providers: [AuthService, PrismaService, JWTStrategy, UsersService],
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        })
    ]
 })

 export class AuthModule{}