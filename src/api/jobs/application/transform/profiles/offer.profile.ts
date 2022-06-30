import { createMap, Mapper, MappingProfile } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Offer } from "src/api/jobs/domain/entities/offer.model";
import { OfferEntity } from "src/api/jobs/infrastructure/persistence/entities/offer.entity";
import { OfferRequest } from "../resources/offer.request";
import { OfferResource } from "../resources/offer.resource";

export class OfferProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile(): MappingProfile {
    return mapper => {
      createMap(mapper, Offer, OfferResource);
      createMap(mapper, Offer, OfferEntity);
      createMap(mapper, OfferEntity, Offer);
      createMap(mapper, OfferRequest, Offer);
    };
  }
}
