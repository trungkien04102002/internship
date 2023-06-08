import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Seatour, SeatourRelations} from '../models';

export class SeatourRepository extends DefaultCrudRepository<
  Seatour,
  typeof Seatour.prototype.id,
  SeatourRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Seatour, dataSource);
  }
}
