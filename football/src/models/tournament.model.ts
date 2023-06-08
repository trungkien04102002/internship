import {Entity, model, property, hasMany, hasOne} from '@loopback/repository';
import {Match} from './match.model';
import {Board} from './board.model';
import {Season} from './season.model';
import {Seatour} from './seatour.model';

@model()
export class Tournament extends Entity {
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

  @hasMany(() => Season, {through: {model: () => Seatour}})
  seasons: Season[];

  constructor(data?: Partial<Tournament>) {
    super(data);
  }
}

export interface TournamentRelations {
  // describe navigational properties here
}

export type TournamentWithRelations = Tournament & TournamentRelations;
