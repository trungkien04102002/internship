import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Board, BoardRelations, Entry} from '../models';
import {EntryRepository} from './entry.repository';

export class BoardRepository extends DefaultCrudRepository<
  Board,
  typeof Board.prototype.id,
  BoardRelations
> {

  public readonly entries: HasManyRepositoryFactory<Entry, typeof Board.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('EntryRepository') protected entryRepositoryGetter: Getter<EntryRepository>,
  ) {
    super(Board, dataSource);
    this.entries = this.createHasManyRepositoryFactoryFor('entries', entryRepositoryGetter,);
    this.registerInclusionResolver('entries', this.entries.inclusionResolver);
  }
}
