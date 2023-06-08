import { privateDecrypt } from 'crypto';
import { TournamentRepository } from './../repositories/tournament.repository';
import {injectable, /* inject, */ BindingScope, inject} from '@loopback/core';
import { getModelSchemaRef, requestBody } from '@loopback/rest';
import { Tournament } from '../models';


@injectable({scope: BindingScope.TRANSIENT})
export class TournamentService {
  constructor(@inject('TournamentRepository')
  private tourRepo: TournamentRepository) {}
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tournament, {
            title: 'NewTournament',
            exclude: ['id'],
          }),
        },
      },
    })
    tournament: Omit<Tournament, 'id'>,
  ): Promise<Tournament> {
    return this.tourRepo.create(tournament);
  }
}
