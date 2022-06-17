import { Inject, Injectable } from "@nestjs/common";
import { Company } from "../../entities/company.model";
import {
  CompaniesRepositoryKey,
  ICompaniesRepository,
} from "../../repositories/companies.repository";

@Injectable()
export class CompaniesService {
  constructor(
    @Inject(CompaniesRepositoryKey)
    private readonly companiesRepository: ICompaniesRepository
  ) {}

  getAll() {
    return this.companiesRepository.findAll();
  }

  getById(id: number) {
    return this.companiesRepository.findById(id);
  }

  create(company: Company) {
    return this.companiesRepository.create(company);
  }

  update(id: number, company: Company) {
    return this.companiesRepository.update(id, company);
  }

  delete(id: number) {
    return this.companiesRepository.delete(id);
  }
}
