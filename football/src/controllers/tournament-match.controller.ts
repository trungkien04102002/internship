import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Tournament,
  Match,
} from '../models';
import {TournamentRepository} from '../repositories';

export class TournamentMatchController {
  constructor(
    @repository(TournamentRepository) protected tournamentRepository: TournamentRepository,
  ) { }

  @get('/tournaments/{id}/matches', {
    responses: {
      '200': {
        description: 'Array of Tournament has many Match',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Match)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Match>,
  ): Promise<Match[]> {
    return this.tournamentRepository.matches(id).find(filter);
  }

  @post('/tournaments/{id}/matches', {
    responses: {
      '200': {
        description: 'Tournament model instance',
        content: {'application/json': {schema: getModelSchemaRef(Match)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Tournament.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Match, {
            title: 'NewMatchInTournament',
            exclude: ['id'],
            optional: ['tournamentId']
          }),
        },
      },
    }) match: Omit<Match, 'id'>,
  ): Promise<Match> {
    return this.tournamentRepository.matches(id).create(match);
  }

  @patch('/tournaments/{id}/matches', {
    responses: {
      '200': {
        description: 'Tournament.Match PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Match, {partial: true}),
        },
      },
    })
    match: Partial<Match>,
    @param.query.object('where', getWhereSchemaFor(Match)) where?: Where<Match>,
  ): Promise<Count> {
    return this.tournamentRepository.matches(id).patch(match, where);
  }

  @del('/tournaments/{id}/matches', {
    responses: {
      '200': {
        description: 'Tournament.Match DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Match)) where?: Where<Match>,
  ): Promise<Count> {
    return this.tournamentRepository.matches(id).delete(where);
  }
}
