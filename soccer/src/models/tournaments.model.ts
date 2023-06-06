import {Entity, model, property} from '@loopback/repository';

@model()
export class Tournaments extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'date',
    required: true,
  })
  start: string;

  @property({
    type: 'date',
    required: true,
  })
  end: string;


  constructor(data?: Partial<Tournaments>) {
    super(data);
  }
}

export interface TournamentsRelations {
  // describe navigational properties here
}

export type TournamentsWithRelations = Tournaments & TournamentsRelations;
