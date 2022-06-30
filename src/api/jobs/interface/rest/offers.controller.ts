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
import { OfferRequest } from "src/api/jobs/application/transform/resources/offer.request";
import { OfferResource } from "src/api/jobs/application/transform/resources/offer.resource";
import { Offer } from "src/api/jobs/domain/entities/offer.model";
import { OffersService } from "src/api/jobs/domain/services/offers.service";
import { BaseResponse } from "src/api/shared/communication/BaseResponse";

@Controller("api/v1/offers")
export class OffersController {
  constructor(
    private readonly offersService: OffersService,
    @InjectMapper() private readonly mapper: Mapper
  ) {}

  @Get()
  async getAll(): Promise<BaseResponse<OfferResource[]>> {
    const offers = await this.offersService.getAll();
    const resources = this.mapper.mapArray(offers, Offer, OfferResource);
    return {
      statusCode: HttpStatus.OK,
      resource: resources,
    };
  }

  @Get(":id")
  async getById(
    @Param("id") id: number
  ): Promise<BaseResponse<OfferResource | null>> {
    const entity = await this.offersService.getById(id);
    if (entity === null) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: `Offer with id ${id} not found`,
        resource: null,
      };
    }
    const resource = this.mapper.map(entity, Offer, OfferResource);
    return {
      statusCode: HttpStatus.OK,
      resource,
    };
  }

  @Post()
  async create(
    @Body() offer: OfferRequest
  ): Promise<BaseResponse<OfferResource>> {
    const mapped = this.mapper.map(offer, OfferRequest, Offer);
    const result = await this.offersService.create(mapped);
    const resource = this.mapper.map(result, Offer, OfferResource);
    return {
      statusCode: HttpStatus.CREATED,
      resource,
    };
  }

  @Put(":id")
  update(
    @Param("id") id: number,
    @Body() offer: OfferRequest
  ): Promise<BaseResponse<OfferResource>> {
    return this.updatePartial(id, offer);
  }

  @Patch(":id")
  async updatePartial(
    @Param("id") id: number,
    @Body() offer: Partial<OfferRequest>
  ): Promise<BaseResponse<OfferResource>> {
    const mapped = this.mapper.map(offer, OfferRequest, Offer);
    const result = await this.offersService.update(id, mapped);
    const resource = this.mapper.map(result, Offer, OfferResource);
    return {
      statusCode: HttpStatus.OK,
      resource,
    };
  }

  @Delete(":id")
  async delete(@Param("id") id: number): Promise<BaseResponse<boolean>> {
    const success = await this.offersService.delete(id);
    if (success) {
      return {
        statusCode: HttpStatus.OK,
        message: `Offer with id ${id} successfully deleted`,
        resource: true,
      };
    }
    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: `Something went wrong while deleting offer with id ${id}`,
      resource: false,
    };
  }
}
