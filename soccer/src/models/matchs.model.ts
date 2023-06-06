import {Entity, model, property} from '@loopback/repository';

@model()
export class Matchs extends Entity {
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
  tournament: number;

  @property({
    type: 'number',
    required: true,
  })
  season: number;

  @property({
    type: 'date',
    required: true,
  })
  date: string;

  @property({
    type: 'string',
    required: true,
  })
  time: string;

  @property({
    type: 'number',
    required: true,
  })
  hometeam: number;

  @property({
    type: 'number',
    required: true,
  })
  awayteam: number;

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


  constructor(data?: Partial<Matchs>) {
    super(data);
  }
}

export interface MatchsRelations {
  // describe navigational properties here
}

export type MatchsWithRelations = Matchs & MatchsRelations;
