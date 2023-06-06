import {Entity, model, property} from '@loopback/repository';

@model()
export class LeaderBoards extends Entity {
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


  constructor(data?: Partial<LeaderBoards>) {
    super(data);
  }
}

export interface LeaderBoardsRelations {
  // describe navigational properties here
}

export type LeaderBoardsWithRelations = LeaderBoards & LeaderBoardsRelations;
