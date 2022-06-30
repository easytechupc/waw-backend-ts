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
  async getAll() {
    const companies = await this.service.getAll();
    const resources = this.mapper.mapArray(companies, Company, CompanyResource);
    return {
      statusCode: HttpStatus.OK,
      message: "All stored companies where retrieved successfully.",
      resource: resources,
    };
  }

  @Get(":id")
  async getById(@Param("id") id: number) {
    const company = await this.service.getById(id);
    if (company === null) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: `Company with id ${id} not found`,
        resource: null,
      };
    }
    const resource = this.mapper.map(company, Company, CompanyResource);
    return {
      statusCode: HttpStatus.OK,
      message: `Company with id ${id} was retrieved successfully.`,
      resource: resource,
    };
  }

  @Post()
  async create(@Body() company: CompanyRequest) {
    const mapped = this.mapper.map(company, CompanyRequest, Company);
    const result = await this.service.create(mapped);
    const resource = this.mapper.map(result, Company, CompanyResource);
    return {
      statusCode: HttpStatus.CREATED,
      message: `A new company was created successfully.`,
      resource: resource,
    };
  }

  @Put(":id")
  update(@Param("id") id: number, @Body() company: CompanyRequest) {
    return this.updatePartial(id, company);
  }

  @Patch(":id")
  async updatePartial(
    @Param("id") id: number,
    @Body() company: Partial<CompanyRequest>
  ) {
    const mapped = this.mapper.map(company, CompanyRequest, Company);
    const result = await this.service.update(id, mapped);
    const resource = this.mapper.map(result, Company, CompanyResource);
    return {
      statusCode: HttpStatus.OK,
      message: `Company with id ${id} was updated successfully.`,
      resource: resource,
    };
  }

  @Delete(":id")
  async delete(@Param("id") id: number) {
    const success = await this.service.delete(id);
    if (success) {
      return {
        statusCode: HttpStatus.OK,
        message: `Company with id ${id} was deleted successfully.`,
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
