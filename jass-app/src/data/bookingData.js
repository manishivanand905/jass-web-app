export const dummyCustomers = [
  {
    phone: "9876543210",
    name: "Rajesh Mehta",
    email: "rajesh@email.com",
    vehicle: "BMW 5 Series",
    year: "2022",
    city: "Hyderabad",
    previousBookings: [
      { service: "Full Body PPF", type: "ppf", date: "Jan 2025" },
      { service: "Ceramic Pro", type: "ceramic", date: "Jun 2024" },
    ],
  },
  {
    phone: "9845001234",
    name: "Priya Sharma",
    email: "priya@email.com",
    vehicle: "Mercedes C-Class",
    year: "2023",
    city: "Delhi",
    previousBookings: [
      { service: "Ceramic Elite", type: "ceramic", date: "Nov 2025" },
    ],
  },
  {
    phone: "9900112233",
    name: "Arjun Kapoor",
    email: "arjun@email.com",
    vehicle: "Audi A4",
    year: "2021",
    city: "Bangalore",
    previousBookings: [
      { service: "Standard PPF", type: "ppf", date: "Aug 2025" },
      { service: "Ceramic Spray", type: "ceramic", date: "Mar 2025" },
    ],
  },
];

export const serviceTypes = [
  {
    id: "ppf",
    name: "Paint Protection Film",
    icon: "fa-solid fa-film",
    description: "Ultimate protection against scratches and chips",
  },
  {
    id: "ceramic",
    name: "Ceramic Coating",
    icon: "fa-solid fa-flask",
    description: "Long-lasting shine and hydrophobic protection",
  },
];

export const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
];