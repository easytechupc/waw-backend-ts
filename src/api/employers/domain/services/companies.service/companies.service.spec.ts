import { Test, TestingModule } from "@nestjs/testing";
import { CompaniesRepositoryKey } from "../../repositories/companies.repository";
import { CompaniesService } from "./companies.service";

describe("Companies.ServiceService", () => {
  let service: CompaniesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: CompaniesRepositoryKey, useClass: jest.fn() },
        CompaniesService,
      ],
    }).compile();

    service = module.get<CompaniesService>(CompaniesService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
