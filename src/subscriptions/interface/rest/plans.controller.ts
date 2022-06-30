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
import { PlanRequest } from "src/subscriptions/application/transform/resources/plan.request";
import { PlanResource } from "src/subscriptions/application/transform/resources/plan.resource";
import { Plan } from "src/subscriptions/domain/entities/plan.model";
import { PlansService } from "src/subscriptions/domain/services/plans/plans.service";

@Controller("api/v1/plans")
export class PlansController {
  constructor(
    private readonly service: PlansService,
    @InjectMapper() private readonly mapper: Mapper
  ) {}
  @Get()
  async getAll() {
    const plans = await this.service.getAll();
    const resources = this.mapper.mapArray(plans, Plan, PlanResource);
    return {
      statusCode: HttpStatus.OK,
      message: "All stored subscription plans where retrieved successfully.",
      resource: resources,
    };
  }

  @Get(":id")
  async getById(@Param("id") id: number) {
    const plan = await this.service.getById(id);
    if (plan === null) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: `Subscription plan with id ${id} not found`,
        resource: null,
      };
    }
    const resource = this.mapper.map(plan, Plan, PlanResource);
    return {
      statusCode: HttpStatus.OK,
      message: `Subscription plan with id ${id} was retrieved successfully.`,
      resource: resource,
    };
  }

  @Post()
  async create(@Body() plan: PlanRequest) {
    const mapped = this.mapper.map(plan, PlanRequest, Plan);
    const result = await this.service.create(mapped);
    const resource = this.mapper.map(result, Plan, PlanResource);
    return {
      statusCode: HttpStatus.CREATED,
      message: `A new subscription plan was created successfully.`,
      resource: resource,
    };
  }

  @Put(":id")
  update(@Param("id") id: number, @Body() plan: PlanRequest) {
    return this.updatePartial(id, plan);
  }

  @Patch(":id")
  async updatePartial(
    @Param("id") id: number,
    @Body() plan: Partial<PlanRequest>
  ) {
    const mapped = this.mapper.map(plan, PlanRequest, Plan);
    const result = await this.service.update(id, mapped);
    const resource = this.mapper.map(result, Plan, PlanResource);
    return {
      statusCode: HttpStatus.OK,
      message: `Subscription plan with id ${id} was updated successfully.`,
      resource: resource,
    };
  }

  @Delete(":id")
  async delete(@Param("id") id: number) {
    const success = await this.service.delete(id);
    if (success) {
      return {
        statusCode: HttpStatus.NO_CONTENT,
        message: `Subscription plan with id ${id} was deleted successfully.`,
        resource: [],
      };
    }

    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: `Something went wrong while deleting subscription plan with id ${id}`,
      resource: false,
    };
  }
}
