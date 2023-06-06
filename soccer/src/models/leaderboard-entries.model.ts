import {Entity, model, property} from '@loopback/repository';

@model()
export class LeaderboardEntries extends Entity {
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
  leaderBoard: number;

  @property({
    type: 'number',
    required: true,
  })
  team: number;

  @property({
    type: 'number',
    required: true,
  })
  rank: number;


  constructor(data?: Partial<LeaderboardEntries>) {
    super(data);
  }
}

export interface LeaderboardEntriesRelations {
  // describe navigational properties here
}

export type LeaderboardEntriesWithRelations = LeaderboardEntries & LeaderboardEntriesRelations;
