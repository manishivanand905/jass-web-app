const API_BASE = 'http://localhost:5000/api';

// Mock data for testing
const MOCK_USER = {
  email: 'user@test.com',
  password: 'User@123',
  name: 'Test User'
};

export const userAPI = {
  register: async (data) => {
    // Mock registration for testing
    return {
      success: true,
      user: { email: data.email, name: data.name },
      token: 'mock-user-token-' + Date.now()
    };
  },

  login: async (data) => {
    // Mock authentication for testing
    if (data.email === MOCK_USER.email && data.password === MOCK_USER.password) {
      return {
        success: true,
        user: { email: MOCK_USER.email, name: MOCK_USER.name },
        token: 'mock-user-token-' + Date.now()
      };
    }
    return { success: false, message: 'Invalid credentials' };
  },

  createBooking: async (data) => {
    // Mock booking creation for testing
    return {
      success: true,
      bookingRef: '#JA-2024-' + Math.floor(Math.random() * 9999).toString().padStart(4, '0')
    };
  },

  getBookings: async () => {
    const token = localStorage.getItem('userToken');
    const response = await fetch(`${API_BASE}/bookings/user`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.json();
  }
};
