import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Season} from './season.model';
import {Tournament} from './tournament.model';

@model()
export class Match extends Entity {
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
  date: string;

  @property({
    type: 'string',
    required: true,
  })
  time: string;

  @property({
    type: 'string',
    required: true,
  })
  hometeam: string;

  @property({
    type: 'string',
    required: true,
  })
  awayteam: string;

  @property({
    type: 'number',
    required: true,
  })
  hometeamGoal: number;

  @property({
    type: 'number',
    required: true,
  })
  awayteamGoal: number;

  @property({
    type: 'string',
    required: true,
  })
  stadium: string;


  @belongsTo(() => Season)
  seasonId: number;

  @belongsTo(() => Tournament)
  tournamentId: number;

  constructor(data?: Partial<Match>) {
    super(data);
  }
}

export interface MatchRelations {
  // describe navigational properties here
}

export type MatchWithRelations = Match & MatchRelations;
