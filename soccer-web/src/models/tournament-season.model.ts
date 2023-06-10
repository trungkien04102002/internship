import {Entity, model, property, hasMany, hasOne} from '@loopback/repository';
import {Match} from './match.model';
import {Board} from './board.model';

@model({settings: {strict: false}})
export class TournamentSeason extends Entity {
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

  @hasMany(() => Match)
  matches: Match[];

  @hasOne(() => Board)
  board: Board;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<TournamentSeason>) {
    super(data);
  }
}

export interface TournamentSeasonRelations {
  // describe navigational properties here
}

export type TournamentSeasonWithRelations = TournamentSeason & TournamentSeasonRelations;
