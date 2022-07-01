import { User } from "../entities/user.model";

export const UsersRepositoryKey = Symbol("UsersRepository");

export interface IUsersRepository {
  findAll(): Promise<User[]>;
  findById(id: number): Promise<User | null>;
  create(user: User): Promise<User>;
  update(id: number, user: User): Promise<User>;
  delete(id: number): Promise<boolean>;
}
