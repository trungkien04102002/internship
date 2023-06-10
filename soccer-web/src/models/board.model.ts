import {Entity, model, property, hasMany} from '@loopback/repository';
import {Entry} from './entry.model';

@model()
export class Board extends Entity {
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
  tournamentSeasonId: number;

  @hasMany(() => Entry)
  entries: Entry[];

  constructor(data?: Partial<Board>) {
    super(data);
  }
}

export interface BoardRelations {
  // describe navigational properties here
}

export type BoardWithRelations = Board & BoardRelations;
