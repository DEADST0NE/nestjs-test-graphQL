import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GetUserArgs } from './dto/args/get-user.args';
import { CreateUserInput } from './dto/input/create-user.input';

import { User } from './user.entity';
import createUserId from '../../utils/createUserId';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public createUser(param: CreateUserInput): Promise<User> {
    const user = new User();
    user.id = createUserId();
    user.fio = param.fio;
    user.date_add = new Date();

    return this.userRepository.save(user);
  }

  public getUser(param: GetUserArgs): Promise<User> {
    return this.userRepository.findOne(param.id);
  }
}
