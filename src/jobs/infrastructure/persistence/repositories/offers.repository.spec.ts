import { classes } from "@automapper/classes";
import { AutomapperModule } from "@automapper/nestjs";
import { Test } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OfferRequest } from "src/jobs/application/transform/resources/offer.request";
import { OffersRepositoryKey } from "src/jobs/domain/repositories/offers.repository";
import { createORMConfig } from "test/utils/ormconfig";
import { Repository } from "typeorm";
import { OfferEntity } from "../entities/offer.entity";
import { OffersRepository } from "./offers.repository";

const data: OfferRequest[] = [
  {
    title: "Software Developer",
    description: "A big description of the job",
    status: true,
  },
  {
    title: "UX/UI Designer",
    description: "What do they have to do?",
    image: "https://example.com/image.png",
    status: true,
  },
];

describe("OffersRepository", () => {
  // let internalRepository: Repository<OfferEntity>;
  let offersRepository: OffersRepository;

  beforeEach(async () => {
    const config = await createORMConfig([OfferEntity]);
    const app = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(config),
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

    // internalRepository = app.get<Repository<OfferEntity>>(
    //   Repository<OfferEntity>
    // );
    offersRepository = app.get<OffersRepository>(OffersRepositoryKey);
  });

  describe("findAll", () => {
    it("should return an empty array when there's no data", () => {
      const result = offersRepository.findAll();
      expect(result).resolves.toEqual([]);
    });

    // it("should return entities available when repository has data", async () => {
    //   const entities = data.map(entity => internalRepository.create(entity));
    //   await internalRepository.save(entities);
    //   const result = offersRepository.findAll();
    //   expect(result).resolves.toEqual(entities);
    // });
  });
});
