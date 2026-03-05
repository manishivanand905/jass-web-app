// ─── PPF Brands ───────────────────────────────────────────────────────────────
export const ppfBrands = [
  {
    id: "xpel",
    name: "XPEL Ultimate+",
    origin: "USA",
    tier: "Premium",
    highlight: true,
    bestFor: "Supercars & Luxury",
    specs: {
      thickness: "8 mil",
      selfHealing: true,
      uvResistance: "Excellent",
      hydrophobic: true,
      warranty: "10 Years",
      glossFinish: true,
      antiYellowing: true,
      priceRange: "₹₹₹₹",
      rating: "5.0 ★",
    },
  },
  {
    id: "suntek",
    name: "SunTek Ultra",
    origin: "USA",
    tier: "Mid-Premium",
    highlight: false,
    bestFor: "Daily Drivers",
    specs: {
      thickness: "8 mil",
      selfHealing: true,
      uvResistance: "Excellent",
      hydrophobic: true,
      warranty: "10 Years",
      glossFinish: true,
      antiYellowing: true,
      priceRange: "₹₹₹",
      rating: "4.5 ★",
    },
  },
  {
    id: "3m",
    name: "3M Scotchgard",
    origin: "USA",
    tier: "Trusted OEM",
    highlight: false,
    bestFor: "Budget Premium",
    specs: {
      thickness: "6 mil",
      selfHealing: false,
      uvResistance: "Good",
      hydrophobic: true,
      warranty: "7 Years",
      glossFinish: true,
      antiYellowing: false,
      priceRange: "₹₹₹",
      rating: "4.0 ★",
    },
  },
  {
    id: "llumar",
    name: "LLumar Platinum",
    origin: "USA",
    tier: "Value Premium",
    highlight: false,
    bestFor: "Family Cars",
    specs: {
      thickness: "7 mil",
      selfHealing: true,
      uvResistance: "Very Good",
      hydrophobic: true,
      warranty: "10 Years",
      glossFinish: true,
      antiYellowing: true,
      priceRange: "₹₹₹",
      rating: "4.5 ★",
    },
  },
  {
    id: "garware",
    name: "Garware Shield",
    origin: "India",
    tier: "Best Value",
    highlight: false,
    bestFor: "Indian Market",
    specs: {
      thickness: "7 mil",
      selfHealing: true,
      uvResistance: "Good",
      hydrophobic: false,
      warranty: "7 Years",
      glossFinish: true,
      antiYellowing: false,
      priceRange: "₹₹",
      rating: "4.0 ★",
    },
  },
];

export const ppfFeatures = [
  { key: "thickness", label: "Thickness", icon: "fa-solid fa-ruler" },
  {
    key: "selfHealing",
    label: "Self-Healing",
    icon: "fa-solid fa-heart-pulse",
  },
  { key: "uvResistance", label: "UV Resistance", icon: "fa-solid fa-sun" },
  { key: "hydrophobic", label: "Hydrophobic", icon: "fa-solid fa-droplet" },
  { key: "warranty", label: "Warranty", icon: "fa-solid fa-shield-halved" },
  { key: "glossFinish", label: "Gloss Finish", icon: "fa-solid fa-gem" },
  {
    key: "antiYellowing",
    label: "Anti-Yellowing",
    icon: "fa-solid fa-circle-check",
  },
  { key: "priceRange", label: "Price Range", icon: "fa-solid fa-tag" },
  { key: "rating", label: "Rating", icon: "fa-solid fa-star" },
];

