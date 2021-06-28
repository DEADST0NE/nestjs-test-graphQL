import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { GetUserArgs } from './dto/args/get-user.args';
import { CreateUserInput } from './dto/input/create-user.input';

import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User, { name: 'user', description: 'Получить пользователя' })
  getUser(@Args() param: GetUserArgs): Promise<User> {
    return this.userService.getUser(param);
  }

  @Mutation(() => User, { description: 'Добавления пользователя' })
  async createUser(
    @Args('createUserData') param: CreateUserInput,
  ): Promise<User> {
    return await this.userService.createUser(param);
  }
}
