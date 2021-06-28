import { Entity, Column, PrimaryColumn } from 'typeorm';

import { Field, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType({ description: 'Пользователь' })
export class User {
  @PrimaryColumn('varchar', {
    length: 16,
    comment: 'Первичный ключ пользователя',
  })
  @Field({ description: 'Id пользователя' })
  id: string;

  @Column({ length: 255 })
  @Field({ description: 'Фамилия Имя Отчество' })
  fio: string;

  @Column({ comment: 'Дата добавления' })
  @Field({ description: 'Дата добавления' })
  date_add: Date;
}
