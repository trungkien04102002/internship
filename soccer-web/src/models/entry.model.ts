import {Entity, model, property} from '@loopback/repository';

@model()
export class Entry extends Entity {
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
  boardId: number;

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


  constructor(data?: Partial<Entry>) {
    super(data);
  }
}

export interface EntryRelations {
  // describe navigational properties here
}

export type EntryWithRelations = Entry & EntryRelations;
