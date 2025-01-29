import { Transform } from 'class-transformer';
import { IsString, IsEmail, IsNotEmpty, Length } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'El correo debe ser válido' })
  @Transform(({ value }: { value: string }) => value.toLowerCase().trim())
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(4, 20, {
    message: 'La contraseña debe tener entre 4 y 20 caracteres',
  })
  password: string;
}
