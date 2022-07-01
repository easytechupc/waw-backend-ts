import { Plan } from "../entities/plan.model";

export const PlansRepositoryKey = Symbol("PlansRepository");

export interface IPlansRepository {
  findAll(): Promise<Plan[]>;
  findById(id: number): Promise<Plan | null>;
  create(plan: Plan): Promise<Plan>;
  update(id: number, plan: Plan): Promise<Plan>;
  delete(id: number): Promise<boolean>;
}
