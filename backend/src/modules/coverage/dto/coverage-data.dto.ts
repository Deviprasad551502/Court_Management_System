export class LocationDto {
  court_location_id: string;
  street_address_1: string;
  street_address_2?: string | null;
  city: string;
}

export class CourtDto {
  court_id: string;
  name: string;
  locations: LocationDto[];
}

export class CourtSystemDto {
  court_system_id: string;
  court_system_name: string;
  courts: CourtDto[];
}

export class CoverageDataDto {
  courtSystems: CourtSystemDto[];
}
