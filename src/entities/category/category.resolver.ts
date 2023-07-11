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

@Resolver(() => CategoryEntity)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation(() => CategoryEntity)
  async createCategory(
    @Args('newCategory') newCategory: CreateCategoryInput,
  ): Promise<CategoryEntity> {
    return await this.categoryService.createCategory(newCategory);
  }

  @Query(() => [CategoryEntity])
  async getAllCategories(): Promise<CategoryEntity[]> {
    // console.log('RESOLVER getAllUsers');

    return await this.categoryService.getAllCategories();
  }

  @ResolveField(() => UserEntity)
  user(@Parent() category: CategoryEntity): Promise<UserEntity> {
    console.log('category  :>> ', category);
    return this.categoryService.getUser(category.userId);
  }
}
