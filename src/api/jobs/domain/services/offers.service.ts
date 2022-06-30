import { Inject, Injectable } from "@nestjs/common";
import { Offer } from "../entities/offer.model";
import {
  IOffersRepository,
  OffersRepositoryKey,
} from "../repositories/offers.repository";

@Injectable()
export class OffersService {
  constructor(
    @Inject(OffersRepositoryKey)
    private readonly offersRepository: IOffersRepository
  ) {}

  getAll() {
    return this.offersRepository.findAll();
  }

  getById(id: number) {
    return this.offersRepository.findById(id);
  }

  create(offer: Offer) {
    return this.offersRepository.create(offer);
  }

  update(id: number, offer: Offer) {
    return this.offersRepository.update(id, offer);
  }

  delete(id: number) {
    return this.offersRepository.delete(id);
  }
}
