import { API_BASE, ADMIN_API_BASE } from "../../config/api";

export const adminAPI = {
  register: async (data) => {
    try {
      const response = await fetch(`${ADMIN_API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return response.json();
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  login: async (data) => {
    try {
      const response = await fetch(`${ADMIN_API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return response.json();
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  getProducts: async (page = 1, limit = 10, search = '') => {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`${ADMIN_API_BASE}/products?page=${page}&limit=${limit}&search=${search}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.json();
  },

  createProduct: async (data) => {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`${ADMIN_API_BASE}/products`, {
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
    const response = await fetch(`${ADMIN_API_BASE}/products/${id}`, {
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
    const response = await fetch(`${ADMIN_API_BASE}/products/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.json();
  },

  getBookings: async (page = 1, limit = 10, search = '', status = '') => {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`${ADMIN_API_BASE}/bookings?page=${page}&limit=${limit}&search=${search}&status=${status}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.json();
  },

  updateBookingStatus: async (id, status) => {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`${ADMIN_API_BASE}/bookings/${id}/status`, {
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
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`${ADMIN_API_BASE}/bookings/stats`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.json();
  },

  getOrders: async () => {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`${API_BASE}/orders`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.json();
  },

  updateOrderStatus: async (id, status) => {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`${API_BASE}/orders/${id}/status`, {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ status })
    });
    return response.json();
  }
};
