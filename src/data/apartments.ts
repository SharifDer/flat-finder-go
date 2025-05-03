
export interface Apartment {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  images: string[];
  bedrooms: number;
  bathrooms: number;
  area: number;
  features: string[];
  amenities: string[];
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  available: boolean;
  dateAvailable: string;
  petFriendly: boolean;
  furnished: boolean;
  parkingIncluded: boolean;
  utilitiesIncluded: boolean;
  type: string; // Added type property
  floor?: string;
}

export const apartments: Apartment[] = [
  {
    id: '1',
    title: 'Modern Downtown Apartment',
    description: 'Bright and spacious downtown apartment with stunning city views. This newly renovated unit features hardwood floors, stainless steel appliances, and large windows that fill the space with natural light. Centrally located with easy access to public transportation, restaurants, and shopping.',
    price: 1800,
    location: '123 Main St, Downtown',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1630699144867-37acec97df5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    ],
    bedrooms: 2,
    bathrooms: 1,
    area: 850,
    features: ['Hardwood floors', 'City view', 'Stainless steel appliances', 'Dishwasher', 'In-unit laundry'],
    amenities: ['Fitness center', 'Rooftop terrace', '24/7 doorman', 'Package reception'],
    contactName: 'John Smith',
    contactEmail: 'john@example.com',
    contactPhone: '(555) 123-4567',
    available: true,
    dateAvailable: '2024-06-01',
    petFriendly: true,
    furnished: false,
    parkingIncluded: true,
    utilitiesIncluded: false,
    type: 'apartment',
    floor: '1',
  },
  {
    id: '2',
    title: 'Cozy Studio in Westside',
    description: 'Charming studio apartment in a quiet neighborhood with great amenities. This cozy unit includes a fully equipped kitchen, built-in storage solutions, and access to a shared garden. Perfect for a single professional or student looking for affordable living in a convenient location.',
    price: 1200,
    location: '456 Elm St, Westside',
    images: [
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1585129777188-9c5d2876bd40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80'
    ],
    bedrooms: 0,
    bathrooms: 1,
    area: 450,
    features: ['Built-in storage', 'Updated kitchen', 'Recessed lighting', 'Air conditioning'],
    amenities: ['Shared garden', 'Laundry in building', 'Bike storage', 'High-speed internet'],
    contactName: 'Sarah Johnson',
    contactEmail: 'sarah@example.com',
    contactPhone: '(555) 987-6543',
    available: true,
    dateAvailable: '2024-05-15',
    petFriendly: false,
    furnished: false,
    parkingIncluded: false,
    utilitiesIncluded: true,
    type: 'studio',
    floor: '1',
  },
  {
    id: '3',
    title: 'Luxury 3BR with Balcony',
    description: 'Spectacular 3-bedroom apartment with high-end finishes and a private balcony. This luxury unit features a gourmet kitchen with marble countertops, spa-like bathrooms, walk-in closets, and floor-to-ceiling windows. The large private balcony offers panoramic views and is perfect for entertaining.',
    price: 3500,
    location: '789 Oak Ave, Riverside',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1586105251261-72a756497a11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2058&q=80',
      'https://images.unsplash.com/photo-1571508601891-ca5e7a713859?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    ],
    bedrooms: 3,
    bathrooms: 2,
    area: 1500,
    features: ['Marble countertops', 'Walk-in closets', 'Floor-to-ceiling windows', 'Private balcony', 'Smart home features'],
    amenities: ['Swimming pool', 'Concierge', 'Underground parking', 'Business center', 'Pet spa'],
    contactName: 'Michael Chen',
    contactEmail: 'michael@example.com',
    contactPhone: '(555) 456-7890',
    available: true,
    dateAvailable: '2024-06-15',
    petFriendly: true,
    furnished: false,
    parkingIncluded: true,
    utilitiesIncluded: false,
    type: 'apartment',
    floor: '1',
  },
  {
    id: '4',
    title: 'Renovated 1BR with Garden Access',
    description: 'Beautifully renovated 1-bedroom apartment with direct access to a shared garden. This charming unit features a modern kitchen, updated bathroom, and a bright living space. Located in a quiet residential neighborhood with easy access to parks, cafes, and public transportation.',
    price: 1500,
    location: '101 Pine St, Greenview',
    images: [
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80',
      'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80'
    ],
    bedrooms: 1,
    bathrooms: 1,
    area: 650,
    features: ['Recently renovated', 'Garden access', 'Updated kitchen', 'Plenty of storage'],
    amenities: ['Shared garden', 'Laundry facilities', 'Bike storage', 'Pet-friendly'],
    contactName: 'Emily Rodriguez',
    contactEmail: 'emily@example.com',
    contactPhone: '(555) 234-5678',
    available: true,
    dateAvailable: '2024-05-01',
    petFriendly: true,
    furnished: false,
    parkingIncluded: false,
    utilitiesIncluded: true,
    type: 'apartment',
    floor: '1',
  },
  {
    id: '5',
    title: 'Spacious 2BR Townhouse',
    description: 'Two-level townhouse with modern finishes and private entrance. This spacious unit offers an open concept living area, updated kitchen, and two generous bedrooms. Includes a small private patio perfect for outdoor relaxation. Located in a vibrant neighborhood close to shops and restaurants.',
    price: 2200,
    location: '567 Maple Dr, Eastside',
    images: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1558442074-3c19857bc1dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80'
    ],
    bedrooms: 2,
    bathrooms: 1.5,
    area: 1100,
    features: ['Two levels', 'Private entrance', 'Open concept', 'Private patio', 'Modern finishes'],
    amenities: ['Dedicated parking space', 'Storage unit', 'Close to shopping', 'Public transit nearby'],
    contactName: 'David Wilson',
    contactEmail: 'david@example.com',
    contactPhone: '(555) 876-5432',
    available: true,
    dateAvailable: '2024-06-01',
    petFriendly: true,
    furnished: false,
    parkingIncluded: true,
    utilitiesIncluded: false,
    type: 'house',
    floor: '1',
  },
  {
    id: '6',
    title: 'Furnished Studio near University',
    description: 'Fully furnished studio apartment perfect for students or young professionals. This efficient unit comes complete with modern furniture, a full kitchen, and all necessary appliances. Located just blocks from the university and close to public transportation, cafes, and shops.',
    price: 1100,
    location: '321 College Blvd, University District',
    images: [
      'https://images.unsplash.com/photo-1560448204-61dc36dc98c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1585128792020-803d29415281?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
      'https://images.unsplash.com/photo-1631048500142-57a376d35990?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    ],
    bedrooms: 0,
    bathrooms: 1,
    area: 400,
    features: ['Fully furnished', 'Modern appliances', 'Cable & Wi-Fi ready', 'Efficient layout'],
    amenities: ['Study lounge', 'On-site laundry', 'Secure building', 'Bike storage'],
    contactName: 'Lisa Brown',
    contactEmail: 'lisa@example.com',
    contactPhone: '(555) 345-6789',
    available: true,
    dateAvailable: '2024-05-01',
    petFriendly: false,
    furnished: true,
    parkingIncluded: false,
    utilitiesIncluded: true,
    type: 'studio',
    floor: '1',
  }
];

export const featuredApartments = apartments.slice(0, 3);
