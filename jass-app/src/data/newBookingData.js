export const serviceTypes = [
  {
    id: 'ppf',
    name: 'PPF PROTECTION',
    description: 'Self-healing film',
    icon: 'fa-solid fa-film'
  },
  {
    id: 'ceramic',
    name: 'CERAMIC COATING',
    description: '9H gloss shield',
    icon: 'fa-solid fa-flask'
  }
];

export const serviceTiers = {
  ppf: [
    {
      id: 'basic',
      name: 'Basic PPF',
      coverage: 'Hood + Bumpers',
      price: '₹8,999',
      popular: false
    },
    {
      id: 'standard',
      name: 'Standard PPF',
      coverage: 'Hood + Bumpers + Fenders',
      price: '₹14,999',
      popular: true
    },
    {
      id: 'full',
      name: 'Full Body PPF',
      coverage: 'Complete vehicle coverage',
      price: '₹24,999',
      popular: false
    }
  ],
  ceramic: [
    {
      id: 'basic',
      name: 'Basic Ceramic',
      coverage: 'Single layer coating',
      price: '₹6,999',
      popular: false
    },
    {
      id: 'premium',
      name: 'Premium Ceramic',
      coverage: 'Multi-layer + hydrophobic',
      price: '₹12,999',
      popular: true
    },
    {
      id: 'ultimate',
      name: 'Ultimate Ceramic',
      coverage: 'Complete protection package',
      price: '₹18,999',
      popular: false
    }
  ]
};

export const timeSlots = [
  '9:00 AM',
  '11:00 AM',
  '1:00 PM',
  '3:00 PM',
  '5:00 PM'
];

export const vehicleYears = Array.from({ length: 25 }, (_, i) => 2024 - i);

export const unavailableDates = [
  '2024-12-25', // Christmas
  '2024-12-31', // New Year's Eve
  '2024-01-01', // New Year's Day
];