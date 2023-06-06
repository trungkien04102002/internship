import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Seasons, SeasonsRelations} from '../models';

export class SeasonsRepository extends DefaultCrudRepository<
  Seasons,
  typeof Seasons.prototype.id,
  SeasonsRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Seasons, dataSource);
  }
}
