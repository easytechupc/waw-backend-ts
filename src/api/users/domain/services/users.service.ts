import { Inject, Injectable } from "@nestjs/common";
import { User } from "../entities/user.model";
import {
  IUsersRepository,
  UsersRepositoryKey,
} from "../repositories/users.repository";

@Injectable()
export class UsersService {
  constructor(
    @Inject(UsersRepositoryKey)
    private readonly usersRepository: IUsersRepository
  ) {}

  getAll() {
    return this.usersRepository.findAll();
  }

  getById(id: number) {
    return this.usersRepository.findById(id);
  }

  create(user: User) {
    return this.usersRepository.create(user);
  }

  update(id: number, user: User) {
    return this.usersRepository.update(id, user);
  }

  delete(id: number) {
    return this.usersRepository.delete(id);
  }
}
