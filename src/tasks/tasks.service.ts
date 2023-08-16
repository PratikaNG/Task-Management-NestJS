import { Injectable } from '@nestjs/common';
import { Task } from './task.model';

@Injectable()
export class TasksService {
    private tasks:Task[] = []

    GetAllTasks():Task[]{
        return this.tasks
    }
}
