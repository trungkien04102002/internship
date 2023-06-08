import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Entry,
  Board,
} from '../models';
import {EntryRepository} from '../repositories';

export class EntryBoardController {
  constructor(
    @repository(EntryRepository)
    public entryRepository: EntryRepository,
  ) { }

  @get('/entries/{id}/board', {
    responses: {
      '200': {
        description: 'Board belonging to Entry',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Board),
          },
        },
      },
    },
  })
  async getBoard(
    @param.path.number('id') id: typeof Entry.prototype.id,
  ): Promise<Board> {
    return this.entryRepository.board(id);
  }
}
