import {Entity, model, property, referencesMany} from '@loopback/repository';
import {Team} from './team.model';

@model()
export class Match extends Entity {
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
  homename: string;

  @property({
    type: 'string',
    required: true,
  })
  awayname: string;

  @property({
    type: 'number',
    required: true,
  })
  homeGoal: number;

  @property({
    type: 'number',
    required: true,
  })
  awayGoal: number;

  @property({
    type: 'string',
    required: true,
  })
  stadium: string;

  @property({
    type: 'number',
    required: true,
  })
  hometeamId: number;
  
  @property({
    type: 'number',
    required: true,
  })
  awayteamId: number;
  

  @referencesMany(() => Team)
  teamIds: number[];

  constructor(data?: Partial<Match>) {
    super(data);
  }
}

export interface MatchRelations {
  // describe navigational properties here
}

export type MatchWithRelations = Match & MatchRelations;
