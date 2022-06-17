import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CompanyProfile } from "./application/transform/profile/company.profile";
import { CompaniesRepositoryKey } from "./domain/repositories/companies.repository";
import { CompaniesService } from "./domain/services/companies.service/companies.service";
import { CompanyEntity } from "./infrastructure/persistence/entities/company.entity";
import { CompaniesRepository } from "./infrastructure/persistence/repositories/companies.repository";
import { CompaniesController } from "./interface/companies/companies.controller";

@Module({
  imports: [TypeOrmModule.forFeature([CompanyEntity])],
  providers: [
    {
      provide: CompaniesRepositoryKey,
      useClass: CompaniesRepository,
    },
    CompaniesService,
    CompanyProfile,
  ],
  controllers: [CompaniesController],
})
export class EmployersModule {}
