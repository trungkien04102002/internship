import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Season, SeasonRelations, Match, Board} from '../models';
import {MatchRepository} from './match.repository';
import {BoardRepository} from './board.repository';

export class SeasonRepository extends DefaultCrudRepository<
  Season,
  typeof Season.prototype.id,
  SeasonRelations
> {

  public readonly matches: HasManyRepositoryFactory<Match, typeof Season.prototype.id>;

  public readonly board: HasOneRepositoryFactory<Board, typeof Season.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('MatchRepository') protected matchRepositoryGetter: Getter<MatchRepository>, @repository.getter('BoardRepository') protected boardRepositoryGetter: Getter<BoardRepository>,
  ) {
    super(Season, dataSource);
    this.board = this.createHasOneRepositoryFactoryFor('board', boardRepositoryGetter);
    this.registerInclusionResolver('board', this.board.inclusionResolver);
    this.matches = this.createHasManyRepositoryFactoryFor('matches', matchRepositoryGetter,);
    this.registerInclusionResolver('matches', this.matches.inclusionResolver);
  }
}
