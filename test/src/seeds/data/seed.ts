import { TestApplication } from './../../application';
import * as fs from 'fs';
import { TeamRepository } from '../../repositories';

export async function migrate(args: string[]) {
  console.log("abc",args)
  const existingSchema = args.includes('--rebuild') ? 'drop' : 'alter';
  console.log('Migrating schemas (%s existing schema)', existingSchema);

  const app = new TestApplication();
  await app.boot();
  await app.migrateSchema({existingSchema});
  interface TeamData {
    name: string;
    url: string;
  }

  const teamData: TeamData[] = JSON.parse(
    fs.readFileSync('./src/seeds/data/team.json', 'utf8'),)
  // Get a reference to the team repository
  const teamRepository = await app.getRepository(TeamRepository);

  // Create a new team for each item in the teamData array
  for (const data of teamData) {
    const teamExists = await teamRepository.findOne({where: {name: data.name}});
    if (!teamExists) {
      const newTeam = await teamRepository.create(data);
      console.log(`Created team with id ${newTeam.id} and name ${newTeam.name}`);
    } else {
      console.log(`Team with name ${data.name} already exists`);
    }
  }

  // Connectors usually keep a pool of opened connections,
  // this keeps the process running even after all work is done.
  // We need to exit explicitly.
  process.exit(0);
}

migrate(process.argv).catch(err => {
  console.error('Cannot migrate database schema', err);
  process.exit(1);
});
