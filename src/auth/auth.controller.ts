import { Body, Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { User } from '@prisma/client';
import { Request, Response } from 'express';
import { STATUS_CODES } from 'http';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register-usr.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Req() request: Request,
    @Res() response: Response,
    @Body() loginDto: LoginDto,
  ): Promise<any> {
    try {
      const result = await this.authService.login(loginDto);
      return response.status(200).json({
        status: 'ok!',
        message: 'Successfully logged in',
        result:result
      });
      
    } catch (error) {
      return response.status(500).json({
        status: 'ok!',
        message: error.message,
        
      });
    }
  }



  @Post('register')
  async register(
    @Req() request: Request,
    @Res() response: Response,
    @Body() registerDto: RegisterUserDto,
  ): Promise<any> {
    try {
      const result = await this.authService.register(registerDto);
      return response.status(200).json({
        status: 'ok!',
        message: 'Successfully registered',
        result:result
      });
      
    } catch (error) {
      return response.status(500).json({
        status: 'ok!',
        message: error.message
       
      });
    }
  }

  
}
