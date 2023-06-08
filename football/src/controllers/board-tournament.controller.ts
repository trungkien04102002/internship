import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Board,
  Tournament,
} from '../models';
import {BoardRepository} from '../repositories';

export class BoardTournamentController {
  constructor(
    @repository(BoardRepository)
    public boardRepository: BoardRepository,
  ) { }

  @get('/boards/{id}/tournament', {
    responses: {
      '200': {
        description: 'Tournament belonging to Board',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Tournament),
          },
        },
      },
    },
  })
  async getTournament(
    @param.path.number('id') id: typeof Board.prototype.id,
  ): Promise<Tournament> {
    return this.boardRepository.tournament(id);
  }
}
