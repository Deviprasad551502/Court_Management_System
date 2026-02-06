import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CourtType {
  id: string;
  name: string;
}

export interface CoverageState {
  id: number;
  state_key: string;
  display_name: string;
}

export interface Location {
  court_location_id: string;
  street_address_1: string;
  street_address_2?: string | null;
  city: string;
}

export interface Court {
  court_id: string;
  name: string;
  locations: Location[];
}

export interface CourtSystem {
  court_system_id: string;
  court_system_name: string;
  courts: Court[];
}

export interface CoverageData {
  courtSystems: CourtSystem[];
}

@Injectable({
  providedIn: 'root',
})
export class CoverageApiService {
  private apiUrl = '/api/coverage';

  constructor(private http: HttpClient) {}

  /**
   * Get all court types
   */
  getCourtTypes(): Observable<CourtType[]> {
    return this.http.get<CourtType[]>(`${this.apiUrl}/court-types`);
  }

  /**
   * Get states for a given court type
   */
  getStatesByCourtType(courtTypeId: string): Observable<CoverageState[]> {
    return this.http.get<CoverageState[]>(`${this.apiUrl}/states`, {
      params: { courtTypeId },
    });
  }

  /**
   * Get all states (unfiltered)
   */
  getAllStates(): Observable<CoverageState[]> {
    return this.http.get<CoverageState[]>(`${this.apiUrl}/states/getallstates`);
  }

  /**
   * Get coverage data (court systems, courts, locations) for a court type and state
   */
  getCoverageData(
    courtTypeId: string,
    stateKey: string,
  ): Observable<CoverageData> {
    return this.http.get<CoverageData>(`${this.apiUrl}/data`, {
      params: { courtTypeId, stateKey },
    });
  }

  /**
   * Get coverage data for a state across all court types
   */
  getStateCoverageData(stateKey: string): Observable<CoverageData> {
    return this.http.get<CoverageData>(`${this.apiUrl}/state-data`, {
      params: { stateKey },
    });
  }
}
