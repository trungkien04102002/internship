import { TournamentRepository } from './../repositories/tournament.repository';
import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { Tournament } from '../models';
import { repository } from '@loopback/repository';

@injectable({scope: BindingScope.TRANSIENT})
export class TournamentService {
  constructor(
    @repository('TournamentRepository')
    public tournamentRepository: TournamentRepository,
  ) {}

  async getAll(): Promise<Tournament[]>{
    const tournaments: Tournament[] = await this.tournamentRepository.find();
    return tournaments;
  }
}
