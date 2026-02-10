import { ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { forkJoin } from 'rxjs';

import {
  CoverageApiService,
  CourtType,
  CoverageState,
  CoverageData,
} from '../../services/coverage-api.service';

@Component({
  selector: 'app-coverage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './coverage.html',
  styleUrl: './coverage.css',
})
export class CoverageComponent implements OnInit {
  courtTypes: CourtType[] = [];
  states: CoverageState[] = [];
  coverageData: CoverageData | null = null;

  selectedCourtType!: CourtType;
  selectedState: CoverageState | null = null;

  // UI state expected by template
  activeDataset: 'state' | 'federal' = 'state';

  isLoadingStates = false;
  isLoadingData = false;

  courtTypesError: string | null = null;
  statesError: string | null = null;
  dataError: string | null = null;

  // ✅ DEFAULTS
  private readonly DEFAULT_STATE_KEY = 'CA';
  private readonly DEFAULT_COURT_TYPE_NAME = 'State';

  constructor(
    private coverageApi: CoverageApiService,
    @Inject(PLATFORM_ID) private platformId: object,
    private cdr: ChangeDetectorRef,
  ) {}

  private markUi(): void {
    // App is configured with zoneless change detection; async callbacks may not
    // automatically trigger a render unless we notify the scheduler.
    this.cdr.markForCheck();
  }

  // ───────────────────────────────────────────────
  // INIT (ALL LOGIC HERE)
  // ───────────────────────────────────────────────
  ngOnInit(): void {
    // Prevent SSR/prerender from trying to call backend APIs during build.
    if (!isPlatformBrowser(this.platformId)) {
      this.isLoadingStates = false;
      this.isLoadingData = false;
      this.markUi();
      return;
    }

    this.loadInitialCoverage();
  }

  // ───────────────────────────────────────────────
  // MASTER FLOW
  // ───────────────────────────────────────────────
  private loadInitialCoverage(): void {
    this.courtTypesError = null;
    this.statesError = null;
    this.dataError = null;
    this.isLoadingStates = true;
    this.markUi();

    forkJoin({
      courtTypes: this.coverageApi.getCourtTypes(),
      states: this.coverageApi.getAllStates(),
    }).subscribe({
      next: ({ courtTypes, states }) => {
        this.courtTypes = courtTypes;
        this.states = states;
        this.isLoadingStates = false;

        // default dataset: state courts
        this.activeDataset = 'state';

        // pick default court type by name (prefer exact match for 'State')
        let defaultCt = courtTypes.find((ct) => ct.name === this.DEFAULT_COURT_TYPE_NAME);

        // if (!defaultCt) {
        //   // fallback: find anything with 'state' in the name
        //   defaultCt = courtTypes.find((ct) => /state/i.test(ct.name));
        // }

        if (!defaultCt) {
          this.courtTypesError = 'Default State court type not found';
          this.markUi();
          return;
        }

        this.selectedCourtType = defaultCt;

        // pick default state by key (CA) or first available
        const defaultState = states.find((s) => s.state_key === this.DEFAULT_STATE_KEY) ?? states[0];
        if (!defaultState) {
          this.statesError = 'No states available';
          this.markUi();
          return;
        }

        this.selectedState = defaultState;
        this.markUi();

        this.loadCoverageData();
      },
      error: () => {
        this.isLoadingStates = false;
        this.courtTypesError = 'Failed to load court types';
        this.statesError = 'Failed to load states';
        this.markUi();
      },
    });
  }

  // ───────────────────────────────────────────────
  // COURT DETAILS
  // ───────────────────────────────────────────────
  private loadCoverageData(): void {
    if (!this.selectedState) {
      this.dataError = 'No state selected';
      this.markUi();
      return;
    }

    this.dataError = null;
    this.isLoadingData = true;
    this.markUi();

    this.coverageApi.getCoverageData(this.selectedCourtType.id, this.selectedState.state_key).subscribe({
      next: (data) => {
        this.coverageData = data;
        this.isLoadingData = false;
        this.markUi();
      },
      error: (err) => {
        // Treat "no rows" style responses as empty coverage instead of an error.
        // Some backends may return 404 when no court data exists.
        if (err && (err.status === 404 || err.status === 204)) {
          this.coverageData = { courtSystems: [] };
          this.dataError = null;
          this.isLoadingData = false;
          this.markUi();
          return;
        }

        this.dataError = 'Failed to load court coverage data';
        this.isLoadingData = false;
        this.markUi();
      },
    });
  }

  // ───────────────────────────────────────────────
  // UI HELPERS
  // ───────────────────────────────────────────────
  getTotalCourts(): number {
    if (!this.coverageData) return 0;
    return this.coverageData.courtSystems.reduce(
      (sum, cs) => sum + cs.courts.length,
      0,
    );
  }

  getTotalLocations(): number {
    if (!this.coverageData) return 0;
    return this.coverageData.courtSystems.reduce(
      (sum, cs) =>
        sum +
        cs.courts.reduce(
          (courtSum, court) => courtSum + court.locations.length,
          0,
        ),
      0,
    );
  }

  // Template expects these names
  getTotalCourtsCount(): number {
    return this.getTotalCourts();
  }

  getTotalLocationsCount(): number {
    return this.getTotalLocations();
  }

  // Called when user toggles State/Federal buttons
  setDataset(dataset: 'state' | 'federal') {
    if (this.activeDataset === dataset) return;
    this.activeDataset = dataset;

    // choose court type based on dataset
    const desired = dataset === 'state' ? /state/i : /fed/i;
    const ct = this.courtTypes.find((c) => desired.test(c.name));
    if (ct) {
      this.selectedCourtType = ct;
      this.loadCoverageData();
    } else {
      // fallback: keep current but reload court details
      this.loadCoverageData();
    }
  }

  // Called when user clicks a state in the sidebar
  onStateSelected(state: CoverageState) {
    if (this.selectedState && this.selectedState.id === state.id) return;
    this.selectedState = state;
    this.loadCoverageData();
  }
}
