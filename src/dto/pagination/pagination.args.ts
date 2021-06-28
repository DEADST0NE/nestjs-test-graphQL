import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class PaginationArgs {
  @Field({ description: 'Курсор для пагинации', nullable: true })
  cursor: string;
}
