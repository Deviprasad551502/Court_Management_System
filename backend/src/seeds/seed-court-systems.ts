import { DataSource } from 'typeorm';
import { CourtSystem } from '../entities/court-system.entity';

export async function seedCourtSystems(dataSource: DataSource): Promise<void> {
  const repository = dataSource.getRepository(CourtSystem);

  const courtSystems = [
    {
      court_system_id: 'COSY3hbaYtJDKHWd9j',
      court_type_id: 'COTPLurdwRD5jyKSYb',
      court_system_name: 'U.S. International Trade Commission',
    },
    {
      court_system_id: 'COSYmXibkVkRMYi2t3',
      court_type_id: 'COTPm8jjc2PAydpFhq',
      court_system_name: 'Vermont Supreme Court',
    },
    {
      court_system_id: 'COSYAU4pnfLad9vqZv',
      court_type_id: 'COTPm8jjc2PAydpFhq',
      court_system_name: 'Delaware Court of Chancery',
    },
  ];

  for (const courtSystem of courtSystems) {
    const existing = await repository.findOne({
      where: { court_system_id: courtSystem.court_system_id },
    });
    if (!existing) {
      await repository.save(repository.create(courtSystem));
      console.log(`Seeded court system: ${courtSystem.court_system_name}`);
    }
  }
}
