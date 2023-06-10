import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    postgresql: {
      schema: 'public',
      table: 'toursea',
    },
    indexes: {
      unique_tournamentId_seasonId: {
        keys: {
          tournamentId: 1,
          seasonId: 1,
        },
        options: {
          unique: true,
        },
      },
    },
  },
})
export class Toursea extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  tournamentId: number;

  @property({
    type: 'number',
    required: true,
  })
  seasonId: number;

}

export interface TourseaRelations {
  // describe navigational properties here
}

export type TourseaWithRelations = Toursea & TourseaRelations;
