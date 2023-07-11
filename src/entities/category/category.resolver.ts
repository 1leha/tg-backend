import {
  Args,
  Mutation,
  Resolver,
  Query,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { CategoryEntity } from './models/category.entity';
import { CreateCategoryInput } from './dto/createCategory.input';
import { UserEntity } from '../user/models/user.entity';
import { UpdateCategoryInput } from './dto/updateCategory.input';

@Resolver(() => CategoryEntity)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation(() => CategoryEntity)
  async createCategory(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
  ): Promise<CategoryEntity> {
    return await this.categoryService.createCategory(createCategoryInput);
  }

  @Mutation(() => CategoryEntity)
  async updateCategory(
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput,
  ): Promise<CategoryEntity> {
    return await this.categoryService.updateCategory(updateCategoryInput);
  }

  @Mutation(() => Number)
  async deleteCategory(@Args('id') id: number): Promise<number> {
    return await this.categoryService.deleteCategory(id);
  }

  @Query(() => [CategoryEntity])
  async getAllCategories(): Promise<CategoryEntity[]> {
    return await this.categoryService.getAllCategories();
  }

  @ResolveField(() => UserEntity)
  user(@Parent() category: CategoryEntity): Promise<UserEntity> {
    return this.categoryService.getUser(category.userId);
  }
}
