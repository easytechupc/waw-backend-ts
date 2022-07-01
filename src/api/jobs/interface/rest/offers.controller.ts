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
import { ApiTags } from "@nestjs/swagger";

import { OfferRequest } from "src/api/jobs/application/transform/resources/offer.request";
import { OfferResource } from "src/api/jobs/application/transform/resources/offer.resource";
import { Offer } from "src/api/jobs/domain/entities/offer.model";
import { OffersService } from "src/api/jobs/domain/services/offers.service";

@ApiTags("Offers")
@Controller("api/v1/offers")
export class OffersController {
  constructor(
    private readonly service: OffersService,
    @InjectMapper() private readonly mapper: Mapper
  ) {}

  @Get()
  async getAll(): Promise<OfferResource[]> {
    const offers = await this.service.getAll();
    return this.mapper.mapArray(offers, Offer, OfferResource);
  }

  @Get(":id")
  async getById(@Param("id") id: number): Promise<OfferResource> {
    const entity = await this.service.getById(id);
    if (entity === null) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: "The requested offer was not found.",
      });
    }
    return this.mapper.map(entity, Offer, OfferResource);
  }

  @Post()
  async create(@Body() offer: OfferRequest): Promise<OfferResource> {
    const mapped = this.mapper.map(offer, OfferRequest, Offer);
    const result = await this.service.create(mapped);
    return this.mapper.map(result, Offer, OfferResource);
  }

  @Put(":id")
  update(
    @Param("id") id: number,
    @Body() offer: OfferRequest
  ): Promise<OfferResource> {
    return this.updatePartial(id, offer);
  }

  @Patch(":id")
  async updatePartial(
    @Param("id") id: number,
    @Body() offer: Partial<OfferRequest>
  ): Promise<OfferResource> {
    const mapped = this.mapper.map(offer, OfferRequest, Offer);
    const result = await this.service.update(id, mapped);
    return this.mapper.map(result, Offer, OfferResource);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param("id") id: number): Promise<void> {
    const success = await this.service.delete(id);
    if (!success) {
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "Something went wrong while deleting the requested offer.",
      });
    }
  }
}
