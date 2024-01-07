import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { Users } from './users.model';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  async getUsers( @Req() request: Request, @Res() response: Response): Promise<any> {
    try {
        const result = await this.userService.getAllUsers();
        return response.status(200).json({
            status: 'ok!',
            message: 'Successfully fetched data',
            result: result
        })
    } catch (error) {
        return response.status(500).json({
            status: 'ok!',
            message: 'Internal Server error',
            ErrDesc: error.message
        })
    }
  }

  @Post()
  async createUser(@Req() request: Request, @Res()  response: Response, @Body() data:Users){
    try {
        const result = await this.userService.createUser(data);
        return response.status(200).json({
            status: 'ok!',
            message: 'Successfully fetched data',
            result: result
        })
    } catch (error) {
        return response.status(500).json({
            status: 'ok!',
            message: 'Internal Server error',
            ErrDesc: error.message
        })
    }
  }
}
