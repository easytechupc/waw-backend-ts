import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { InjectRepository } from "@nestjs/typeorm";
import { Plan } from "src/subscriptions/domain/entities/plan.model";
import { IPlansRepository } from "src/subscriptions/domain/repositories/plans.repository";
import { Repository } from "typeorm";
import { PlanEntity } from "../entities/plan.entity";

export class PlansRepository implements IPlansRepository {
  constructor(
    @InjectRepository(PlanEntity)
    private readonly plansRepository: Repository<PlanEntity>,
    @InjectMapper() private readonly mapper: Mapper
  ) {}
  async findAll(): Promise<Plan[]> {
    const plans = await this.plansRepository.find();
    return this.mapper.mapArray(plans, PlanEntity, Plan);
  }
  async findById(id: number): Promise<Plan | null> {
    const plan = await this.plansRepository.findOne({ where: { id } });
    if (plan === null) return null;
    return this.mapper.map(plan, PlanEntity, Plan);
  }
  async create(plan: Plan): Promise<Plan> {
    const mapped = this.mapper.map(plan, Plan, PlanEntity);
    const newPlan = this.plansRepository.create(mapped);
    await this.plansRepository.save(newPlan);
    return this.mapper.map(newPlan, PlanEntity, Plan);
  }
  async update(id: number, plan: Plan): Promise<Plan> {
    const mapped = this.mapper.map(plan, Plan, PlanEntity);
    await this.plansRepository.update({ id }, mapped);
    const entity = await this.plansRepository.findOne({ where: { id } });
    if (entity === null)
      throw new Error(
        `Something went wrong while updating subscription plan with id ${id}`
      );
    return this.mapper.map(entity, PlanEntity, Plan);
  }
  async delete(id: number): Promise<boolean> {
    const result = await this.plansRepository.delete({ id });
    const affected = Number(result.affected);
    return Number.isFinite(affected) && affected > 0;
  }
}
