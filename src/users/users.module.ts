import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserProfile } from "./application/transform/profiles/user.profile";
import { UsersRepositoryKey } from "./domain/repositories/users.repository";
import { UsersService } from "./domain/services/users.service";
import { UserEntity } from "./infraestructure/persistence/entities/user.entity";
import { UsersRepository } from "./infraestructure/persistence/repositories/users.repository";
import { UsersController } from "./interface/rest/users.controller";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    {
      provide: UsersRepositoryKey,
      useClass: UsersRepository,
    },
    UsersService,
    UserProfile,
  ],
  controllers: [UsersController],
})
export class UsersModule {}
