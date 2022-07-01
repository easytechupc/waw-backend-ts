import { Company } from "../entities/company.model";

export const CompaniesRepositoryKey = Symbol("CompaniesRepository");

export interface ICompaniesRepository {
  findAll(): Promise<Company[]>;
  findById(id: number): Promise<Company | null>;
  create(company: Company): Promise<Company>;
  update(id: number, company: Company): Promise<Company>;
  delete(id: number): Promise<boolean>;
}
