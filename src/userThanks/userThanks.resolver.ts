import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';

import { GetUserThanksArgs } from './dto/args/get-user-thanks.args';
import { CreateUserThanksInput } from './dto/input/create-user-thanks';

import { UserThanks } from './userThanks.entity';
import { UserThanksService } from './userThanks.service';
import { PaginatedUserThanks } from './dto/model/paginated-user-thanks';

@Resolver(() => UserThanks)
export class UserThanksResolver {
  constructor(private readonly userThankService: UserThanksService) {}

  @Query(() => PaginatedUserThanks, {
    name: 'userThanks',
    description: 'Получить список блогодрностей',
  })
  getser(@Args() param: GetUserThanksArgs): Promise<PaginatedUserThanks> {
    return this.userThankService.getUserThanks(param);
  }

  @Mutation(() => UserThanks, { description: 'Добавить благодарность' })
  async createUserThanks(
    @Args('createUserThankData') param: CreateUserThanksInput,
  ): Promise<UserThanks> {
    return await this.userThankService.createUserThanks(param);
  }
}
