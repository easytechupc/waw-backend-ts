import { classes } from "@automapper/classes";
import { AutomapperModule } from "@automapper/nestjs";
import { Test } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OffersRepositoryKey } from "src/api/jobs/domain/repositories/offers.repository";
import { createORMConfig } from "test/utils/ormconfig";
import { OfferEntity } from "../entities/offer.entity";
import { OffersRepository } from "./offers.repository";

describe("OffersRepository", () => {
  let offersRepository: OffersRepository;

  beforeEach(async () => {
    const config = await createORMConfig([OfferEntity]);
    const app = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(config),
        TypeOrmModule.forFeature([OfferEntity]),
        AutomapperModule.forRoot({
          strategyInitializer: classes(),
        }),
      ],
      providers: [
        {
          provide: OffersRepositoryKey,
          useClass: OffersRepository,
        },
      ],
    }).compile();

    offersRepository = app.get<OffersRepository>(OffersRepositoryKey);
  });

  describe("findAll", () => {
    it("should return an empty array when there's no data", () => {
      const result = offersRepository.findAll();
      expect(result).resolves.toEqual([]);
    });
  });
});
