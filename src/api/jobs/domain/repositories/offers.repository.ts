import { Offer } from "../entities/offer.model";

export const OffersRepositoryKey = Symbol("OffersRepository");

export interface IOffersRepository {
  findAll(): Promise<Offer[]>;
  findById(id: number): Promise<Offer | null>;
  create(offer: Offer): Promise<Offer>;
  update(id: number, offer: Offer): Promise<Offer>;
  delete(id: number): Promise<boolean>;
}
