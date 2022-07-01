import { Inject, Injectable } from "@nestjs/common";
import { Plan } from "../../entities/plan.model";
import {
  IPlansRepository,
  PlansRepositoryKey,
} from "../../repositories/plans.repository";

@Injectable()
export class PlansService {
  constructor(
    @Inject(PlansRepositoryKey)
    private readonly plansRepository: IPlansRepository
  ) {}

  getAll() {
    return this.plansRepository.findAll();
  }

  getById(id: number) {
    return this.plansRepository.findById(id);
  }

  create(plan: Plan) {
    return this.plansRepository.create(plan);
  }

  update(id: number, plan: Plan) {
    return this.plansRepository.update(id, plan);
  }

  delete(id: number) {
    return this.plansRepository.delete(id);
  }
}
