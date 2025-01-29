import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { SharedModule } from './shared.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    // ** CONFIGURAR VARIABLES DE ENTORNO
    ConfigModule.forRoot({ cache: true, isGlobal: true }),

    // ** REGISTRAR MICROSERVICIOS
    SharedModule,

    UserModule,

    TaskModule,
  ],
})
export class AppModule {}
