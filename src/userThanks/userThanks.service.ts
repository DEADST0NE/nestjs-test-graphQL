import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GraphQLError } from 'graphql';

import { GetUserThanksArgs } from './dto/args/get-user-thanks.args';
import { CreateUserThanksInput } from './dto/input/create-user-thanks';

import { UserThanks } from './userThanks.entity';
import { User } from '../user/user.entity';

import { encodeBase64 } from '../../utils/encodeBase64';
import { decodeBase64 } from '../../utils/decodeBase64';

import { PaginatedUserThanks } from './dto/model/paginated-user-thanks';

@Injectable()
export class UserThanksService {
  constructor(
    @InjectRepository(UserThanks)
    private userThankRepository: Repository<UserThanks>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public async getUserThanks(
    param: GetUserThanksArgs,
  ): Promise<PaginatedUserThanks> {
    const requestData = new PaginatedUserThanks();

    // Cоздает курсор
    const createCursor = (id: string, skip: number, take: number): string =>
      encodeBase64(`${id}/${skip}/${take}`);

    // Получить список благодарностей пользователя
    const getUserThank = async (userId: string, skip: number, take: number) =>
      await this.userThankRepository.find({
        where: {
          user_id: userId,
        },
        order: {
          date_add: 'DESC',
        },
        skip: skip,
        take: take,
      });
    // Получить общее количество благодарностей пользователя
    const getAllColums = async (userId: string) =>
      await this.userThankRepository.count({
        where: {
          user_id: userId,
        },
      });

    // Запрос без курсора
    if (param.id && param.perPage && !param.cursor) {
      const userThanksArray = await getUserThank(param.id, 0, param.perPage);
      const count = await getAllColums(param.id);
      const nextCursor = createCursor(param.id, param.perPage, param.perPage);
      // Осталось собрать все и отправить первое вхождение
      requestData.nextCursor = nextCursor;
      requestData.total = count;
      requestData.items = userThanksArray;
    }

    // Зарос с курсором
    if (param.cursor) {
      const cursorParams: string[] = decodeBase64(param.cursor).split('/');
      const id = cursorParams[0];
      const skip = Number(cursorParams[1]);
      const take = Number(cursorParams[2]);
      const userThanksArray = await getUserThank(id, skip, take);
      let nextCursor = createCursor(id, skip + take, take);
      const count = await getAllColums(id);
      if (skip + take >= count) {
        nextCursor = null;
      }
      requestData.nextCursor = nextCursor;
      requestData.total = count;
      requestData.items = userThanksArray;
    }

    return requestData;
  }

  // Создть благодарность
  public async createUserThanks(
    param: CreateUserThanksInput,
  ): Promise<UserThanks> {
    const userThank = new UserThanks();
    // Кто добавил блогодарность
    let userFrom = new User();
    if (!!param.from) {
      const candidate = await this.userRepository.findOne(param.from);
      if (!!candidate) {
        userFrom = candidate;
      }
    }

    // Кому добавили блогодарность
    const userTo = await this.userRepository.findOne(param.to);

    // Создание ID блогодарности
    const lastThanks = await this.userThankRepository.findOne({
      order: { date_add: 'DESC' },
      where: { user_id: { id: param.to } },
    });

    if (!!!lastThanks) {
      userThank.id = `${param.to}#000001`;
    } else {
      const arrayId = lastThanks.id.split('#');
      arrayId[1] = String(Number(arrayId[1]) + 1).padStart(6, '0');

      // Если количество благ пользователя превысило 999999 ошибка
      if (Number(arrayId[1]) > 999999) {
        throw new GraphQLError('Create ID thanks exceeded character size');
      }
      userThank.id = arrayId.join('#');
    }

    // Сохраняем благодарность
    userThank.user_add_id = userFrom;
    userThank.user_id = userTo;
    userThank.comment = param.reason;
    userThank.date_add = new Date();

    return this.userThankRepository.save(userThank);
  }
}
