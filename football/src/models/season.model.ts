import {Entity, model, property, hasMany, hasOne} from '@loopback/repository';
import {Match} from './match.model';
import {Board} from './board.model';

@model()
export class Season extends Entity {
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
    type: 'string',
    required: true,
  })
  start: string;

  @property({
    type: 'string',
    required: true,
  })
  end: string;

  @hasMany(() => Match)
  matches: Match[];

  @hasOne(() => Board)
  board: Board;

  constructor(data?: Partial<Season>) {
    super(data);
  }
}

export interface SeasonRelations {
  // describe navigational properties here
}

export type SeasonWithRelations = Season & SeasonRelations;
