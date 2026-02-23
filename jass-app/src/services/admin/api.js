const API_BASE = 'http://localhost:5000/api/admin';

// Mock data for testing
const MOCK_ADMIN = {
  email: 'admin@jassautomotives.com',
  password: 'Admin@123',
  name: 'Admin User'
};

export const adminAPI = {
  login: async (data) => {
    // Mock authentication for testing
    if (data.email === MOCK_ADMIN.email && data.password === MOCK_ADMIN.password) {
      return {
        success: true,
        admin: { email: MOCK_ADMIN.email, name: MOCK_ADMIN.name },
        token: 'mock-admin-token-' + Date.now()
      };
    }
    return { success: false, message: 'Invalid credentials' };
  },

  getProducts: async (page = 1, limit = 10, search = '') => {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`${API_BASE}/products?page=${page}&limit=${limit}&search=${search}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.json();
  },

  createProduct: async (data) => {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`${API_BASE}/products`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    return response.json();
  },

  updateProduct: async (id, data) => {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`${API_BASE}/products/${id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    return response.json();
  },

  deleteProduct: async (id) => {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`${API_BASE}/products/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.json();
  },

  getBookings: async (page = 1, limit = 10, search = '', status = '') => {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`${API_BASE}/bookings?page=${page}&limit=${limit}&search=${search}&status=${status}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.json();
  },

  updateBookingStatus: async (id, status) => {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`${API_BASE}/bookings/${id}/status`, {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ status })
    });
    return response.json();
  },

  getStats: async () => {
    // Mock stats for testing
    return {
      success: true,
      stats: {
        totalProducts: 24,
        totalBookings: 156,
        pendingBookings: 12,
        totalRevenue: 45600
      }
    };
  }
};
