import { createMap, Mapper, MappingProfile } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { User } from "src/api/users/domain/entities/user.model";
import { UserEntity } from "src/api/users/infraestructure/persistence/entities/user.entity";
import { UserRequest } from "../resources/user.request";
import { UserResource } from "../resources/user.resource";

export class UserProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile(): MappingProfile {
    return mapper => {
      createMap(mapper, User, UserResource);
      createMap(mapper, User, UserEntity);
      createMap(mapper, UserEntity, User);
      createMap(mapper, UserRequest, User);
    };
  }
}
