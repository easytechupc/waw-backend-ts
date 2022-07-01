import { OffersRepositoryKey } from "./offers.repository";

describe("OffersRepository", () => {
  it("should have a unique key", () => {
    const key = Symbol("OffersRepository");
    expect(OffersRepositoryKey).not.toStrictEqual(key);
  });
});
