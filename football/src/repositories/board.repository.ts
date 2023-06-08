import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Board, BoardRelations, Entry, Season, Tournament} from '../models';
import {EntryRepository} from './entry.repository';
import {SeasonRepository} from './season.repository';
import {TournamentRepository} from './tournament.repository';

export class BoardRepository extends DefaultCrudRepository<
  Board,
  typeof Board.prototype.id,
  BoardRelations
> {

  public readonly entries: HasManyRepositoryFactory<Entry, typeof Board.prototype.id>;

  public readonly season: BelongsToAccessor<Season, typeof Board.prototype.id>;

  public readonly tournament: BelongsToAccessor<Tournament, typeof Board.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('EntryRepository') protected entryRepositoryGetter: Getter<EntryRepository>, @repository.getter('SeasonRepository') protected seasonRepositoryGetter: Getter<SeasonRepository>, @repository.getter('TournamentRepository') protected tournamentRepositoryGetter: Getter<TournamentRepository>,
  ) {
    super(Board, dataSource);
    this.tournament = this.createBelongsToAccessorFor('tournament', tournamentRepositoryGetter,);
    this.registerInclusionResolver('tournament', this.tournament.inclusionResolver);
    this.season = this.createBelongsToAccessorFor('season', seasonRepositoryGetter,);
    this.registerInclusionResolver('season', this.season.inclusionResolver);
    this.entries = this.createHasManyRepositoryFactoryFor('entries', entryRepositoryGetter,);
    this.registerInclusionResolver('entries', this.entries.inclusionResolver);
  }
}
