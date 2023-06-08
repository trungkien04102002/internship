import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Tournament, TournamentRelations, Match, Board, Season, Seatour} from '../models';
import {MatchRepository} from './match.repository';
import {BoardRepository} from './board.repository';
import {SeatourRepository} from './seatour.repository';
import {SeasonRepository} from './season.repository';

export class TournamentRepository extends DefaultCrudRepository<
  Tournament,
  typeof Tournament.prototype.id,
  TournamentRelations
> {

  public readonly matches: HasManyRepositoryFactory<Match, typeof Tournament.prototype.id>;

  public readonly board: HasOneRepositoryFactory<Board, typeof Tournament.prototype.id>;

  public readonly seasons: HasManyThroughRepositoryFactory<Season, typeof Season.prototype.id,
          Seatour,
          typeof Tournament.prototype.id
        >;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('MatchRepository') protected matchRepositoryGetter: Getter<MatchRepository>, @repository.getter('BoardRepository') protected boardRepositoryGetter: Getter<BoardRepository>, @repository.getter('SeatourRepository') protected seatourRepositoryGetter: Getter<SeatourRepository>, @repository.getter('SeasonRepository') protected seasonRepositoryGetter: Getter<SeasonRepository>,
  ) {
    super(Tournament, dataSource);
    this.seasons = this.createHasManyThroughRepositoryFactoryFor('seasons', seasonRepositoryGetter, seatourRepositoryGetter,);
    this.registerInclusionResolver('seasons', this.seasons.inclusionResolver);
    this.board = this.createHasOneRepositoryFactoryFor('board', boardRepositoryGetter);
    this.registerInclusionResolver('board', this.board.inclusionResolver);
    this.matches = this.createHasManyRepositoryFactoryFor('matches', matchRepositoryGetter,);
    this.registerInclusionResolver('matches', this.matches.inclusionResolver);
  }
}
