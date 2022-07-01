import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
} from "@nestjs/common";
import { UserRequest } from "src/users/application/transform/resources/user.request";
import { UserResource } from "src/users/application/transform/resources/user.resource";
import { User } from "src/users/domain/entities/user.model";
import { UsersService } from "src/users/domain/services/users.service";
import { BaseResponse } from "src/api/shared/communication/BaseResponse";

@Controller("api/v1/users")
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @InjectMapper() private readonly mapper: Mapper
  ) {}

  @Get()
  async getAll(): Promise<BaseResponse<UserResource[]>> {
    const users = await this.usersService.getAll();
    const resources = this.mapper.mapArray(users, User, UserResource);
    return {
      statusCode: HttpStatus.OK,
      resource: resources,
    };
  }

  @Get(":id")
  async getById(
    @Param("id") id: number
  ): Promise<BaseResponse<UserResource | null>> {
    const entity = await this.usersService.getById(id);
    if (entity === null) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: `User with id ${id} not found`,
        resource: null,
      };
    }
    const resource = this.mapper.map(entity, User, UserResource);
    return {
      statusCode: HttpStatus.OK,
      resource,
    };
  }

  @Post()
  async create(@Body() user: UserRequest): Promise<BaseResponse<UserResource>> {
    const mapped = this.mapper.map(user, UserRequest, User);
    const result = await this.usersService.create(mapped);
    const resource = this.mapper.map(result, User, UserResource);
    return {
      statusCode: HttpStatus.CREATED,
      resource,
    };
  }

  @Put(":id")
  update(
    @Param("id") id: number,
    @Body() user: UserRequest
  ): Promise<BaseResponse<UserResource>> {
    return this.updatePartial(id, user);
  }

  @Patch(":id")
  async updatePartial(
    @Param("id") id: number,
    @Body() user: Partial<UserRequest>
  ): Promise<BaseResponse<UserResource>> {
    const mapped = this.mapper.map(user, UserRequest, User);
    const result = await this.usersService.update(id, mapped);
    const resource = this.mapper.map(result, User, UserResource);
    return {
      statusCode: HttpStatus.OK,
      resource,
    };
  }

  @Delete(":id")
  async delete(@Param("id") id: number): Promise<BaseResponse<boolean>> {
    const success = await this.usersService.delete(id);
    if (success) {
      return {
        statusCode: HttpStatus.OK,
        message: `User with id ${id} successfully deleted`,
        resource: true,
      };
    }
    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: `Something went wrong while deleting user with id ${id}`,
      resource: false,
    };
  }
}
