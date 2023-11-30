import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { NotFoundError } from 'rxjs';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {}

    @Get()
    getTasks() : Promise<Task[]> {
        return this.taskService.getAllTasks();
    }
    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id : number) : Promise<Task> {
        return  this.taskService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto : CreateTaskDto) : Promise<Task>{
        return  this.taskService.createTask(createTaskDto);
    }
    @Delete('/:id')
    deleteTaskById(@Param('id', ParseIntPipe) id : number) : Promise<void> {

        return this.taskService.deleteTaskById(id);
    }
    
    @Patch('/:id/status')
    updateStatus(
        @Param('id',ParseIntPipe) id: number,
        @Body('status') status: TaskStatus) : Promise<Task> {
            return this.taskService.updateTaskStatus(id,status);
    }
}
