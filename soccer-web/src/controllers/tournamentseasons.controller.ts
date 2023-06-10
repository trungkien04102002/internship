import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {TournamentSeason} from '../models';
import {TournamentSeasonRepository} from '../repositories';

export class TournamentseasonsController {
  constructor(
    @repository(TournamentSeasonRepository)
    public tournamentSeasonRepository : TournamentSeasonRepository,
  ) {}



  @get('/tournament-seasons/count')
  @response(200, {
    description: 'TournamentSeason model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TournamentSeason) where?: Where<TournamentSeason>,
  ): Promise<Count> {
    return this.tournamentSeasonRepository.count(where);
  }

  @get('/tournament-seasons')
  @response(200, {
    description: 'Array of TournamentSeason model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TournamentSeason, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TournamentSeason) filter?: Filter<TournamentSeason>,
  ): Promise<TournamentSeason[]> {
    return this.tournamentSeasonRepository.find(filter);
  }

  @patch('/tournament-seasons')
  @response(200, {
    description: 'TournamentSeason PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TournamentSeason, {partial: true}),
        },
      },
    })
    tournamentSeason: TournamentSeason,
    @param.where(TournamentSeason) where?: Where<TournamentSeason>,
  ): Promise<Count> {
    return this.tournamentSeasonRepository.updateAll(tournamentSeason, where);
  }

  @get('/tournament-seasons/{id}')
  @response(200, {
    description: 'TournamentSeason model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TournamentSeason, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TournamentSeason, {exclude: 'where'}) filter?: FilterExcludingWhere<TournamentSeason>
  ): Promise<TournamentSeason> {
    return this.tournamentSeasonRepository.findById(id, filter);
  }

  @patch('/tournament-seasons/{id}')
  @response(204, {
    description: 'TournamentSeason PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TournamentSeason, {partial: true}),
        },
      },
    })
    tournamentSeason: TournamentSeason,
  ): Promise<void> {
    await this.tournamentSeasonRepository.updateById(id, tournamentSeason);
  }


  @del('/tournament-seasons/{id}')
  @response(204, {
    description: 'TournamentSeason DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tournamentSeasonRepository.deleteById(id);
  }
}
