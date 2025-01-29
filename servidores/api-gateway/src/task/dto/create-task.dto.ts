import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty({ message: 'El text no puede estar vacio' })
  @IsString({ message: 'El texto debe ser una cadena de texto' })
  text: string;

  @IsOptional()
  @IsBoolean({ message: 'El completed debe ser un booleano' })
  completed: boolean;

  @IsOptional()
  @IsEnum(['low', 'medium', 'high'], {
    message: 'El priority debe ser low, medium o high',
  })
  priority: string;

  @IsOptional()
  @IsInt({ message: 'El user debe ser un numero entero' })
  user: number;
}
