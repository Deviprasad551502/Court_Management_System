import { DataSource } from 'typeorm';
import { State } from '../entities/state.entity';

export async function seedStates(dataSource: DataSource): Promise<void> {
  const repository = dataSource.getRepository(State);

  const states = [
    { id: 1, state_key: 'AL', display_name: 'Alabama' },
    { id: 2, state_key: 'AK', display_name: 'Alaska' },
    { id: 3, state_key: 'AZ', display_name: 'Arizona' },
    { id: 4, state_key: 'AR', display_name: 'Arkansas' },
    { id: 5, state_key: 'CA', display_name: 'California' },
    { id: 6, state_key: 'CO', display_name: 'Colorado' },
    { id: 7, state_key: 'CT', display_name: 'Connecticut' },
    { id: 8, state_key: 'DE', display_name: 'Delaware' },
    { id: 9, state_key: 'DC', display_name: 'District of Columbia' },
    { id: 10, state_key: 'FL', display_name: 'Florida' },
    { id: 11, state_key: 'GA', display_name: 'Georgia' },
  ];

  for (const state of states) {
    const existing = await repository.findOne({ where: { id: state.id } });
    if (!existing) {
      await repository.save(repository.create(state));
      console.log(`Seeded state: ${state.display_name}`);
    }
  }
}
