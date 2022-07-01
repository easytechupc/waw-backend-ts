import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
} from "@nestjs/common";
import { UserRequest } from "src/api/users/application/transform/resources/user.request";
import { UserResource } from "src/api/users/application/transform/resources/user.resource";
import { User } from "src/api/users/domain/entities/user.model";
import { UsersService } from "src/api/users/domain/services/users.service";

@Controller("api/v1/users")
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @InjectMapper() private readonly mapper: Mapper
  ) {}

  @Get()
  async getAll(): Promise<UserResource[]> {
    const users = await this.usersService.getAll();
    return this.mapper.mapArray(users, User, UserResource);
  }

  @Get(":id")
  async getById(@Param("id") id: number): Promise<UserResource> {
    const entity = await this.usersService.getById(id);
    if (entity === null) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: "The requested user was not found",
      });
    }
    return this.mapper.map(entity, User, UserResource);
  }

  @Post()
  async create(@Body() user: UserRequest): Promise<UserResource> {
    const mapped = this.mapper.map(user, UserRequest, User);
    const result = await this.usersService.create(mapped);
    return this.mapper.map(result, User, UserResource);
  }

  @Put(":id")
  update(
    @Param("id") id: number,
    @Body() user: UserRequest
  ): Promise<UserResource> {
    return this.updatePartial(id, user);
  }

  @Patch(":id")
  async updatePartial(
    @Param("id") id: number,
    @Body() user: Partial<UserRequest>
  ): Promise<UserResource> {
    const mapped = this.mapper.map(user, UserRequest, User);
    const result = await this.usersService.update(id, mapped);
    return this.mapper.map(result, User, UserResource);
  }

  @Delete(":id")
  async delete(@Param("id") id: number): Promise<void> {
    const success = await this.usersService.delete(id);
    if (!success) {
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "Something went wrong while deleting the requested user",
      });
    }
  }
}
