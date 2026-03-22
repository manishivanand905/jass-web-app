import { API_BASE } from "../../config/api";

export const userAPI = {
  register: async (data) => {
    try {
      const response = await fetch(`${API_BASE}/auth/register`, {
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
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return response.json();
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  requestPasswordResetOtp: async (data) => {
    try {
      const response = await fetch(`${API_BASE}/auth/forgot-password/request-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return response.json();
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  verifyPasswordResetOtp: async (data) => {
    try {
      const response = await fetch(`${API_BASE}/auth/forgot-password/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return response.json();
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  resetPasswordWithOtp: async (data) => {
    try {
      const response = await fetch(`${API_BASE}/auth/forgot-password/reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return response.json();
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  createBooking: async (data) => {
    try {
      const response = await fetch(`${API_BASE}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return response.json();
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  createOrder: async (data) => {
    const token = localStorage.getItem('userToken');
    try {
      const response = await fetch(`${API_BASE}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(data)
      });
      return response.json();
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  getMe: async () => {
    const token = localStorage.getItem('userToken');
    try {
      const response = await fetch(`${API_BASE}/auth/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      return response.json();
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  addAddress: async (data) => {
    const token = localStorage.getItem('userToken');
    try {
      const response = await fetch(`${API_BASE}/auth/addresses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(data)
      });
      return response.json();
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  getBookingById: async (id) => {
    try {
      const response = await fetch(`${API_BASE}/bookings/${id}`);
      return response.json();
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  getBookings: async () => {
    const token = localStorage.getItem('userToken');
    const response = await fetch(`${API_BASE}/bookings/user`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.json();
  },

  getServices: async () => {
    try {
      const response = await fetch(`${API_BASE}/services`);
      return response.json();
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  getServiceById: async (id) => {
    try {
      const response = await fetch(`${API_BASE}/services/${id}`);
      return response.json();
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  getPackageById: async (serviceId, packageId) => {
    try {
      const response = await fetch(`${API_BASE}/services/${serviceId}/packages/${packageId}`);
      return response.json();
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  getCart: async () => {
    const token = localStorage.getItem('userToken');
    try {
      const response = await fetch(`${API_BASE}/cart`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      return response.json();
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  addToCart: async (data) => {
    const token = localStorage.getItem('userToken');
    try {
      const response = await fetch(`${API_BASE}/cart/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(data)
      });
      return response.json();
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  updateCartItem: async (data) => {
    const token = localStorage.getItem('userToken');
    const response = await fetch(`${API_BASE}/cart/update`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(data)
    });
    return response.json();
  },

  removeFromCart: async (productId) => {
    const token = localStorage.getItem('userToken');
    const response = await fetch(`${API_BASE}/cart/remove/${productId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.json();
  },

  clearCart: async () => {
    const token = localStorage.getItem('userToken');
    const response = await fetch(`${API_BASE}/cart/clear`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.json();
  },

  getUserOrders: async () => {
    const token = localStorage.getItem('userToken');
    try {
      const response = await fetch(`${API_BASE}/orders/user`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      return response.json();
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
};

export const getUserBookings = async () => {
  const token = localStorage.getItem('userToken');
  const response = await fetch(`${API_BASE}/bookings/user`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const data = await response.json();
  return data.bookings || [];
};
