import { CompanyEntity } from "src/api/employers/infrastructure/persistence/entities/company.entity";

describe("CompanyEntity", () => {
  it("should be defined", () => {
    expect(new CompanyEntity()).toBeDefined();
  });
});
