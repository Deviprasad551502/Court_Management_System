import { DataSource } from 'typeorm';
import { Court } from '../entities/court.entity';

export async function seedCourts(dataSource: DataSource): Promise<void> {
  const repository = dataSource.getRepository(Court);

  const courts = [
    {
      court_id: 'CORToZCCUhpHHdoxyy',
      court_system_id: 'COSY3hbaYtJDKHWd9j',
      name: 'North Dakota Bankruptcy',
    },
    {
      court_id: 'CORToZ4UQS544rD3rK',
      court_system_id: 'COSYmXibkVkRMYi2t3',
      name: '1st Circuit, Jackson County Circuit Court',
    },
  ];

  for (const court of courts) {
    const existing = await repository.findOne({
      where: { court_id: court.court_id },
    });
    if (!existing) {
      await repository.save(repository.create(court));
      console.log(`Seeded court: ${court.name}`);
    }
  }
}
