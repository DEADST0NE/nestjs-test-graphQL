import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, MaxLength, Matches } from 'class-validator';

@InputType({ description: 'Параметры добавления блогодарности' })
export class CreateUserThanksInput {
  @Field({
    description: 'Id пользователя кто добавляет благодарность',
    nullable: true,
  })
  @Matches(new RegExp('^[a-z]{6}[0-9]{10}'))
  from?: string;

  @Field({ description: 'Id пользователя на кого добавляют благодарность' })
  @Matches(new RegExp('^[a-z]{6}[0-9]{10}'))
  @IsNotEmpty()
  to: string;

  @Field({ description: 'Комментарий к благодарности' })
  @IsNotEmpty()
  @MaxLength(255)
  reason: string;
}
