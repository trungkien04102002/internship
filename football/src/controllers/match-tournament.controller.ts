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
  Tournament,
} from '../models';
import {MatchRepository} from '../repositories';

export class MatchTournamentController {
  constructor(
    @repository(MatchRepository)
    public matchRepository: MatchRepository,
  ) { }

  @get('/matches/{id}/tournament', {
    responses: {
      '200': {
        description: 'Tournament belonging to Match',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Tournament),
          },
        },
      },
    },
  })
  async getTournament(
    @param.path.number('id') id: typeof Match.prototype.id,
  ): Promise<Tournament> {
    return this.matchRepository.tournament(id);
  }
}