// ─── Ceramic Brands ───────────────────────────────────────────────────────────
export const ceramicBrands = [
  {
    id: "ceramicpro",
    name: "Ceramic Pro 9H",
    origin: "USA",
    tier: "Industry Std",
    highlight: true,
    bestFor: "All Vehicles",
    specs: {
      hardness: "9H",
      layers: "Multiple",
      hydrophobic: "Extreme",
      uvProtection: true,
      chemResistance: "Excellent",
      glossEnhancement: "Very High",
      durability: "5+ Years",
      diyFriendly: false,
      priceRange: "₹₹₹₹",
      rating: "5.0 ★",
    },
  },
  {
    id: "gtechniq",
    name: "Gtechniq Crystal",
    origin: "UK",
    tier: "Pro Favourite",
    highlight: false,
    bestFor: "Luxury & Sports",
    specs: {
      hardness: "9H",
      layers: "Dual Layer",
      hydrophobic: "Extreme",
      uvProtection: true,
      chemResistance: "Excellent",
      glossEnhancement: "High",
      durability: "5+ Years",
      diyFriendly: false,
      priceRange: "₹₹₹₹",
      rating: "4.9 ★",
    },
  },
  {
    id: "igl",
    name: "IGL Kenzo",
    origin: "Malaysia",
    tier: "Eco Premium",
    highlight: false,
    bestFor: "Eco-Conscious",
    specs: {
      hardness: "9H",
      layers: "Single",
      hydrophobic: "High",
      uvProtection: true,
      chemResistance: "Very Good",
      glossEnhancement: "High",
      durability: "3–5 Years",
      diyFriendly: true,
      priceRange: "₹₹₹",
      rating: "4.5 ★",
    },
  },
  {
    id: "carpro",
    name: "CarPro Cquartz",
    origin: "Spain",
    tier: "Best Value Pro",
    highlight: false,
    bestFor: "DIY Enthusiasts",
    specs: {
      hardness: "9H",
      layers: "Single",
      hydrophobic: "High",
      uvProtection: true,
      chemResistance: "Good",
      glossEnhancement: "Medium",
      durability: "2–4 Years",
      diyFriendly: true,
      priceRange: "₹₹",
      rating: "4.2 ★",
    },
  },
  {
    id: "nanolex",
    name: "Nanolex Si3D",
    origin: "Germany",
    tier: "Engineered",
    highlight: false,
    bestFor: "Performance Cars",
    specs: {
      hardness: "9H",
      layers: "Single",
      hydrophobic: "Extreme",
      uvProtection: true,
      chemResistance: "Excellent",
      glossEnhancement: "Very High",
      durability: "4–6 Years",
      diyFriendly: false,
      priceRange: "₹₹₹₹",
      rating: "4.8 ★",
    },
  },
];

export const ceramicFeatures = [
  { key: "hardness", label: "Hardness", icon: "fa-solid fa-hammer" },
  { key: "layers", label: "Layers", icon: "fa-solid fa-layer-group" },
  { key: "hydrophobic", label: "Hydrophobic", icon: "fa-solid fa-droplet" },
  { key: "uvProtection", label: "UV Protection", icon: "fa-solid fa-sun" },
  {
    key: "chemResistance",
    label: "Chem. Resistance",
    icon: "fa-solid fa-flask",
  },
  {
    key: "glossEnhancement",
    label: "Gloss Enhancement",
    icon: "fa-solid fa-gem",
  },
  { key: "durability", label: "Durability", icon: "fa-solid fa-clock" },
  {
    key: "diyFriendly",
    label: "DIY Friendly",
    icon: "fa-solid fa-screwdriver-wrench",
  },
  { key: "priceRange", label: "Price Range", icon: "fa-solid fa-tag" },
  { key: "rating", label: "Rating", icon: "fa-solid fa-star" },
];

