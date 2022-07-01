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
import { CompanyRequest } from "src/api/employers/application/transform/resources/company.request";
import { CompanyResource } from "src/api/employers/application/transform/resources/company.resource";
import { Company } from "src/api/employers/domain/entities/company.model";
import { CompaniesService } from "src/api/employers/domain/services/companies.service/companies.service";

@ApiTags("Companies")
@Controller("api/v1/companies")
export class CompaniesController {
  constructor(
    private readonly service: CompaniesService,
    @InjectMapper() private readonly mapper: Mapper
  ) {}

  @Get()
  async getAll(): Promise<CompanyResource[]> {
    const companies = await this.service.getAll();
    return this.mapper.mapArray(companies, Company, CompanyResource);
  }

  @Get(":id")
  async getById(@Param("id") id: number): Promise<CompanyResource> {
    const company = await this.service.getById(id);
    if (company === null) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: "The requested company was not found.",
      });
    }
    return this.mapper.map(company, Company, CompanyResource);
  }

  @Post()
  async create(@Body() company: CompanyRequest): Promise<CompanyResource> {
    const mapped = this.mapper.map(company, CompanyRequest, Company);
    const result = await this.service.create(mapped);
    return this.mapper.map(result, Company, CompanyResource);
  }

  @Put(":id")
  update(
    @Param("id") id: number,
    @Body() company: CompanyRequest
  ): Promise<CompanyResource> {
    return this.updatePartial(id, company);
  }

  @Patch(":id")
  async updatePartial(
    @Param("id") id: number,
    @Body() company: Partial<CompanyRequest>
  ): Promise<CompanyResource> {
    const mapped = this.mapper.map(company, CompanyRequest, Company);
    const result = await this.service.update(id, mapped);
    return this.mapper.map(result, Company, CompanyResource);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param("id") id: number): Promise<void> {
    const success = await this.service.delete(id);
    if (!success) {
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "Something went wrong while deleting the requested company.",
      });
    }
  }
}
