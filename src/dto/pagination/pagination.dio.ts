import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class PageInfo {
  @Field({ nullable: true, description: 'Следующий курсор для пагинации' })
  nextCursor: string;
  @Field({ description: 'Общее количество элементов' })
  total: number;
}
