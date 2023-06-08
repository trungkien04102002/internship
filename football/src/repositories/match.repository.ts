import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Match, MatchRelations, Season, Tournament} from '../models';
import {SeasonRepository} from './season.repository';
import {TournamentRepository} from './tournament.repository';

export class MatchRepository extends DefaultCrudRepository<
  Match,
  typeof Match.prototype.id,
  MatchRelations
> {

  public readonly season: BelongsToAccessor<Season, typeof Match.prototype.id>;

  public readonly tournament: BelongsToAccessor<Tournament, typeof Match.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('SeasonRepository') protected seasonRepositoryGetter: Getter<SeasonRepository>, @repository.getter('TournamentRepository') protected tournamentRepositoryGetter: Getter<TournamentRepository>,
  ) {
    super(Match, dataSource);
    this.tournament = this.createBelongsToAccessorFor('tournament', tournamentRepositoryGetter,);
    this.registerInclusionResolver('tournament', this.tournament.inclusionResolver);
    this.season = this.createBelongsToAccessorFor('season', seasonRepositoryGetter,);
    this.registerInclusionResolver('season', this.season.inclusionResolver);
  }
}
