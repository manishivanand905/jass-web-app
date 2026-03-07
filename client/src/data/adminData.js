export const adminStats = {
  totalProducts: 24,
  totalBookings: 156,
  totalRevenue: 456000,
  pendingBookings: 12,
  addedThisMonth: 4,
  bookingsThisWeek: 12,
  revenueThisMonth: 48000
};

export const recentBookings = [
  { id: '001', ref: '#JA-2026-0142', customer: 'Rajesh Mehta', phone: '+91 98765 43210', email: 'rajesh@email.com', service: 'Full Body PPF', tier: 'Complete Coverage', price: 24999, date: '2026-01-21', time: '3:00 PM', vehicle: 'BMW 5 Series', year: 2022, city: 'Hyderabad', status: 'pending' },
  { id: '002', ref: '#JA-2026-0141', customer: 'Priya Sharma', phone: '+91 98765 43211', email: 'priya@email.com', service: 'Ceramic Pro', tier: 'Premium', price: 18999, date: '2026-01-20', time: '11:00 AM', vehicle: 'Audi Q7', year: 2023, city: 'Mumbai', status: 'confirmed' },
  { id: '003', ref: '#JA-2026-0140', customer: 'Arjun Kapoor', phone: '+91 98765 43212', email: 'arjun@email.com', service: 'Basic PPF', tier: 'Front Coverage', price: 12999, date: '2026-01-19', time: '2:00 PM', vehicle: 'Mercedes C-Class', year: 2021, city: 'Delhi', status: 'completed' },
  { id: '004', ref: '#JA-2026-0139', customer: 'Sneha Patel', phone: '+91 98765 43213', email: 'sneha@email.com', service: 'Ceramic Spray', tier: 'Basic', price: 8999, date: '2026-01-18', time: '10:00 AM', vehicle: 'Honda City', year: 2020, city: 'Bangalore', status: 'cancelled' }
];

export const serviceBreakdown = [
  { name: 'PPF Basic', count: 48, percentage: 34, color: '#cc0000' },
  { name: 'Standard PPF', count: 39, percentage: 28, color: '#cc0000' },
  { name: 'Full Body PPF', count: 25, percentage: 18, color: '#cc0000' },
  { name: 'Ceramic', count: 28, percentage: 20, color: '#cc0000' }
];

export const recentProducts = [
  { id: 1, name: 'Premium PPF Roll', category: 'PPF', price: 12999, image: 'https://via.placeholder.com/40' },
  { id: 2, name: 'Ceramic Pro Coating', category: 'Ceramic', price: 8999, image: 'https://via.placeholder.com/40' },
  { id: 3, name: 'Ceramic Spray Shield', category: 'Ceramic', price: 3499, image: 'https://via.placeholder.com/40' }
];

export const revenueData = [
  { month: 'Jan', amount: 48000 },
  { month: 'Feb', amount: 52000 },
  { month: 'Mar', amount: 45000 },
  { month: 'Apr', amount: 58000 },
  { month: 'May', amount: 62000 },
  { month: 'Jun', amount: 55000 },
  { month: 'Jul', amount: 48000 },
  { month: 'Aug', amount: 51000 },
  { month: 'Sep', amount: 59000 },
  { month: 'Oct', amount: 64000 },
  { month: 'Nov', amount: 58000 },
  { month: 'Dec', amount: 62000 }
];
