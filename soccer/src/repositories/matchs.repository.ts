import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Matchs, MatchsRelations} from '../models';

export class MatchsRepository extends DefaultCrudRepository<
  Matchs,
  typeof Matchs.prototype.id,
  MatchsRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Matchs, dataSource);
  }
}
