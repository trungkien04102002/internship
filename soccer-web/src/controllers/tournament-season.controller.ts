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
TournamentSeason,
Season,
} from '../models';
import {TournamentRepository} from '../repositories';

export class TournamentSeasonController {
  constructor(
    @repository(TournamentRepository) protected tournamentRepository: TournamentRepository,
  ) { }

  @get('/tournaments/{id}/seasons', {
    responses: {
      '200': {
        description: 'Array of Tournament has many Season through TournamentSeason',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Season)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Season>,
  ): Promise<Season[]> {
    return this.tournamentRepository.seasons(id).find(filter);
  }

  @post('/tournaments/{id}/seasons', {
    responses: {
      '200': {
        description: 'create a Season model instance',
        content: {'application/json': {schema: getModelSchemaRef(Season)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Tournament.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Season, {
            title: 'NewSeasonInTournament',
            exclude: ['id'],
          }),
        },
      },
    }) season: Omit<Season, 'id'>,
  ): Promise<Season> {
    return this.tournamentRepository.seasons(id).create(season);
  }

  @patch('/tournaments/{id}/seasons', {
    responses: {
      '200': {
        description: 'Tournament.Season PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Season, {partial: true}),
        },
      },
    })
    season: Partial<Season>,
    @param.query.object('where', getWhereSchemaFor(Season)) where?: Where<Season>,
  ): Promise<Count> {
    return this.tournamentRepository.seasons(id).patch(season, where);
  }

  @del('/tournaments/{id}/seasons', {
    responses: {
      '200': {
        description: 'Tournament.Season DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Season)) where?: Where<Season>,
  ): Promise<Count> {
    return this.tournamentRepository.seasons(id).delete(where);
  }
}
