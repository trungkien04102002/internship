import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Match,
  Season,
} from '../models';
import {MatchRepository} from '../repositories';

export class MatchSeasonController {
  constructor(
    @repository(MatchRepository)
    public matchRepository: MatchRepository,
  ) { }

  @get('/matches/{id}/season', {
    responses: {
      '200': {
        description: 'Season belonging to Match',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Season),
          },
        },
      },
    },
  })
  async getSeason(
    @param.path.number('id') id: typeof Match.prototype.id,
  ): Promise<Season> {
    return this.matchRepository.season(id);
  }
}
