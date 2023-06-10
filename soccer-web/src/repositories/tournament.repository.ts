import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Tournament, TournamentRelations, Season, TournamentSeason} from '../models';
import {TournamentSeasonRepository} from './tournament-season.repository';
import {SeasonRepository} from './season.repository';

export class TournamentRepository extends DefaultCrudRepository<
  Tournament,
  typeof Tournament.prototype.id,
  TournamentRelations
> {

  public readonly seasons: HasManyThroughRepositoryFactory<Season, typeof Season.prototype.id,
          TournamentSeason,
          typeof Tournament.prototype.id
        >;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('TournamentSeasonRepository') protected tournamentSeasonRepositoryGetter: Getter<TournamentSeasonRepository>, @repository.getter('SeasonRepository') protected seasonRepositoryGetter: Getter<SeasonRepository>,
  ) {
    super(Tournament, dataSource);
    this.seasons = this.createHasManyThroughRepositoryFactoryFor('seasons', seasonRepositoryGetter, tournamentSeasonRepositoryGetter,);
    this.registerInclusionResolver('seasons', this.seasons.inclusionResolver);
  }
}
