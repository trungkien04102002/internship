import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {LeaderBoards, LeaderBoardsRelations} from '../models';

export class LeaderBoardsRepository extends DefaultCrudRepository<
  LeaderBoards,
  typeof LeaderBoards.prototype.id,
  LeaderBoardsRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(LeaderBoards, dataSource);
  }
}
