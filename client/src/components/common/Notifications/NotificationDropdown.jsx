import React, { useState, useEffect, useRef } from 'react';
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
} from './NotificationStyles';

const NotificationDropdownComponent = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (user) {
      fetchNotifications();
      // Poll for new notifications every 30 seconds
      const interval = setInterval(fetchNotifications, 30000);
      return () => clearInterval(interval);
    }
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchNotifications = async () => {
    if (!user) return;
    
    try {
      const token = localStorage.getItem('userToken');
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const { data } = await axios.get(`${apiUrl}/api/notifications`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setNotifications(data.notifications);
      setUnreadCount(data.unreadCount);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      const token = localStorage.getItem('userToken');
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      await axios.put(`${apiUrl}/api/notifications/${notificationId}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      fetchNotifications();
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('userToken');
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      await axios.put(`${apiUrl}/api/notifications/read-all`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      fetchNotifications();
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
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

  const handleNotificationClick = (notification) => {
    if (!notification.isRead) {
      markAsRead(notification._id);
    }
  };

  if (!user) return null;

  return (
    <NotificationWrapper ref={dropdownRef}>
      <NotificationButton onClick={() => setIsOpen(!isOpen)}>
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
            <NotificationTitle>Notifications</NotificationTitle>
            {unreadCount > 0 && (
              <MarkAllButton onClick={markAllAsRead} disabled={loading}>
                {loading ? 'Marking...' : 'Mark all read'}
              </MarkAllButton>
            )}
          </NotificationHeader>

          <NotificationList>
            {notifications.length === 0 ? (
              <EmptyState>
                <i className="fas fa-bell-slash"></i>
                <p>No notifications yet</p>
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
                    <NotificationTitleText>
                      {notification.title}
                    </NotificationTitleText>
                    <NotificationMessage>
                      {notification.message}
                    </NotificationMessage>
                    <NotificationTime>
                      {formatTime(notification.createdAt)}
                    </NotificationTime>
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

export default NotificationDropdownComponent;