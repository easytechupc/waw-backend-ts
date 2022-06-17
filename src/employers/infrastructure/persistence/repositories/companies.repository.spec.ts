import { CompaniesRepository } from './companies.repository';

describe('CompaniesRepository', () => {
  it('should be defined', () => {
    expect(new CompaniesRepository()).toBeDefined();
  });
});
