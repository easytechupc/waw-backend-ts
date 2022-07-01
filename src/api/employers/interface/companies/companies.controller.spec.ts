import { classes } from "@automapper/classes";
import { AutomapperModule } from "@automapper/nestjs";
import { Test, TestingModule } from "@nestjs/testing";
import { CompaniesRepositoryKey } from "../../domain/repositories/companies.repository";
import { CompaniesService } from "../../domain/services/companies.service/companies.service";
import { CompaniesController } from "./companies.controller";

describe("CompaniesController", () => {
  let controller: CompaniesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AutomapperModule.forRoot({
          strategyInitializer: classes(),
        }),
      ],
      providers: [
        { provide: CompaniesRepositoryKey, useClass: jest.fn() },
        CompaniesService,
      ],
      controllers: [CompaniesController],
    }).compile();

    controller = module.get<CompaniesController>(CompaniesController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
