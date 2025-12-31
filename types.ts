
export enum GenderType {
  MEN = 'Men',
  LADIES = 'Ladies',
  COLIVING = 'Co-living'
}

export enum AvailabilityStatus {
  AVAILABLE = 'Available',
  FEW_LEFT = 'Few rooms left',
  FULL = 'Fully occupied'
}

export interface RoomType {
  sharing: number;
  rent: number;
  availability: AvailabilityStatus;
}

export interface Building {
  id: string;
  name: string;
  roomTypes: RoomType[];
}

export interface PG {
  id: string;
  name: string;
  location: string;
  description: string;
  type: GenderType;
  isLuxury: boolean;
  isVerified: boolean;
  isPopular: boolean;
  images: string[];
  buildings: Building[];
  amenities: string[];
  rules: string[];
}

export interface BookingData {
  pg: PG;
  building: Building;
  roomType: RoomType;
  bookingType: 'visit' | 'direct';
}
