import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';
import {
  NotificationWrapper,
  NotificationButton,
  NotificationBadge,
  NotificationDropdown,
  NotificationHeader,
  NotificationTitle,
  MarkAllButton,
  NotificationList,
  NotificationItem,
  NotificationIcon,
  NotificationContent,
  NotificationTitleText,
  NotificationMessage,
  NotificationTime,
  UnreadIndicator,
  EmptyState
} from '../../common/Notifications/NotificationStyles';

const AdminNotificationDropdown = () => {
  const { admin } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchNotifications = useCallback(async () => {
    if (!admin) return;

    try {
      const token = localStorage.getItem('adminToken');
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const { data } = await axios.get(`${apiUrl}/api/notifications/admin`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setNotifications(data.notifications || []);
      setUnreadCount(data.unreadCount || 0);
    } catch (error) {
      console.error('Failed to fetch admin notifications:', error);
    }
  }, [admin]);

  useEffect(() => {
    if (!admin) return undefined;

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 15000);
    return () => clearInterval(interval);
  }, [admin, fetchNotifications]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAsRead = useCallback(async (notificationId) => {
    try {
      const token = localStorage.getItem('adminToken');
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      await axios.put(`${apiUrl}/api/notifications/${notificationId}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      await fetchNotifications();
    } catch (error) {
      console.error('Failed to mark admin notification as read:', error);
    }
  }, [fetchNotifications]);

  const markAllAsRead = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      await axios.put(`${apiUrl}/api/notifications/read-all`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      await fetchNotifications();
    } catch (error) {
      console.error('Failed to mark all admin notifications as read:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (date) => {
    const now = new Date();
    const notificationDate = new Date(date);
    const diffInMinutes = Math.floor((now - notificationDate) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const getNavigationPath = (notification) => {
    if (notification.relatedModel === 'Booking' || notification.type === 'new_booking') {
      return '/admin/bookings';
    }

    if (notification.relatedModel === 'Order' || notification.type === 'new_order') {
      return '/admin/orders';
    }

    if (notification.relatedModel === 'Contact' || notification.type === 'new_contact') {
      return '/admin/contacts';
    }

    return '/admin/dashboard';
  };

  const handleNotificationClick = async (notification) => {
    if (!notification.isRead) {
      await markAsRead(notification._id);
    }

    setIsOpen(false);
    navigate(getNavigationPath(notification));
  };

  if (!admin) return null;

  return (
    <NotificationWrapper ref={dropdownRef}>
      <NotificationButton
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Admin notifications"
        title="Admin notifications"
      >
        <i className="fas fa-bell"></i>
        {unreadCount > 0 && (
          <NotificationBadge>
            {unreadCount > 99 ? '99+' : unreadCount}
          </NotificationBadge>
        )}
      </NotificationButton>

      {isOpen && (
        <NotificationDropdown>
          <NotificationHeader>
            <NotificationTitle>Admin Alerts</NotificationTitle>
            {unreadCount > 0 && (
              <MarkAllButton type="button" onClick={markAllAsRead} disabled={loading}>
                {loading ? 'Marking...' : 'Mark all read'}
              </MarkAllButton>
            )}
          </NotificationHeader>

          <NotificationList>
            {notifications.length === 0 ? (
              <EmptyState>
                <i className="fas fa-bell-slash"></i>
                <p>No new order or booking alerts</p>
              </EmptyState>
            ) : (
              notifications.map((notification) => (
                <NotificationItem
                  key={notification._id}
                  $isRead={notification.isRead}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <NotificationIcon $type={notification.type}>
                    <i className={notification.icon}></i>
                  </NotificationIcon>

                  <NotificationContent>
                    <NotificationTitleText>{notification.title}</NotificationTitleText>
                    <NotificationMessage>{notification.message}</NotificationMessage>
                    <NotificationTime>{formatTime(notification.createdAt)}</NotificationTime>
                  </NotificationContent>

                  <UnreadIndicator $isRead={notification.isRead} />
                </NotificationItem>
              ))
            )}
          </NotificationList>
        </NotificationDropdown>
      )}
    </NotificationWrapper>
  );
};

export default AdminNotificationDropdown;
