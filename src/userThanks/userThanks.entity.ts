import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

import { User } from '../user/user.entity';

@Entity()
@ObjectType({ description: 'Благодарности пользователя' })
export class UserThanks {
  @PrimaryColumn('varchar', {
    length: 23,
    comment: 'Первичный ключ пользователя',
  })
  @Field()
  id: string;

  @Column({ length: 255 })
  @Field()
  comment?: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  @Field(() => User)
  user_id: User;

  @Column({ comment: 'Дата добавления' })
  @Field()
  date_add: Date;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_add_id' })
  @Field(() => User)
  user_add_id?: User;
}