// ─── PPF Finishes for Visualiser ──────────────────────────────────────────────
export const ppfFinishes = [
  {
    id: "crystal-clear",
    name: "Crystal Clear",
    badge: "Most Popular",
    swatchStyle:
      "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(200,230,255,0.6) 50%, rgba(255,255,255,0.8) 100%)",
    cssFilter: "brightness(1.1) contrast(1.08) saturate(1.15)",
    aiPrompt:
      "Apply a crystal clear transparent Paint Protection Film (PPF) finish. The car keeps its original colour but gains an ultra-glossy, wet look with deep reflections and enhanced clarity.",
  },
  {
    id: "matte-black",
    name: "Matte Black",
    badge: "Trending",
    swatchStyle: "#1a1a1a",
    cssFilter: "brightness(0.28) saturate(0.1) contrast(1.1)",
    aiPrompt:
      "Apply a matte black Paint Protection Film finish. Flat, non-reflective, velvet-like matte black surface with zero gloss. Dramatic stealth appearance.",
  },
  {
    id: "matte-white",
    name: "Matte White",
    badge: null,
    swatchStyle:
      "linear-gradient(135deg, #e8e8e8 0%, #f5f5f5 50%, #e0e0e0 100%)",
    cssFilter: "brightness(2.1) saturate(0.05) contrast(0.75)",
    aiPrompt:
      "Apply a matte white Paint Protection Film finish. Chalky, flat white surface with no shine and soft diffused light — clean and minimal.",
  },
  {
    id: "gloss-black",
    name: "Gloss Black",
    badge: null,
    swatchStyle: "linear-gradient(135deg, #000 0%, #2a2a2a 40%, #000 100%)",
    cssFilter: "brightness(0.12) contrast(1.8) saturate(0.2)",
    aiPrompt:
      "Apply a deep gloss black Paint Protection Film finish. Mirror-like reflections, piano black shine, extremely high gloss surface.",
  },
  {
    id: "satin-grey",
    name: "Satin Grey",
    badge: null,
    swatchStyle:
      "linear-gradient(135deg, #5a5f6a 0%, #7a8090 50%, #5a5f6a 100%)",
    cssFilter: "saturate(0.15) brightness(0.72) contrast(1.05)",
    aiPrompt:
      "Apply a satin light grey Paint Protection Film. Mid-sheen finish between matte and gloss — subtle metallic grey with soft reflections.",
  },
  {
    id: "satin-blue",
    name: "Satin Blue",
    badge: null,
    swatchStyle:
      "linear-gradient(135deg, #0f2744 0%, #1e3a5f 50%, #0f2744 100%)",
    cssFilter: "hue-rotate(195deg) saturate(1.6) brightness(0.65)",
    aiPrompt:
      "Apply a deep navy satin blue Paint Protection Film. Rich midnight blue with a semi-gloss satin sheen.",
  },
  {
    id: "carbon-fibre",
    name: "Carbon Fibre",
    badge: "Premium",
    swatchStyle:
      "repeating-linear-gradient(45deg, #1a1a1a 0px, #1a1a1a 3px, #2d2d2d 3px, #2d2d2d 6px)",
    cssFilter: "brightness(0.35) contrast(1.4) saturate(0.3)",
    aiPrompt:
      "Apply a carbon fibre textured Paint Protection Film. Woven carbon fibre weave pattern in dark charcoal grey with light reflections on the weave.",
  },
  {
    id: "chrome-silver",
    name: "Chrome Silver",
    badge: null,
    swatchStyle:
      "linear-gradient(135deg, #c0c0c0 0%, #ffffff 25%, #a8a8a8 50%, #e8e8e8 75%, #b0b0b0 100%)",
    cssFilter: "saturate(0.05) brightness(1.5) contrast(1.35)",
    aiPrompt:
      "Apply a mirror chrome silver Paint Protection Film finish. Highly reflective liquid metal appearance with sharp mirror-like reflections.",
  },
  {
    id: "colour-shift",
    name: "Colour Shift",
    badge: "Exotic",
    swatchStyle:
      "conic-gradient(from 0deg, #8b5cf6, #3b82f6, #06b6d4, #10b981, #8b5cf6)",
    cssFilter: "hue-rotate(30deg) saturate(2.2) brightness(0.85)",
    aiPrompt:
      "Apply an iridescent colour-shift Paint Protection Film. The finish changes colour at different viewing angles — shifting from deep purple to electric blue to emerald green. Exotic and eye-catching.",
  },
  {
    id: "brushed-metal",
    name: "Brushed Metal",
    badge: null,
    swatchStyle:
      "repeating-linear-gradient(90deg, #7a7a7a 0px, #8a8a8a 1px, #7a7a7a 2px, #888 3px)",
    cssFilter: "saturate(0.12) brightness(0.88) contrast(1.1)",
    aiPrompt:
      "Apply a brushed aluminium metal Paint Protection Film. Linear brushed texture in silver-grey with directional light reflections.",
  },
];
