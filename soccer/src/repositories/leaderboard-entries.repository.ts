import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {LeaderboardEntries, LeaderboardEntriesRelations} from '../models';

export class LeaderboardEntriesRepository extends DefaultCrudRepository<
  LeaderboardEntries,
  typeof LeaderboardEntries.prototype.id,
  LeaderboardEntriesRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(LeaderboardEntries, dataSource);
  }
}
