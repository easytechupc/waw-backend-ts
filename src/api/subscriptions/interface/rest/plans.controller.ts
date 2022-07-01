import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
} from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from "@nestjs/swagger";
import { PlanRequest } from "src/api/subscriptions/application/transform/resources/plan.request";
import { PlanResource } from "src/api/subscriptions/application/transform/resources/plan.resource";
import { Plan } from "src/api/subscriptions/domain/entities/plan.model";
import { PlansService } from "src/api/subscriptions/domain/services/plans/plans.service";

@ApiTags("SubscriptionPlans")
@Controller("api/v1/plans")
export class PlansController {
  constructor(
    private readonly service: PlansService,
    @InjectMapper() private readonly mapper: Mapper
  ) {}

  @Get()
  @ApiOkResponse({
    description:
      "All the stored subscription plans were succesfully retrieved.",
  })
  async getAll(): Promise<PlanResource[]> {
    const plans = await this.service.getAll();
    return this.mapper.mapArray(plans, Plan, PlanResource);
  }

  @Get(":id")
  @ApiOkResponse({
    description: `The subscription with id was succesfully retrieved.`,
  })
  async getById(@Param("id") id: number): Promise<PlanResource> {
    const plan = await this.service.getById(id);
    if (plan === null) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: "The requested plan was not found.",
      });
    }
    return this.mapper.map(plan, Plan, PlanResource);
  }

  @Post()
  @ApiCreatedResponse({
    description: "The subscritpion plan was succesfully created.",
  })
  async create(@Body() plan: PlanRequest): Promise<PlanResource> {
    const mapped = this.mapper.map(plan, PlanRequest, Plan);
    const result = await this.service.create(mapped);
    return this.mapper.map(result, Plan, PlanResource);
  }

  @Put(":id")
  @ApiOkResponse({
    description: "The subscritpion plan was succesfully updated.",
  })
  update(
    @Param("id") id: number,
    @Body() plan: PlanRequest
  ): Promise<PlanResource> {
    return this.updatePartial(id, plan);
  }

  @Patch(":id")
  @ApiOkResponse({
    description: "The subscritpion plan was succesfully updated.",
  })
  async updatePartial(
    @Param("id") id: number,
    @Body() plan: Partial<PlanRequest>
  ): Promise<PlanResource> {
    const mapped = this.mapper.map(plan, PlanRequest, Plan);
    const result = await this.service.update(id, mapped);
    return this.mapper.map(result, Plan, PlanResource);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({
    description: "The subscription plan with id was succesfully deleted.",
  })
  async delete(@Param("id") id: number): Promise<void> {
    const success = await this.service.delete(id);
    if (!success) {
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "Something went wrong while deleting the requested plan.",
      });
    }
  }
}
