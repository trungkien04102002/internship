import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Tournaments, TournamentsRelations} from '../models';

export class TournamentsRepository extends DefaultCrudRepository<
  Tournaments,
  typeof Tournaments.prototype.id,
  TournamentsRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Tournaments, dataSource);
  }
}
