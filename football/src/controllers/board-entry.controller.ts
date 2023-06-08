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
  Board,
  Entry,
} from '../models';
import {BoardRepository} from '../repositories';

export class BoardEntryController {
  constructor(
    @repository(BoardRepository) protected boardRepository: BoardRepository,
  ) { }

  @get('/boards/{id}/entries', {
    responses: {
      '200': {
        description: 'Array of Board has many Entry',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Entry)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Entry>,
  ): Promise<Entry[]> {
    return this.boardRepository.entries(id).find(filter);
  }

  @post('/boards/{id}/entries', {
    responses: {
      '200': {
        description: 'Board model instance',
        content: {'application/json': {schema: getModelSchemaRef(Entry)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Board.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Entry, {
            title: 'NewEntryInBoard',
            exclude: ['id'],
            optional: ['boardId']
          }),
        },
      },
    }) entry: Omit<Entry, 'id'>,
  ): Promise<Entry> {
    return this.boardRepository.entries(id).create(entry);
  }

  @patch('/boards/{id}/entries', {
    responses: {
      '200': {
        description: 'Board.Entry PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Entry, {partial: true}),
        },
      },
    })
    entry: Partial<Entry>,
    @param.query.object('where', getWhereSchemaFor(Entry)) where?: Where<Entry>,
  ): Promise<Count> {
    return this.boardRepository.entries(id).patch(entry, where);
  }

  @del('/boards/{id}/entries', {
    responses: {
      '200': {
        description: 'Board.Entry DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Entry)) where?: Where<Entry>,
  ): Promise<Count> {
    return this.boardRepository.entries(id).delete(where);
  }
}
