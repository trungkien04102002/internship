import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Entry} from './entry.model';
import {Season} from './season.model';
import {Tournament} from './tournament.model';

@model()
export class Board extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;
  @hasMany(() => Entry)
  entries: Entry[];

  @belongsTo(() => Season)
  seasonId: number;

  @belongsTo(() => Tournament)
  tournamentId: number;

  constructor(data?: Partial<Board>) {
    super(data);
  }
}

export interface BoardRelations {
  // describe navigational properties here
}

export type BoardWithRelations = Board & BoardRelations;
