// import { Injectable } from "@nestjs/common";
// import { Task } from "./task.entity";
// import { DataSource, Repository } from "typeorm";
// import { InjectRepository } from "@nestjs/typeorm";

import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Task } from './task.entity';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async getTasks(filterDto:GetTasksFilterDto):Promise<Task[]>{
    const {status,search} = filterDto
    const query = this.createQueryBuilder('task');
    // it will create a query object for task entity

    if(status){
      query.andWhere('task.status = :status',{status})
      // query.andWhere('task.status = :hello',{hello})  -> syntax
    }
    if(search){
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
        {search: `%${search}%`}
      )
    }
    const tasks = await query.getMany();
    return tasks;
  }
}