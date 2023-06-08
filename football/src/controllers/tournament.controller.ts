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
import {Tournament} from '../models';
import {TournamentRepository} from '../repositories';
import { inject } from '@loopback/core';
import { TournamentService } from '../services';

export class TournamentController {
  constructor(
    @repository(TournamentRepository)
    public tournamentRepository : TournamentRepository,
    @inject('services.TournamentService')
    public tournamentService: TournamentService,
  ) {}

  @post('/tournaments')
  @response(200, {
    description: 'Tournament model instance',
    content: {'application/json': {schema: getModelSchemaRef(Tournament)}},
  })
  async createTournament(
    @requestBody() tournament: Tournament,
  ): Promise<Tournament> {
    return this.tournamentService.create(tournament);
  }
  // async create(
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(Tournament, {
  //           title: 'NewTournament',
  //           exclude: ['id'],
  //         }),
  //       },
  //     },
  //   })
  //   tournament: Omit<Tournament, 'id'>,
  // ): Promise<Tournament> {
  //   return this.tournamentRepository.create(tournament);
  // }

  @get('/tournaments/count')
  @response(200, {
    description: 'Tournament model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Tournament) where?: Where<Tournament>,
  ): Promise<Count> {
    return this.tournamentRepository.count(where);
  }

  @get('/tournaments')
  @response(200, {
    description: 'Array of Tournament model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Tournament, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Tournament) filter?: Filter<Tournament>,
  ): Promise<Tournament[]> {
    return this.tournamentRepository.find(filter);
  }

  @patch('/tournaments')
  @response(200, {
    description: 'Tournament PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tournament, {partial: true}),
        },
      },
    })
    tournament: Tournament,
    @param.where(Tournament) where?: Where<Tournament>,
  ): Promise<Count> {
    return this.tournamentRepository.updateAll(tournament, where);
  }

  @get('/tournaments/{id}')
  @response(200, {
    description: 'Tournament model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Tournament, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Tournament, {exclude: 'where'}) filter?: FilterExcludingWhere<Tournament>
  ): Promise<Tournament> {
    return this.tournamentRepository.findById(id, filter);
  }

  @patch('/tournaments/{id}')
  @response(204, {
    description: 'Tournament PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tournament, {partial: true}),
        },
      },
    })
    tournament: Tournament,
  ): Promise<void> {
    await this.tournamentRepository.updateById(id, tournament);
  }

  @put('/tournaments/{id}')
  @response(204, {
    description: 'Tournament PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() tournament: Tournament,
  ): Promise<void> {
    await this.tournamentRepository.replaceById(id, tournament);
  }

  @del('/tournaments/{id}')
  @response(204, {
    description: 'Tournament DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tournamentRepository.deleteById(id);
  }
}
