export const serviceTypes = [
  {
    id: 'ppf',
    name: 'PPF PROTECTION',
    description: 'Paint Protection Film',
    icon: 'fa-solid fa-film'
  },
  {
    id: 'ceramic',
    name: 'CERAMIC COATING',
    description: 'Nano-ceramic shield',
    icon: 'fa-solid fa-flask'
  },
  {
    id: 'combo',
    name: 'COMBO PACKAGE',
    description: 'Best value deals',
    icon: 'fa-solid fa-layer-group'
  }
];

export const serviceTiers = {
  ppf: [
    {
      id: 'basic-ppf',
      name: 'Basic PPF',
      coverage: 'Hood + bumpers',
      price: '₹8,999',
      popular: false
    },
    {
      id: 'standard-ppf',
      name: 'Standard PPF',
      coverage: 'Hood + bumpers + fenders + mirrors',
      price: '₹14,999',
      popular: true
    },
    {
      id: 'full-ppf',
      name: 'Full Body PPF',
      coverage: 'Complete vehicle coverage',
      price: '₹24,999',
      popular: false
    }
  ],
  ceramic: [
    {
      id: 'ceramic-spray',
      name: 'Ceramic Spray',
      coverage: 'Single coat maintenance spray',
      price: '₹2,999',
      popular: false
    },
    {
      id: 'ceramic-pro',
      name: 'Ceramic Pro',
      coverage: 'Full vehicle 9H coating',
      price: '₹8,999',
      popular: true
    },
    {
      id: 'ceramic-elite',
      name: 'Ceramic Elite',
      coverage: 'Multi-layer + paint correction',
      price: '₹15,999',
      popular: false
    }
  ],
  combo: [
    {
      id: 'starter-shield',
      name: 'Starter Shield',
      coverage: 'Basic PPF + Ceramic Spray',
      price: '₹10,999',
      originalPrice: '₹11,998',
      popular: false,
      badge: 'BEST VALUE'
    },
    {
      id: 'pro-guard',
      name: 'Pro Guard',
      coverage: 'Standard PPF + Ceramic Pro',
      price: '₹21,999',
      originalPrice: '₹23,998',
      popular: true,
      badge: 'MOST POPULAR'
    },
    {
      id: 'elite-armour',
      name: 'Elite Armour',
      coverage: 'Full Body PPF + Ceramic Elite',
      price: '₹37,999',
      originalPrice: '₹40,998',
      popular: false
    }
  ]
};

export const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 10; hour < 18; hour++) {
    const time = hour > 12 ? `${hour - 12}:00 PM` : `${hour}:00 AM`;
    slots.push(time);
  }
  return slots;
};

export const generateAvailableDates = (days = 20) => {
  const dates = [];
  const today = new Date();
  
  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push(date.toISOString().split('T')[0]);
  }
  
  return dates;
};

export const timeSlots = generateTimeSlots();
export const availableDates = generateAvailableDates(20);

export const vehicleYears = Array.from({ length: 25 }, (_, i) => 2024 - i);

