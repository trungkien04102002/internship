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
  TournamentSeason,
  Board,
} from '../models';
import {TournamentSeasonRepository} from '../repositories';

export class TournamentSeasonBoardController {
  constructor(
    @repository(TournamentSeasonRepository) protected tournamentSeasonRepository: TournamentSeasonRepository,
  ) { }

  @get('/tournament-seasons/{id}/board', {
    responses: {
      '200': {
        description: 'TournamentSeason has one Board',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Board),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Board>,
  ): Promise<Board> {
    return this.tournamentSeasonRepository.board(id).get(filter);
  }

  @post('/tournament-seasons/{id}/board', {
    responses: {
      '200': {
        description: 'TournamentSeason model instance',
        content: {'application/json': {schema: getModelSchemaRef(Board)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof TournamentSeason.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Board, {
            title: 'NewBoardInTournamentSeason',
            exclude: ['id'],
            optional: ['tournamentSeasonId']
          }),
        },
      },
    }) board: Omit<Board, 'id'>,
  ): Promise<Board> {
    return this.tournamentSeasonRepository.board(id).create(board);
  }

  @patch('/tournament-seasons/{id}/board', {
    responses: {
      '200': {
        description: 'TournamentSeason.Board PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Board, {partial: true}),
        },
      },
    })
    board: Partial<Board>,
    @param.query.object('where', getWhereSchemaFor(Board)) where?: Where<Board>,
  ): Promise<Count> {
    return this.tournamentSeasonRepository.board(id).patch(board, where);
  }

  @del('/tournament-seasons/{id}/board', {
    responses: {
      '200': {
        description: 'TournamentSeason.Board DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Board)) where?: Where<Board>,
  ): Promise<Count> {
    return this.tournamentSeasonRepository.board(id).delete(where);
  }
}
