import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CourtTypesService } from '../court-types/court-types.service';
import { StatesService } from '../states/states.service';

type CoverageCourtType = {
  id: string;
  name: string;
};

type CoverageState = {
  id: number;
  state_key: string;
  display_name: string;
};

type CoverageLocation = {
  court_location_id: string;
  street_address_1: string;
  street_address_2: string | null;
  city: string;
};

type CoverageCourt = {
  court_id: string;
  name: string;
  locations: CoverageLocation[];
};

type CoverageCourtSystem = {
  court_system_id: string;
  court_system_name: string;
  courts: CoverageCourt[];
};

type CoverageData = {
  courtSystems: CoverageCourtSystem[];
};

@Injectable()
export class CoverageService {
  constructor(
    private dataSource: DataSource,
    private readonly courtTypesService: CourtTypesService,
    private readonly statesService: StatesService,
  ) {}

  // 🔹 Court types for Coverage UI
  async getCourtTypes(): Promise<CoverageCourtType[]> {
    
    const courtTypes = await this.courtTypesService.findAll();
    return courtTypes
      .map(({ id, name }) => ({ id, name }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  // 🔹 All states (unfiltered)
  async getAllStates(): Promise<CoverageState[]> {
    const states = await this.statesService.findAllBasic();
    return states.map(({ id, state_key, display_name }) => ({
      id,
      state_key,
      display_name,
    }));
  }

  // 🔹 CourtType → States
  async getStatesByCourtType(courtTypeId: string) {
    return this.dataSource.query(`
      SELECT DISTINCT
        s.id,
        s.state_key,
        s.display_name
      FROM court.states s
      JOIN court.locations l ON l.state_id = s.id
      JOIN court.court_location_map clm ON clm.court_location_id = l.court_location_id
      JOIN court.courts c ON c.court_id = clm.court_id
      JOIN court.court_systems cs ON cs.court_system_id = c.court_system_id
      WHERE cs.court_type_id = $1
      ORDER BY s.display_name
    `, [courtTypeId]);
  }

  // 🔹 CourtType + State → CourtSystems → Courts → Locations
  async getCoverageData(courtTypeId: string, stateKey: string): Promise<CoverageData> {
    const rows: Array<{
      court_system_id: string;
      court_system_name: string;
      court_id: string;
      court_name: string;
      court_location_id: string;
      street_address_1: string;
      street_address_2: string | null;
      city: string;
    }> = await this.dataSource.query(
      `
      SELECT
        cs.court_system_id,
        cs.court_system_name,
        c.court_id,
        c.name AS court_name,
        l.court_location_id,
        l.street_address_1,
        l.street_address_2,
        l.city
      FROM court.states s
      JOIN court.locations l ON l.state_id = s.id
      JOIN court.court_location_map clm ON clm.court_location_id = l.court_location_id
      JOIN court.courts c ON c.court_id = clm.court_id
      JOIN court.court_systems cs ON cs.court_system_id = c.court_system_id
      WHERE s.state_key = $1
        AND cs.court_type_id = $2
      ORDER BY cs.court_system_name, c.name, l.city
      `,
      [stateKey, courtTypeId],
    );

    if (!rows || rows.length === 0) {
      return { courtSystems: [] };
    }

    const courtSystemsMap = new Map<
      string,
      CoverageCourtSystem & { _courtsMap: Map<string, CoverageCourt> }
    >();

    for (const row of rows) {
      let courtSystem = courtSystemsMap.get(row.court_system_id);
      if (!courtSystem) {
        courtSystem = {
          court_system_id: row.court_system_id,
          court_system_name: row.court_system_name,
          courts: [],
          _courtsMap: new Map<string, CoverageCourt>(),
        };
        courtSystemsMap.set(row.court_system_id, courtSystem);
      }

      let court = courtSystem._courtsMap.get(row.court_id);
      if (!court) {
        court = {
          court_id: row.court_id,
          name: row.court_name,
          locations: [],
        };
        courtSystem._courtsMap.set(row.court_id, court);
      }

      // Avoid duplicate location entries in case of join duplication.
      if (!court.locations.some((l) => l.court_location_id === row.court_location_id)) {
        court.locations.push({
          court_location_id: row.court_location_id,
          street_address_1: row.street_address_1,
          street_address_2: row.street_address_2,
          city: row.city,
        });
      }
    }

    const courtSystems: CoverageCourtSystem[] = Array.from(courtSystemsMap.values()).map(
      ({ _courtsMap, ...cs }) => ({
        ...cs,
        courts: Array.from(_courtsMap.values()),
      }),
    );

    return { courtSystems };
  }

  // 🔹 State → CourtSystems → Courts → Locations
  async getFullStateHierarchy(stateKey: string) {
    return this.dataSource.query(`
      SELECT
        cs.court_system_id,
        cs.court_system_name,
        c.court_id,
        c.name AS court_name,
        l.city,
        l.street_address_1
      FROM court.states s
      JOIN court.locations l ON l.state_id = s.id
      JOIN court.court_location_map clm ON clm.court_location_id = l.court_location_id
      JOIN court.courts c ON c.court_id = clm.court_id
      JOIN court.court_systems cs ON cs.court_system_id = c.court_system_id
      WHERE s.state_key = $1
      ORDER BY cs.court_system_name, c.name
    `, [stateKey]);
  }
}
