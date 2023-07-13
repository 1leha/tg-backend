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

@Resolver(() => TaskEntity)
export class TaskResolver {
  constructor(
    private readonly taskService: TaskService,
    private readonly categoryService: CategoryService,
  ) {}

  @Mutation(() => TaskEntity)
  async createTask(
    @Args('createTaskInput') createTaskInput: CreateTaskInput,
  ): Promise<TaskEntity> {
    return await this.taskService.createTask(createTaskInput);
  }

  @Mutation(() => TaskEntity)
  async updateTask(
    @Args('updateTaskInput') updateTaskInput: UpdateTaskInput,
  ): Promise<TaskEntity> {
    return await this.taskService.updateTask(updateTaskInput);
  }

  @Query(() => [TaskEntity])
  async getAllTasks(): Promise<TaskEntity[]> {
    return await this.taskService.getAllTasks();
  }

  @ResolveField(() => CategoryEntity)
  category(@Parent() category: CategoryEntity): Promise<CategoryEntity> {
    return this.categoryService.getCategoryById(category.id);
  }
}
