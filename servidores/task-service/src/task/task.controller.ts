import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller()
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @MessagePattern('createTask')
  create(@Payload() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @MessagePattern('getUserTasks')
  getUserTasks(@Payload() userId: number) {
    return this.taskService.getUserTasks(userId);
  }

  @MessagePattern('updateTask')
  update(
    @Payload()
    data: {
      id: number;
      updateTaskDto: UpdateTaskDto;
      userId: number;
    },
  ) {
    return this.taskService.update(data.id, data.updateTaskDto, data.userId);
  }

  @MessagePattern('removeTask')
  remove(@Payload() data: { id: number; userId: number }) {
    return this.taskService.remove(data.id, data.userId);
  }
}
