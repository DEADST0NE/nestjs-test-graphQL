import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType({ description: 'Параметры добавления пользователя' })
export class CreateUserInput {
  @Field()
  @IsNotEmpty()
  fio: string;
}
