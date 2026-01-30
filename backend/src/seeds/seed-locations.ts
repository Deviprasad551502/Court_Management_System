import { DataSource } from 'typeorm';
import { Location } from '../entities/location.entity';

export async function seedLocations(dataSource: DataSource): Promise<void> {
  const repository = dataSource.getRepository(Location);

  const locations = [
    {
      court_location_id: 'COLOiVeyiddwrnar4A',
      state_id: 1,
      street_address_1: 'One Church St',
      street_address_2: null,
      city: 'Montgomery',
    },
    {
      court_location_id: 'COLOB9SKBF7TxBZTTJ',
      state_id: 1,
      street_address_1: '1729 5Th Ave N',
      street_address_2: null,
      city: 'Birmingham',
    },
    {
      court_location_id: 'COLOoBGpgFxDF22vUR',
      state_id: 2,
      street_address_1: '219 Main St',
      street_address_2: null,
      city: 'Haines',
    },
  ];

  for (const location of locations) {
    const existing = await repository.findOne({
      where: { court_location_id: location.court_location_id },
    });
    if (!existing) {
      await repository.save(repository.create(location));
      console.log(`Seeded location: ${location.city}`);
    }
  }
}
