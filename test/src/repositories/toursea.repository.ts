import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Toursea, TourseaRelations} from '../models';

export class TourseaRepository extends DefaultCrudRepository<
  Toursea,
  typeof Toursea.prototype.id,
  TourseaRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Toursea, dataSource);
  }
}
