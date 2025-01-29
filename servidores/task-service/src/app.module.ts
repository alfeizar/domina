import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from './task/task.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    // ** CONFIGURAR VARIABLES DE ENTORNO
    ConfigModule.forRoot({ cache: true, isGlobal: true }),

    // ** CONECTAR A POSTGRESQL
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +(process.env.DB_PORT ?? '5432'),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true, //** solo en modo desarrollo */
      ssl: true,
    }),

    TaskModule,
  ],
})
export class AppModule {}
