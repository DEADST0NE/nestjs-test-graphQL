import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { Connection } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './user/user.module';
import { UserThanksModule } from './userThanks/userThanks.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      playground: {
        settings: {
          'request.credentials': 'include',
        },
      },
    }),
    UserModule,
    UserThanksModule,
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
