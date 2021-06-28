import { UserThanks } from '../../userThanks.entity';
import { ObjectType, Field } from '@nestjs/graphql';
import { PageInfo } from '../../../dto/pagination/pagination.dio';

@ObjectType()
export class PaginatedUserThanks extends PageInfo {
  @Field(() => [UserThanks], { nullable: true })
  items: UserThanks[];
}
