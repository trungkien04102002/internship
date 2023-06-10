import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {TournamentSeason, TournamentSeasonRelations, Match, Board} from '../models';
import {MatchRepository} from './match.repository';
import {BoardRepository} from './board.repository';

export class TournamentSeasonRepository extends DefaultCrudRepository<
  TournamentSeason,
  typeof TournamentSeason.prototype.id,
  TournamentSeasonRelations
> {

  public readonly matches: HasManyRepositoryFactory<Match, typeof TournamentSeason.prototype.id>;

  public readonly board: HasOneRepositoryFactory<Board, typeof TournamentSeason.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('MatchRepository') protected matchRepositoryGetter: Getter<MatchRepository>, @repository.getter('BoardRepository') protected boardRepositoryGetter: Getter<BoardRepository>,
  ) {
    super(TournamentSeason, dataSource);
    this.board = this.createHasOneRepositoryFactoryFor('board', boardRepositoryGetter);
    this.registerInclusionResolver('board', this.board.inclusionResolver);
    this.matches = this.createHasManyRepositoryFactoryFor('matches', matchRepositoryGetter,);
    this.registerInclusionResolver('matches', this.matches.inclusionResolver);
  }
}
