import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { InjectRepository } from "@nestjs/typeorm";
import { Company } from "src/employers/domain/entities/company.model";
import { ICompaniesRepository } from "src/employers/domain/repositories/companies.repository";
import { Repository } from "typeorm";
import { CompanyEntity } from "../entities/company.entity";

export class CompaniesRepository implements ICompaniesRepository {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly companiesRepository: Repository<CompanyEntity>,
    @InjectMapper()
    private readonly mapper: Mapper
  ) {}
  async findAll(): Promise<Company[]> {
    const entities = await this.companiesRepository.find();
    return this.mapper.mapArray(entities, CompanyEntity, Company);
  }
  async findById(id: number): Promise<Company | null> {
    const entity = await this.companiesRepository.findOne({ where: { id } });
    if (entity === null) return null;
    return this.mapper.map(entity, CompanyEntity, Company);
  }
  async create(company: Company): Promise<Company> {
    const mapped = this.mapper.map(company, Company, CompanyEntity);
    const entity = this.companiesRepository.create(mapped);
    await this.companiesRepository.save(entity);
    return this.mapper.map(entity, CompanyEntity, Company);
  }
  async update(id: number, company: Company): Promise<Company> {
    const mapped = this.mapper.map(company, Company, CompanyEntity);
    await this.companiesRepository.update({ id }, mapped);
    const entity = await this.companiesRepository.findOne({ where: { id } });
    if (entity === null)
      throw new Error(
        `Something went wrong while updating company with id ${id}`
      );
    return this.mapper.map(entity, CompanyEntity, Company);
  }
  async delete(id: number): Promise<boolean> {
    const result = await this.companiesRepository.delete({ id });
    const affected = Number(result.affected);
    return Number.isFinite(affected) && affected > 0;
  }
}
