import { Controller, Get,Post,Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { title } from 'process';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}
  @Get()
  getAllTasks():Task[]{
    return this.tasksService.GetAllTasks()
  }
 @Post()
  createTask(@Body()
    createTaskDto:CreateTaskDto

  ):Task{
    return this.tasksService.createTask(createTaskDto)
  }
}
