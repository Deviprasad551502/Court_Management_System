import dataSource from '../data-source';
import { seedCourtTypes } from './seed-court-types';
import { seedStates } from './seed-states';
import { seedCourtSystems } from './seed-court-systems';
import { seedCourts } from './seed-courts';
import { seedLocations } from './seed-locations';
import { seedCourtLocationMap } from './seed-court-location-map';

async function runSeeds() {
  const connection = await dataSource.initialize();

  try {
    console.log('Starting database seeding...');

    await seedCourtTypes(connection);
    await seedStates(connection);
    await seedCourtSystems(connection);
    await seedCourts(connection);
    await seedLocations(connection);
    await seedCourtLocationMap(connection);

    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await connection.destroy();
  }
}

runSeeds();
