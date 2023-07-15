import {
  Args,
  Mutation,
  Resolver,
  Query,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { TaskEntity } from './models/task.entity';
import { TaskService } from './task.service';
import { CreateTaskInput } from './dto/createTask.input';
import { CategoryService } from '../category/category.service';
import { CategoryEntity } from '../category/models/category.entity';
import { UpdateTaskInput } from './dto/updateTask.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-guard';

@Resolver(() => TaskEntity)
export class TaskResolver {
  constructor(
    private readonly taskService: TaskService,
    private readonly categoryService: CategoryService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => TaskEntity)
  async createTask(
    @Args('createTaskInput') createTaskInput: CreateTaskInput,
  ): Promise<TaskEntity> {
    return await this.taskService.createTask(createTaskInput);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => TaskEntity)
  async updateTask(
    @Args('updateTaskInput') updateTaskInput: UpdateTaskInput,
  ): Promise<TaskEntity> {
    return await this.taskService.updateTask(updateTaskInput);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Number)
  async deleteTask(@Args('id') id: number): Promise<number> {
    return await this.taskService.deleteTask(id);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [TaskEntity])
  async getAllTasks(): Promise<TaskEntity[]> {
    return await this.taskService.getAllTasks();
  }

  @UseGuards(JwtAuthGuard)
  @ResolveField(() => CategoryEntity)
  category(@Parent() task: TaskEntity): Promise<CategoryEntity> {
    return this.categoryService.getCategoryById(task.categoryId);
  }
}
