import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/domain/entities/user.model";
import { IUsersRepository } from "src/users/domain/repositories/users.repository";
import { Repository } from "typeorm";
import { UserEntity } from "../entities/user.entity";

export class UsersRepository implements IUsersRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    @InjectMapper()
    private readonly mapper: Mapper
  ) {}

  async findAll(): Promise<User[]> {
    const entities = await this.usersRepository.find();
    return this.mapper.mapArray(entities, UserEntity, User);
  }
  async findById(id: number): Promise<User | null> {
    const entity = await this.usersRepository.findOne({ where: { id } });
    if (entity === null) return null;
    return this.mapper.map(entity, UserEntity, User);
  }

  async create(user: User): Promise<User> {
    const mapped = this.mapper.map(user, User, UserEntity);
    const entity = this.usersRepository.create(mapped);
    await this.usersRepository.save(entity);
    return this.mapper.map(entity, UserEntity, User);
  }

  async update(id: number, user: User): Promise<User> {
    const mapped = this.mapper.map(user, User, UserEntity);
    await this.usersRepository.update({ id }, mapped);
    const entity = await this.usersRepository.findOne({ where: { id } });
    if (entity === null)
      throw new Error(`Something went wrong while updating user with id ${id}`);
    return this.mapper.map(entity, UserEntity, User);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.usersRepository.delete({ id });
    const affected = Number(result.affected);
    return Number.isFinite(affected) && affected > 0;
  }
}
