import { DataSource } from 'typeorm';
import { CourtType } from '../entities/court-type.entity';

export async function seedCourtTypes(dataSource: DataSource): Promise<void> {
  const repository = dataSource.getRepository(CourtType);

  const courtTypes = [
    { id: 'COTPLurdwRD5jyKSYb', name: 'Federal' },
    { id: 'COTPm8jjc2PAydpFhq', name: 'State' },
  ];

  for (const courtType of courtTypes) {
    const existing = await repository.findOne({ where: { id: courtType.id } });
    if (!existing) {
      await repository.save(repository.create(courtType));
      console.log(`Seeded court type: ${courtType.name}`);
    }
  }
}
