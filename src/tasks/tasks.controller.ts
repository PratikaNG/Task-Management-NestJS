import { Controller, Get,Post,Body, Param, Delete, Patch, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import {  TaskStatus } from './task-status.enum';
import { title } from 'process';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

    @Get('/:id')
  getTaskByID(@Param('id') id:string):Promise<Task>{
    return this.tasksService.getTaskByID(id);
  }
  
  @Post()
  createTask(@Body() createTaskDto:CreateTaskDto):Promise<Task>{
    return this.tasksService.createTask(createTaskDto)
  }

  @Delete('/:id')
  deleteTask(@Param('id') id:string):Promise<void>{
    return this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id:string,
    @Body() updateTaskStatusDto:UpdateTaskStatusDto)  
    :Promise<Task>{
      const {status} = updateTaskStatusDto;
    return this.tasksService.updateTaskStatus(id,status);
  }

  @Get()
  getTasks(
    @Query() filterDto:GetTasksFilterDto
  ):Promise<Task[]>{
    // if filters are defined,call taskService.getTasksWithFilters 
    // else just call getAllTasks
     return this.tasksService.getTasks(filterDto)
  }

  // @Get()
  // getAllTasks():Task[]{
  //   return this.tasksService.GetAllTasks()
  // }
//   @Get()
//   getTasks(
//     @Query() filterDto:GetTasksFilterDto
//   ):Task[]{
//     // if filters are defined,call taskService.getTasksWithFilters 
//     // else just call getAllTasks
//     if(Object.keys(filterDto).length){
//       return this.tasksService.GetTasksWithFilter(filterDto)
//     }
//     else return this.tasksService.GetAllTasks()
//   }
//   // without dto
// //  @Post()
// //   createTask(
// //     @Body('title' )title:string,
// //     @Body('description')description:string ):Task{
// //     return this.tasksService.createTask(title,description)
// //   }
// // }
//  @Post()
//   createTask(@Body() createTaskDto:CreateTaskDto):Task{
//     return this.tasksService.CreateTask(createTaskDto)
//   }

//   @Get('/:id')
//   getTaskByID(@Param('id') id:string):Task{
//     return this.tasksService.GetTaskById(id);
//   }

//   @Delete('/:id')
//   deleteTask(@Param('id') id:string):void{
//     return this.tasksService.DeleteTask(id);
//   }

//   @Patch('/:id/status')
//   updateTaskStatus(
//     @Param('id') id:string,
//     @Body() updateTaskStatusDto:UpdateTaskStatusDto)  
//     :Task{
//       const {status} = updateTaskStatusDto;
//     return this.tasksService.UpdateTaskStatus(id,status);
//   }

//   // without dto
//   // @Patch('/:id/status')
//   // updateTaskStatus(
//   //   @Param('id') id:string,
//   //   @Body('status') status:TaskStatus)  
//   //   :Task{
//   //   return this.tasksService.UpdateTaskStatus(id,status);
//   // }
}
