import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { response } from 'src/helpers/Response';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly userRepository: Repository<Task>,
  ) {}

  // ** SERVICIO PARA CREAR UNA NUEVA TAREA **
  async create(createTaskDto: CreateTaskDto) {
    try {
      const newTask = this.userRepository.create(createTaskDto);
      await this.userRepository.save(newTask);
      return response(true, newTask, 'Tarea creada con exito');
    } catch (error) {
      return this.catchError(error);
    }
  }

  // ** SERVICIO PARA OBTENER LAS TAREAS DE UN USUARIO **
  async getUserTasks(userId: number) {
    try {
      const tasksUser = await this.userRepository.find({
        where: {
          user: { id: userId },
        },
        order: {
          createdAt: 'DESC',
        },
      });

      return response(true, tasksUser, 'Tareas obtenidas con exito');
    } catch (error) {
      return this.catchError(error);
    }
  }

  // ** SERVICIO PARA OBTENER UNA TAREA POR ID **
  async update(id: number, updateTaskDto: UpdateTaskDto, userId: number) {
    try {
      const task = await this.userRepository.findOne({
        where: {
          id,
          user: { id: userId },
        },
      });

      if (!task) {
        return response(false, '', 'Tarea no encontrada');
      }

      await this.userRepository.update(id, updateTaskDto);

      return response(
        true,
        { ...task, ...updateTaskDto },
        'Tarea actualizada con exito',
      );
    } catch (error) {
      return this.catchError(error);
    }
  }

  // ** SERVICIO PARA ELIMINAR UNA TAREA **
  async remove(id: number, userId: number) {
    try {
      const task = await this.userRepository.findOne({
        where: {
          id,
          user: { id: userId },
        },
      });

      if (!task) {
        return response(false, '', 'Tarea no encontrada');
      }

      await this.userRepository.delete(id);

      return response(true, '', 'Tarea eliminada con exito');
    } catch (error) {
      return this.catchError(error);
    }
  }

  private catchError(error: any) {
    return response(false, '', error.message);
  }
}
