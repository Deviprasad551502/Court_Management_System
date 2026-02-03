# Coverage Feature Implementation Summary

## Overview
Implemented a comprehensive **Coverage** feature that displays court data hierarchically by State and Court Type with deep-linking support.

---

## Backend Implementation

### API Endpoints (3 endpoints under `/api/coverage`)

#### 1. `GET /api/coverage/court-types`
- Returns all court types (State vs Federal)
- Used to populate court type tabs at the top of the page

#### 2. `GET /api/coverage/states?courtTypeId=...`
- Returns states that have at least one court system of the given court type
- Filters the "Browse by State" sidebar based on selected court type
- Properly joins: CourtSystem → CourtType + Location → Court → CourtLocationMap

#### 3. `GET /api/coverage/data?courtTypeId=...&stateKey=...`
- Returns hierarchical coverage data:
  ```
  {
    courtSystems: [
      {
        court_system_id: "...",
        court_system_name: "...",
        courts: [
          {
            court_id: "...",
            name: "...",
            locations: [
              {
                court_location_id: "...",
                street_address_1: "...",
                street_address_2: "...",
                city: "..."
              }
            ]
          }
        ]
      }
    ]
  }
  ```
- Single efficient query with proper joins (no N+1 queries)
- Filters to only show data for the selected state

### Module Registration
- Created new `CoverageModule` with CoverageController and CoverageService
- Registered all 7 modules in `AppModule`:
  - CourtTypesModule
  - StatesModule
  - CourtSystemsModule
  - CourtsModule
  - LocationsModule
  - CourtLocationMapModule
  - **CoverageModule** (new)

### DTOs
- `CoverageStateDto` - State info
- `CoverageDataDto` - Main response structure
- `CourtSystemDto`, `CourtDto`, `LocationDto` - Nested structures

---

## Frontend Implementation

### Component: `CoverageComponent`
**Location**: `/src/app/pages/coverage/coverage.ts`

**Features**:
- Tabs for State vs Federal Court Types
- Filtered "Browse by State" sidebar (left column)
- Coverage details viewer (right column)
- Auto-loads first state when court type is selected
- Deep-linkable URLs: `/coverage?courtTypeId=...&stateKey=...`
- Shows court system names, courts, and locations with addresses
- Displays total courts and locations counters
- Loading states for all async operations

**Component Logic**:
- Queries route parameters for deep linking support
- Manages three loading states: courtTypes, states, data
- Filters court types into State vs Federal groups
- Provides helper methods to count courts and locations

### Service: `CoverageApiService`
**Location**: `/src/app/services/coverage-api.service.ts`

**Methods**:
- `getCourtTypes()` - Fetch all court types
- `getStatesByCourtType(courtTypeId)` - Fetch states for a court type
- `getCoverageData(courtTypeId, stateKey)` - Fetch hierarchical coverage data

**Interfaces**:
- `CourtType`, `CoverageState`, `Location`, `Court`, `CourtSystem`, `CoverageData`

### UI/Template: `coverage.html`
- **Header**: Title and description
- **Court Type Tabs**: State vs Federal separated by divider, blue highlight for selected
- **Two-column layout**:
  - **Left sidebar** (w-64): Scrollable state list with blue highlight for selected
  - **Right content**: Full-height scrollable coverage data display
- **Coverage Data Section**:
  - State name as title
  - Court and location counters
  - Court systems with nested courts and locations
  - Icon indicators (building icon for courts)
  - Address formatting with city, street, etc.

### Styling: `coverage.css`
- Sets `:host` to flex container with full viewport height
- Tailwind classes used throughout (already configured in project)

### Routing
- Added `/coverage` route to `app.routes.ts` with `CoverageComponent`
- Deep-linkable with query params: `?courtTypeId=...&stateKey=...`

### Header Navigation
- Added "Coverage" link in header navigation between "Contact" and CTA buttons

---

## User Interaction Flow

1. **Load page** → Fetch all court types
2. **Click court type tab** (e.g., "State Courts") → 
   - Filter states for that court type
   - Auto-select first state
   - Load and display coverage data
3. **Click state in sidebar** →
   - Fetch coverage data for that state + court type
   - Display court systems, courts, and locations
4. **Deep linking** →
   - Direct link to `/coverage?courtTypeId=CT123&stateKey=CA`
   - Automatically selects the court type and state if valid

---

## Performance Optimizations

✅ Single efficient queries (no N+1)
✅ Proper TypeORM joins with relations
✅ Client-side state filtering (no extra requests)
✅ Lazy load coverage data only when state is selected
✅ Only fetch necessary fields in DTOs

---

## Testing Checklist

- [ ] Header "Coverage" link navigates to `/coverage`
- [ ] Court types load and display correctly
- [ ] Clicking court type filters states list
- [ ] Clicking state loads and displays court systems/courts/locations
- [ ] Deep link works: `/coverage?courtTypeId=...&stateKey=...`
- [ ] No N+1 queries in network tab (single request per endpoint)
- [ ] Loading states display correctly during async operations
- [ ] Empty state messages appear when no data available
- [ ] Responsive layout on different screen sizes
- [ ] Courts and locations display with correct address formatting

---

## Files Created

### Backend
- `/backend/src/modules/coverage/coverage.module.ts`
- `/backend/src/modules/coverage/coverage.controller.ts`
- `/backend/src/modules/coverage/coverage.service.ts`
- `/backend/src/modules/coverage/dto/coverage-states.dto.ts`
- `/backend/src/modules/coverage/dto/coverage-data.dto.ts`

### Frontend
- `/frontend/src/app/pages/coverage/coverage.ts`
- `/frontend/src/app/pages/coverage/coverage.html`
- `/frontend/src/app/pages/coverage/coverage.css`
- `/frontend/src/app/services/coverage-api.service.ts`

### Modified Files
- `/backend/src/app.module.ts` (registered all modules)
- `/frontend/src/app/app.routes.ts` (added coverage route)
- `/frontend/src/app/components/header/header.html` (added coverage link)

---

## Next Steps (Optional Enhancements)

1. **Add search filter** for courts by name in the main content area
2. **Add pagination** if coverage data becomes very large
3. **Add export to CSV** for selected coverage data
4. **Add filters** for location by city or address
5. **Add court details modal** with more information per court
6. **Add coverage indicators** (covered/not-covered icons per court type)
7. **Integrate with map view** to show court locations geographically
