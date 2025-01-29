import { Inject, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { response } from 'src/helpers/Response';
import { Response } from 'express';

@Injectable()
export class TaskService {
  constructor(
    @Inject('TASK_SERVICE') private readonly taskClient: ClientProxy,
  ) {}

  async create(createTaskDto: CreateTaskDto, req: any, res: Response) {
    try {
      const { user } = req.user;
      createTaskDto.user = user;
      const { ok, data, message } = await lastValueFrom(
        this.taskClient.send('createTask', createTaskDto),
      );

      if (!ok) {
        return response(res, 400, ok, data, message);
      }

      return response(res, 201, ok, data, message);
    } catch (error) {
      return this.catchError(res, error);
    }
  }

  async getUserTasks(req: any, res: Response) {
    try {
      const { user } = req.user;
      const { ok, data, message } = await lastValueFrom(
        this.taskClient.send('getUserTasks', user),
      );

      if (!ok) {
        return response(res, 400, ok, data, message);
      }

      return response(res, 200, ok, data, message);
    } catch (error) {
      return this.catchError(res, error);
    }
  }

  async update(
    id: number,
    updateTaskDto: UpdateTaskDto,
    req: any,
    res: Response,
  ) {
    try {
      const { user } = req.user;
      const dataSend = { id, updateTaskDto, user };
      const { ok, data, message } = await lastValueFrom(
        this.taskClient.send('updateTask', dataSend),
      );

      if (!ok) {
        return response(res, 400, ok, data, message);
      }

      return response(res, 200, ok, data, message);
    } catch (error) {
      return this.catchError(res, error);
    }
  }

  async remove(id: number, req: any, res: Response) {
    try {
      const { user } = req.user;
      const dataSend = { id, user };
      const { ok, data, message } = await lastValueFrom(
        this.taskClient.send('removeTask', dataSend),
      );

      if (!ok) {
        return response(res, 400, ok, data, message);
      }

      return response(res, 200, ok, data, message);
    } catch (error) {
      return this.catchError(res, error);
    }
  }

  private catchError(res: Response, error: any) {
    return response(res, 500, false, '', error.message);
  }
}
