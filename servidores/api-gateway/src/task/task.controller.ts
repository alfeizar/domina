import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  Req,
  Put,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Response } from 'express';
import { Auth } from 'src/user/decorators/auth.docorator';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @Auth()
  create(
    @Body() createTaskDto: CreateTaskDto,
    @Req() req: any,
    @Res() res: Response,
  ) {
    return this.taskService.create(createTaskDto, req, res);
  }

  @Get()
  @Auth()
  getUserTasks(@Req() req: any, @Res() res: Response) {
    return this.taskService.getUserTasks(req, res);
  }

  @Put(':id')
  @Auth()
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Req() req: any,
    @Res() res: Response,
  ) {
    return this.taskService.update(+id, updateTaskDto, req, res);
  }

  @Delete(':id')
  @Auth()
  remove(@Param('id') id: string, @Req() req: any, @Res() res: Response) {
    return this.taskService.remove(+id, req, res);
  }
}
