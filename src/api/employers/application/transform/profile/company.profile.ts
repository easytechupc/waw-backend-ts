import { createMap, Mapper, MappingProfile } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Company } from "src/api/employers/domain/entities/company.model";
import { CompanyEntity } from "src/api/employers/infrastructure/persistence/entities/company.entity";
import { CompanyRequest } from "../resources/company.request";
import { CompanyResource } from "../resources/company.resource";

export class CompanyProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile(): MappingProfile {
    return mapper => {
      createMap(mapper, Company, CompanyEntity);
      createMap(mapper, CompanyEntity, Company);
      createMap(mapper, CompanyRequest, Company);
      createMap(mapper, Company, CompanyResource);
    };
  }
}
