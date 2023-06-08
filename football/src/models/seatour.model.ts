import {Entity, model, property} from '@loopback/repository';

@model()
export class Seatour extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  tournamentId?: number;

  @property({
    type: 'number',
  })
  seasonId?: number;

  constructor(data?: Partial<Seatour>) {
    super(data);
  }
}

export interface SeatourRelations {
  // describe navigational properties here
}

export type SeatourWithRelations = Seatour & SeatourRelations;
