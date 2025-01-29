import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { response } from 'src/helpers/Response';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // ** SERVICIO PARA REGISTRAR A UN USUARIO
  async create(createUserDto: CreateUserDto) {
    try {
      const newUser = this.userRepository.create(createUserDto);
      await this.userRepository.save(newUser);

      return response(true, newUser, 'Registro exitoso');
    } catch (error) {
      if (error.code === '23505') {
        return response(false, '', 'El correo ya se encuentra registrado');
      }

      return this.catchError(error);
    }
  }

  // ** SERVICIO PARA INICIAR SESIÓN
  async login(loginUserDto: LoginUserDto) {
    try {
      const { email, password } = loginUserDto;

      const user = await this.userRepository.findOne({
        where: {
          email,
        },
      });

      if (user?.matchPassword(password)) {
        return response(true, user, 'Login exitoso');
      }

      return response(false, '', 'Credenciales incorrectas');
    } catch (error) {
      return this.catchError(error);
    }
  }

  // ** SERVICIO PARA OBTENER EL USUARIO ACTUAL
  async getMe(id: number) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          id,
        },
      });

      if (!user) {
        return response(false, '', 'El usuario no existe');
      }

      return response(true, user, 'Usuario encontrado');
    } catch (error) {
      return this.catchError(error);
    }
  }

  private catchError(error: any) {
    return response(false, '', error.message);
  }
}
