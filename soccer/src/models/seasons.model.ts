import {Entity, model, property} from '@loopback/repository';

@model()
export class Seasons extends Entity {
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


  constructor(data?: Partial<Seasons>) {
    super(data);
  }
}

export interface SeasonsRelations {
  // describe navigational properties here
}

export type SeasonsWithRelations = Seasons & SeasonsRelations;
