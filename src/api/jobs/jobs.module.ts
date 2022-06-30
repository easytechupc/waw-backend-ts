import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OfferProfile } from "./application/transform/profiles/offer.profile";
import { OffersRepositoryKey } from "./domain/repositories/offers.repository";
import { OffersService } from "./domain/services/offers.service";
import { OfferEntity } from "./infrastructure/persistence/entities/offer.entity";
import { OffersRepository } from "./infrastructure/persistence/repositories/offers.repository";
import { OffersController } from "./interface/rest/offers.controller";

@Module({
  imports: [TypeOrmModule.forFeature([OfferEntity])],
  providers: [
    {
      provide: OffersRepositoryKey,
      useClass: OffersRepository,
    },
    OffersService,
    OfferProfile,
  ],
  controllers: [OffersController],
})
export class JobsModule {}
