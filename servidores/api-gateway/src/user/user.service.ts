import { LoginUserDto } from './dto/login-user.dto';
import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ClientProxy } from '@nestjs/microservices';
import { response } from 'src/helpers/Response';
import { Response } from 'express';
import { lastValueFrom } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private readonly jwtService: JwtService,

    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
  ) {}

  async create(createUserDto: CreateUserDto, res: Response) {
    try {
      const { ok, data, message } = await lastValueFrom(
        this.userClient.send('createUser', createUserDto),
      );

      if (!ok) {
        return response(res, 400, ok, data, message);
      }

      const token = this.jwtService.sign({ user: data.id, password: null });

      return response(
        res,
        201,
        ok,
        { ...data, password: null, token },
        message,
      );
    } catch (error) {
      return this.catchError(res, error);
    }
  }

  async login(loginUserDto: LoginUserDto, res: Response) {
    try {
      const { ok, data, message } = await lastValueFrom(
        this.userClient.send('loginUser', loginUserDto),
      );

      if (!ok) {
        return response(res, 400, ok, data, message);
      }

      const token = this.jwtService.sign({ user: data.id, password: null });

      return response(
        res,
        200,
        ok,
        { ...data, password: null, token },
        message,
      );
    } catch (error) {
      return this.catchError(res, error);
    }
  }

  async getMe(req: any, res: Response) {
    try {
      const { user } = req.user;
      const { ok, data, message } = await lastValueFrom(
        this.userClient.send('getMe', user),
      );

      if (!ok) {
        return response(res, 400, ok, data, message);
      }

      const token = this.jwtService.sign({ user: data.id, password: null });

      return response(
        res,
        200,
        ok,
        { ...data, password: null, token },
        message,
      );
    } catch (error) {
      return this.catchError(res, error);
    }
  }

  private catchError(res: Response, error: any) {
    return response(res, 500, false, '', error.message);
  }
}
