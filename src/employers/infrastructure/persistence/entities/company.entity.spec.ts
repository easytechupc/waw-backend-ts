import { CompanyEntity } from "src/employers/infrastructure/persistence/entities/company.entity";

describe("CompanyEntity", () => {
  it("should be defined", () => {
    expect(new CompanyEntity()).toBeDefined();
  });
});
