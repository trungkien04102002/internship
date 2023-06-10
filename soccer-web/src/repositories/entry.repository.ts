import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Entry, EntryRelations} from '../models';

export class EntryRepository extends DefaultCrudRepository<
  Entry,
  typeof Entry.prototype.id,
  EntryRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Entry, dataSource);
  }
}
