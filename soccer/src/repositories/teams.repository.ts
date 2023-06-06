import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Teams, TeamsRelations} from '../models';

export class TeamsRepository extends DefaultCrudRepository<
  Teams,
  typeof Teams.prototype.id,
  TeamsRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Teams, dataSource);
  }
}
