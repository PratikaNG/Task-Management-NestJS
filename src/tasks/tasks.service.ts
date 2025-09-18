import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import {v4 as uuid} from 'uuid'
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
    private tasks:Task[] = []

    GetAllTasks():Task[]{
        return this.tasks
    }

    // without dto
    // createTask(title:string,description:string){
    //     const task:Task = {
    //         id:uuid(),
    //         title,
    //         description,
    //         status:TaskStatus.OPEN
    //     }
    // }

    CreateTask(createTaskDto:CreateTaskDto){
        const {title,description} = createTaskDto
        const task:Task = {
            id:uuid(),
            title,
            description,
            status:TaskStatus.OPEN
        }

        this.tasks.push(task)
        return task
    }

    GetTaskById(id:string):Task{
        return this.tasks.find((task) => task.id === id)
    }

    DeleteTask(id:string):void{
        this.tasks = this.tasks.filter((task) => task.id !== id)
    }
    UpdateTaskStatus(id:string,status:TaskStatus):Task{
        const task = this.GetTaskById(id)
        task.status = status
        return task
    }

    GetTasksWithFilter(filterDto:GetTasksFilterDto):Task[]{
        const {status,search} = filterDto;
        // define a temp array to hold the result
        let tasks = this.GetAllTasks()

        // do something with status 
        if(status){
            tasks = tasks.filter((task)=>task.status === status)
        }  
        // do something with search
        if(search){
            tasks = tasks.filter((task)=>{
                if(task.title.includes(search) || task.description.includes(search)){
                    return true
                }else return false
            })
        }
        // return final result
        return tasks
    }
}
