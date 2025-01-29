import { Controller, Get, Post, Body, Res, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Response } from 'express';
import { Auth } from './decorators/auth.docorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/auth/register')
  create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    return this.userService.create(createUserDto, res);
  }

  @Post('/auth/login')
  login(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
    return this.userService.login(loginUserDto, res);
  }

  @Get('/auth/me')
  @Auth()
  getMe(@Req() req: any, @Res() res: Response) {
    return this.userService.getMe(req, res);
  }
}
