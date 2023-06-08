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
  Board,
} from '../models';
import {TournamentRepository} from '../repositories';

export class TournamentBoardController {
  constructor(
    @repository(TournamentRepository) protected tournamentRepository: TournamentRepository,
  ) { }

  @get('/tournaments/{id}/board', {
    responses: {
      '200': {
        description: 'Tournament has one Board',
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
    return this.tournamentRepository.board(id).get(filter);
  }

  @post('/tournaments/{id}/board', {
    responses: {
      '200': {
        description: 'Tournament model instance',
        content: {'application/json': {schema: getModelSchemaRef(Board)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Tournament.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Board, {
            title: 'NewBoardInTournament',
            exclude: ['id'],
            optional: ['tournamentId']
          }),
        },
      },
    }) board: Omit<Board, 'id'>,
  ): Promise<Board> {
    return this.tournamentRepository.board(id).create(board);
  }

  @patch('/tournaments/{id}/board', {
    responses: {
      '200': {
        description: 'Tournament.Board PATCH success count',
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
    return this.tournamentRepository.board(id).patch(board, where);
  }

  @del('/tournaments/{id}/board', {
    responses: {
      '200': {
        description: 'Tournament.Board DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Board)) where?: Where<Board>,
  ): Promise<Count> {
    return this.tournamentRepository.board(id).delete(where);
  }
}
