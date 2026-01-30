import { DataSource } from 'typeorm';
import { CourtLocationMap } from '../entities/court-location-map.entity';

export async function seedCourtLocationMap(
  dataSource: DataSource,
): Promise<void> {
  const repository = dataSource.getRepository(CourtLocationMap);

  const mappings = [
    {
      court_id: 'CORToZCCUhpHHdoxyy',
      court_location_id: 'COLOiVeyiddwrnar4A',
    },
    {
      court_id: 'CORToZ4UQS544rD3rK',
      court_location_id: 'COLOB9SKBF7TxBZTTJ',
    },
  ];

  for (const mapping of mappings) {
    const existing = await repository.findOne({
      where: {
        court_id: mapping.court_id,
        court_location_id: mapping.court_location_id,
      },
    });
    if (!existing) {
      await repository.save(repository.create(mapping));
      console.log(
        `Seeded court location map: ${mapping.court_id} -> ${mapping.court_location_id}`,
      );
    }
  }
}
