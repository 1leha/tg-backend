import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { CategoryService } from '../category/category.service';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './models/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskInput } from './dto/createTask.input';
import { UpdateTaskInput } from './dto/updateTask.input';

@Injectable()
export class TaskService {
  constructor(
    @Inject(forwardRef(() => CategoryService))
    private readonly categoryService: CategoryService,
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}

  async createTask(newTask: CreateTaskInput): Promise<TaskEntity> {
    return await this.taskRepository.save(newTask);
  }

  async getAllTasks(): Promise<TaskEntity[]> {
    return this.taskRepository.find();
  }

  async getTaskById(id: number): Promise<TaskEntity> {
    return await this.taskRepository.findOne({ where: { id } });
  }

  async updateTask(dto: UpdateTaskInput): Promise<TaskEntity> {
    await this.taskRepository.update({ id: dto.id }, { ...dto });

    const updatedTask = await this.getTaskById(dto.id);
    return updatedTask;
  }

  async deleteTask(id: number): Promise<number> {
    await this.taskRepository.delete(id);
    return id;
  }
}
