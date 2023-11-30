import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
    ){}
        async getAllTasks() : Promise<Task[]>{
            const query = this.taskRepository.createQueryBuilder('task');
            return await query.getMany();
        }
        async getTaskById(id : number) : Promise<Task>{
            const found = await this.taskRepository.findOne({where: {
                id : id
            }});

            if(!found) {
                throw new NotFoundException(`Task with id = ${id} not found.`);
            }

            return found;
        }

        async createTask(createTaskDto : CreateTaskDto) : Promise<Task> {
            const task = new Task();

            const {title, description} = createTaskDto;
            
            task.title = title;
            task.description = description;
            task.status = TaskStatus.OPEN;
            return task.save();
        }

        async deleteTaskById(id: number) : Promise<void>{
           const result = await this.taskRepository.delete(id);

           if(result.affected === 0) {
            throw new NotFoundException(`Task with id = ${id}, not found`);
           }
        }

        async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
            const task = await this.getTaskById(id);
            task.status = status;
            await task.save();
            return task;
        }
}
