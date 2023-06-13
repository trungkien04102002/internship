import {TestApplication} from './application';
import * as fs from 'fs';
const axios = require('axios');
const fetch = require('node-fetch')
import { TeamRepository } from './repositories';
import { TourseaRepository } from './repositories';
import path from 'path';
import { AxiosResponse } from 'axios';
import { Response } from 'express';
export async function migrate(args: string[]) {
  const existingSchema = args.includes('--rebuild') ? 'drop' : 'alter';
  console.log('Migrating schemas (%s existing schema)', existingSchema);

  const app = new TestApplication();
  await app.boot();
  await app.migrateSchema({existingSchema});

  interface TourSeaData {
    tournamentId: number;
    seasonId: number;
  }
  const teamData: TourSeaData[] = JSON.parse(
  fs.readFileSync('./src/seeds/data/toursea.json', 'utf8'),)
  const tourseaRepo = await app.getRepository(TourseaRepository)
  for (const data of teamData){
    const tsExist = await tourseaRepo.findOne({where: {tournamentId:data.tournamentId, seasonId:data.seasonId}});
    if (!tsExist) {
      const newTeam = await tourseaRepo.create(data);
      console.log(`Created toursea with id ${newTeam.id} and tournamentId ${newTeam.tournamentId} 
      and seaId ${newTeam.seasonId}`);
    } else {
      console.log(`Team with tournament ${data.tournamentId} and season ${data.seasonId} already exists`);
    }

}

  process.exit(0);
}

migrate(process.argv).catch(err => {
  console.error('Cannot migrate database schema', err);
  process.exit(1);
});
