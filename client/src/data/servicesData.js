export const servicesData = {
  services: [
    {
      id: 1,
      category: "ppf",
      title: "Paint Protection Film",
      description:
        "Premium self-healing paint protection film shields your vehicle from rock chips, scratches, and environmental damage. Our advanced TPU technology maintains your car's original finish while providing invisible protection.",
      image:
        "https://images.pexels.com/photos/31154218/pexels-photo-31154218.jpeg",

      benefits: [
        "Self-healing technology",
        "10-year warranty",
        "UV & yellowing resistant",
        "Hydrophobic top coat",
      ],

      tiers: [
        {
          id: "ppf-basic",
          name: "Basic PPF",
          icon: "fa-solid fa-shield",
          coverage: "Front bumper, headlights, mirrors",
          price: 12999,
          tier: "basic",
        },
        {
          id: "ppf-standard",
          name: "Standard PPF",
          icon: "fa-solid fa-shield-halved",
          coverage: "Hood, fenders, front bumper",
          price: 24999,
          tier: "standard",
        },
        {
          id: "ppf-full",
          name: "Full Body PPF",
          icon: "fa-solid fa-car",
          coverage: "Complete vehicle coverage",
          price: 89999,
          tier: "full",
        },
      ],
    },

    {
      id: 2,
      category: "ceramic",
      title: "Ceramic Coating",
      description:
        "Professional-grade nano-ceramic coating creates a permanent bond with your vehicle's paint, delivering 9H hardness protection and a stunning mirror finish.",
      image:
        "https://images.pexels.com/photos/20042055/pexels-photo-20042055.jpeg",

      benefits: [
        "9H hardness",
        "5-year durability",
        "Extreme hydrophobic",
        "Chemical resistant",
      ],

      tiers: [
        {
          id: "ceramic-spray",
          name: "Ceramic Spray",
          icon: "fa-solid fa-spray-can",
          coverage: "Single coat maintenance spray",
          price: 2999,
          tier: "spray",
        },
        {
          id: "ceramic-pro",
          name: "Ceramic Pro",
          icon: "fa-solid fa-star",
          coverage: "Full vehicle 9H coating",
          price: 8999,
          tier: "pro",
        },
        {
          id: "ceramic-elite",
          name: "Ceramic Elite",
          icon: "fa-solid fa-crown",
          coverage: "Multi-layer + paint correction",
          price: 15999,
          tier: "elite",
        },
      ],
    },

    {
      id: 3,
      category: "interior",
      title: "Car Interior Detailing",
      description:
        "Comprehensive interior detailing designed to restore, sanitize, and protect your vehicle's cabin.",
      image:
        "https://images.pexels.com/photos/3635688/pexels-photo-3635688.jpeg",

      benefits: [
        "Deep steam sanitization",
        "Leather conditioning",
        "Odor elimination",
        "Dashboard restoration",
      ],

      tiers: [
        {
          id: "interior-basic",
          name: "Basic Interior",
          icon: "fa-solid fa-broom",
          coverage: "Vacuuming, dashboard wipe",
          price: 2499,
          tier: "basic",
        },
        {
          id: "interior-deep",
          name: "Deep Interior",
          icon: "fa-solid fa-spray-can-sparkles",
          coverage: "Steam cleaning, seat shampoo",
          price: 4999,
          tier: "deep",
        },
        {
          id: "interior-premium",
          name: "Premium Interior",
          icon: "fa-solid fa-crown",
          coverage: "Full restoration",
          price: 7999,
          tier: "premium",
        },
      ],
    },
  ],

  combos: [
    {
      id: "combo-starter",
      category: "combo",
      name: "Starter Shield",
      icon: "fa-solid fa-layer-group",
      includes: ["Basic PPF", "Ceramic Spray"],
      originalPrice: 15998,
      price: 10999,
      popular: false,
    },

    {
      id: "combo-pro",
      category: "combo",
      name: "Pro Guard",
      icon: "fa-solid fa-shield-halved",
      includes: ["Standard PPF", "Ceramic Pro"],
      originalPrice: 33998,
      price: 21999,
      popular: true,
    },
    {
      id: "combo-elite",
      name: "Elite Armour",
      icon: "fa-solid fa-crown",
      includes: ["Full Body PPF", "Ceramic Elite"],
      originalPrice: 105998,
      price: 37998,
      popular: false,
      type: "combo",
    },
  ],
};
