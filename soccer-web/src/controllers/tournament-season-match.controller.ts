import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  TournamentSeason,
  Match,
} from '../models';
import {TournamentSeasonRepository} from '../repositories';
import { MatchRepository } from '../repositories';
export class TournamentSeasonMatchController {
  constructor(
    @repository(TournamentSeasonRepository) protected tournamentSeasonRepository: TournamentSeasonRepository,
    @repository(MatchRepository) protected matchRepository: MatchRepository
  ) { }

  @get('/tournament-seasons/{id}/matches', {
    responses: {
      '200': {
        description: 'Array of Match of the one team in this sea-tour',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Match)},
          },
        },
      },
    },
  })

  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Match>,
  ): Promise<Match[]> {
    return this.tournamentSeasonRepository.matches(id).find(filter);
  }

  // // ----------------------- START ------------
  @get('/tournament-seasons/{id}/matches-with-team/{teamId}', {
    responses: {
      '200': {
        description: 'Array of TournamentSeason has many Match',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Match)},
          },
        },
      },
    },
  })
  async findMatchesByTeamId(
    @param.path.number('id') id: number,
    @param.path.number('teamId') teamId: number,
  ): Promise<Match[]> {
    const matches: Match[] = await this.matchRepository.find({
      where: {
        and: [
          { tournamentSeasonId: id },
          {or: [
            { hometeamId: teamId },
            { awayteamId: teamId },
          ]}
        ],
      },
    });
    return matches;
  }

  // ----------------------- END ------------
  @post('/tournament-seasons/{id}/matches', {
    responses: {
      '200': {
        description: 'TournamentSeason model instance',
        content: {'application/json': {schema: getModelSchemaRef(Match)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof TournamentSeason.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Match, {
            title: 'NewMatchInTournamentSeason',
            exclude: ['id'],
            optional: ['tournamentSeasonId']
          }),
        },
      },
    }) match: Omit<Match, 'id'>,
  ): Promise<Match> {
    // const match = new Match()
    // match.awayGoal = 
    return this.tournamentSeasonRepository.matches(id).create(match);
  }

  @patch('/tournament-seasons/{id}/matches', {
    responses: {
      '200': {
        description: 'TournamentSeason.Match PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Match, {partial: true}),
        },
      },
    })
    match: Partial<Match>,
    @param.query.object('where', getWhereSchemaFor(Match)) where?: Where<Match>,
  ): Promise<Count> {
    return this.tournamentSeasonRepository.matches(id).patch(match, where);
  }

  @del('/tournament-seasons/{id}/matches', {
    responses: {
      '200': {
        description: 'TournamentSeason.Match DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Match)) where?: Where<Match>,
  ): Promise<Count> {
    return this.tournamentSeasonRepository.matches(id).delete(where);
  }
}
