import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Board} from './board.model';

@model()
export class Entry extends Entity {
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
  team: string;

  @property({
    type: 'number',
    required: true,
  })
  rank: number;

  @belongsTo(() => Board)
  boardId: number;

  constructor(data?: Partial<Entry>) {
    super(data);
  }
}

export interface EntryRelations {
  // describe navigational properties here
}

export type EntryWithRelations = Entry & EntryRelations;
