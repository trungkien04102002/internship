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
  Season,
  Match,
} from '../models';
import {SeasonRepository} from '../repositories';

export class SeasonMatchController {
  constructor(
    @repository(SeasonRepository) protected seasonRepository: SeasonRepository,
  ) { }

  @get('/seasons/{id}/matches', {
    responses: {
      '200': {
        description: 'Array of Season has many Match',
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
    return this.seasonRepository.matches(id).find(filter);
  }

  @post('/seasons/{id}/matches', {
    responses: {
      '200': {
        description: 'Season model instance',
        content: {'application/json': {schema: getModelSchemaRef(Match)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Season.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Match, {
            title: 'NewMatchInSeason',
            exclude: ['id'],
            optional: ['seasonId']
          }),
        },
      },
    }) match: Omit<Match, 'id'>,
  ): Promise<Match> {
    return this.seasonRepository.matches(id).create(match);
  }

  @patch('/seasons/{id}/matches', {
    responses: {
      '200': {
        description: 'Season.Match PATCH success count',
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
    return this.seasonRepository.matches(id).patch(match, where);
  }

  @del('/seasons/{id}/matches', {
    responses: {
      '200': {
        description: 'Season.Match DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Match)) where?: Where<Match>,
  ): Promise<Count> {
    return this.seasonRepository.matches(id).delete(where);
  }
}
