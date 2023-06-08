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
  Season,
} from '../models';
import {BoardRepository} from '../repositories';

export class BoardSeasonController {
  constructor(
    @repository(BoardRepository)
    public boardRepository: BoardRepository,
  ) { }

  @get('/boards/{id}/season', {
    responses: {
      '200': {
        description: 'Season belonging to Board',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Season),
          },
        },
      },
    },
  })
  async getSeason(
    @param.path.number('id') id: typeof Board.prototype.id,
  ): Promise<Season> {
    return this.boardRepository.season(id);
  }
}
