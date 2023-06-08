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
  Board,
} from '../models';
import {SeasonRepository} from '../repositories';

export class SeasonBoardController {
  constructor(
    @repository(SeasonRepository) protected seasonRepository: SeasonRepository,
  ) { }

  @get('/seasons/{id}/board', {
    responses: {
      '200': {
        description: 'Season has one Board',
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
    return this.seasonRepository.board(id).get(filter);
  }

  @post('/seasons/{id}/board', {
    responses: {
      '200': {
        description: 'Season model instance',
        content: {'application/json': {schema: getModelSchemaRef(Board)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Season.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Board, {
            title: 'NewBoardInSeason',
            exclude: ['id'],
            optional: ['seasonId']
          }),
        },
      },
    }) board: Omit<Board, 'id'>,
  ): Promise<Board> {
    return this.seasonRepository.board(id).create(board);
  }

  @patch('/seasons/{id}/board', {
    responses: {
      '200': {
        description: 'Season.Board PATCH success count',
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
    return this.seasonRepository.board(id).patch(board, where);
  }

  @del('/seasons/{id}/board', {
    responses: {
      '200': {
        description: 'Season.Board DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Board)) where?: Where<Board>,
  ): Promise<Count> {
    return this.seasonRepository.board(id).delete(where);
  }
}
