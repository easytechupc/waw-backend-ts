import { createMap, Mapper, MappingProfile } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Plan } from "src/subscriptions/domain/entities/plan.model";
import { PlanEntity } from "src/subscriptions/infrastructure/persistence/entities/plan.entity";
import { PlanRequest } from "../resources/plan.request";
import { PlanResource } from "../resources/plan.resource";

export class PlanProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile(): MappingProfile {
    return mapper => {
      createMap(mapper, Plan, PlanEntity);
      createMap(mapper, PlanEntity, Plan);
      createMap(mapper, Plan, PlanResource);
      createMap(mapper, PlanRequest, Plan);
    };
  }
}
