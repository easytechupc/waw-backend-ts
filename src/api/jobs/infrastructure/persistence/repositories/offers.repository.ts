import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { InjectRepository } from "@nestjs/typeorm";
import { Offer } from "src/api/jobs/domain/entities/offer.model";
import { IOffersRepository } from "src/api/jobs/domain/repositories/offers.repository";
import { Repository } from "typeorm";
import { OfferEntity } from "../entities/offer.entity";

export class OffersRepository implements IOffersRepository {
  constructor(
    @InjectRepository(OfferEntity)
    private readonly offersRepository: Repository<OfferEntity>,
    @InjectMapper()
    private readonly mapper: Mapper
  ) {}

  async findAll(): Promise<Offer[]> {
    const entities = await this.offersRepository.find();
    return this.mapper.mapArray(entities, OfferEntity, Offer);
  }

  async findById(id: number): Promise<Offer | null> {
    const entity = await this.offersRepository.findOne({ where: { id } });
    if (entity === null) return null;
    return this.mapper.map(entity, OfferEntity, Offer);
  }

  async create(offer: Offer): Promise<Offer> {
    const mapped = this.mapper.map(offer, Offer, OfferEntity);
    const entity = this.offersRepository.create(mapped);
    await this.offersRepository.save(entity);
    return this.mapper.map(entity, OfferEntity, Offer);
  }

  async update(id: number, offer: Offer): Promise<Offer> {
    const mapped = this.mapper.map(offer, Offer, OfferEntity);
    await this.offersRepository.update({ id }, mapped);
    const entity = await this.offersRepository.findOne({ where: { id } });
    if (entity === null)
      throw new Error(
        `Something went wrong while updating offer with id ${id}`
      );
    return this.mapper.map(entity, OfferEntity, Offer);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.offersRepository.delete({ id });
    const affected = Number(result.affected);
    return Number.isFinite(affected) && affected > 0;
  }
}
