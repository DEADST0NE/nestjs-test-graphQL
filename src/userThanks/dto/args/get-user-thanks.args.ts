import { ArgsType, Field } from '@nestjs/graphql';

import { PaginationArgs } from '../../../dto/pagination/pagination.args';

@ArgsType()
export class GetUserThanksArgs extends PaginationArgs {
  @Field({ description: 'Id пользователя', nullable: true })
  id: string;

  @Field({ description: 'Количество записей', nullable: true })
  perPage: number;
}
