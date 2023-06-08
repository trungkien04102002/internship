import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Entry, EntryRelations, Board} from '../models';
import {BoardRepository} from './board.repository';

export class EntryRepository extends DefaultCrudRepository<
  Entry,
  typeof Entry.prototype.id,
  EntryRelations
> {

  public readonly board: BelongsToAccessor<Board, typeof Entry.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('BoardRepository') protected boardRepositoryGetter: Getter<BoardRepository>,
  ) {
    super(Entry, dataSource);
    this.board = this.createBelongsToAccessorFor('board', boardRepositoryGetter,);
    this.registerInclusionResolver('board', this.board.inclusionResolver);
  }
}
