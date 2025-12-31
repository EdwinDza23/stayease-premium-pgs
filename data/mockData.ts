
import { PG, GenderType, AvailabilityStatus } from '../types';

const generatePGs = () => {
  const pgs: PG[] = [];
  const locations = [
    "JP Nagar 5th Phase", 
    "JP Nagar 1st Phase", 
    "HSR Layout Sector 2", 
    "HSR Layout Sector 7", 
    "Koramangala 4th Block", 
    "Koramangala 1st Block", 
    "Indiranagar 100ft Rd", 
    "Whitefield ITPL Main Rd", 
    "Electronic City Phase 1", 
    "BTM Layout 2nd Stage"
  ];
  
  // Men's PGs
  for (let i = 1; i <= 11; i++) {
    pgs.push({
      id: `m${i}`,
      name: i % 2 === 0 ? `Stanza Men's Living ${i}` : `Zolo Men's Living ${i}`,
      location: locations[i % locations.length],
      description: "A premium stay designed for working professionals with high-speed internet and daily housekeeping.",
      type: GenderType.MEN,
      isLuxury: i % 3 === 0,
      isVerified: true,
      isPopular: i < 5,
      images: [
        `https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=800&auto=format&fit=crop`,
        `https://images.unsplash.com/photo-1555854811-8af2277430bb?q=80&w=800&auto=format&fit=crop`
      ],
      buildings: [{
        id: `b-m${i}`,
        name: 'Block A',
        roomTypes: [
          { sharing: 2, rent: 9000 + (i * 100), availability: AvailabilityStatus.AVAILABLE },
          { sharing: 3, rent: 7500 + (i * 100), availability: AvailabilityStatus.FEW_LEFT },
          { sharing: 4, rent: 6500 + (i * 100), availability: AvailabilityStatus.AVAILABLE },
          { sharing: 5, rent: 5500 + (i * 100), availability: i % 4 === 0 ? AvailabilityStatus.FULL : AvailabilityStatus.AVAILABLE },
          { sharing: 6, rent: 4800 + (i * 100), availability: AvailabilityStatus.AVAILABLE }
        ]
      }],
      amenities: ['Wi-Fi', 'Security', 'Laundry', 'Food'],
      rules: ['No smoking', 'Gate closes at 11 PM']
    });
  }

  // Ladies' PGs
  for (let i = 1; i <= 11; i++) {
    pgs.push({
      id: `l${i}`,
      name: i % 2 === 0 ? `Nestaway Ladies ${i}` : `Grace Ladies Living ${i}`,
      location: locations[(i + 2) % locations.length],
      description: "Safe and secure residence for working women. High-end security and home-style food included.",
      type: GenderType.LADIES,
      isLuxury: i % 4 === 0,
      isVerified: i % 2 === 0,
      isPopular: i % 3 === 0,
      images: [
        `https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?q=80&w=800&auto=format&fit=crop`,
        `https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800&auto=format&fit=crop`
      ],
      buildings: [{
        id: `b-l${i}`,
        name: 'Main Wing',
        roomTypes: [
          { sharing: 1, rent: 16000 + (i * 200), availability: AvailabilityStatus.AVAILABLE },
          { sharing: 2, rent: 12000 + (i * 200), availability: i % 5 === 0 ? AvailabilityStatus.FULL : AvailabilityStatus.AVAILABLE },
          { sharing: 3, rent: 10000 + (i * 200), availability: AvailabilityStatus.FEW_LEFT },
          { sharing: 4, rent: 8500 + (i * 200), availability: AvailabilityStatus.AVAILABLE }
        ]
      }],
      amenities: ['Biometric Access', 'Gym', 'Laundry', 'Cafeteria'],
      rules: ['No visitors in rooms', 'Entry by 10 PM']
    });
  }

  // Co-living PGs
  for (let i = 1; i <= 11; i++) {
    pgs.push({
      id: `c${i}`,
      name: i % 2 === 0 ? `Evolve Co-living ${i}` : `Zenith Luxury Suites ${i}`,
      location: locations[(i + 5) % locations.length],
      description: "Luxury co-living spaces for the modern millennial. Includes community events and premium lounge access.",
      type: GenderType.COLIVING,
      isLuxury: true,
      isVerified: true,
      isPopular: true,
      images: [
        `https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop`,
        `https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800&auto=format&fit=crop`
      ],
      buildings: [{
        id: `b-c${i}`,
        name: 'Premium Block',
        roomTypes: [
          { sharing: 1, rent: 25000 + (i * 500), availability: AvailabilityStatus.AVAILABLE },
          { sharing: 2, rent: 18000 + (i * 500), availability: AvailabilityStatus.FEW_LEFT },
          { sharing: 3, rent: 14000 + (i * 500), availability: AvailabilityStatus.AVAILABLE },
          { sharing: 4, rent: 11000 + (i * 500), availability: AvailabilityStatus.AVAILABLE },
          { sharing: 5, rent: 9500 + (i * 500), availability: AvailabilityStatus.FEW_LEFT },
          { sharing: 6, rent: 8000 + (i * 500), availability: AvailabilityStatus.AVAILABLE }
        ]
      }],
      amenities: ['Pool', 'Gaming Zone', 'Cleaning', 'Events'],
      rules: ['Respect quiet hours', 'No pets']
    });
  }

  return pgs;
};

export const PGS: PG[] = generatePGs();
