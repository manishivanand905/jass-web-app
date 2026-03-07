import styled from 'styled-components';

export const NotificationWrapper = styled.div`
  position: relative;
`;

export const NotificationButton = styled.button`
  position: relative;
  background: none;
  border: none;
  color: #ECECEC;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #C90000;
  }
`;

export const NotificationBadge = styled.span`
  position: absolute;
  top: -2px;
  right: -2px;
  background: #C90000;
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 0.7rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: pulse 2s infinite;
  
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
`;

export const NotificationDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  width: 380px;
  max-height: 500px;
  background: #1a1a1a;
  border: 1px solid #403D40;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  overflow: hidden;
  
  @media (max-width: 768px) {
    width: 320px;
    right: -20px;
  }
`;

export const NotificationHeader = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid #403D40;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #2a2a2a;
`;

export const NotificationTitle = styled.h3`
  color: #ECECEC;
  font-size: 1rem;
  font-weight: 700;
  margin: 0;
`;

export const MarkAllButton = styled.button`
  background: none;
  border: none;
  color: #C90000;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(201, 0, 0, 0.1);
  }
`;

export const NotificationList = styled.div`
  max-height: 400px;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #2a2a2a;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #C90000;
    border-radius: 3px;
  }
`;

export const NotificationItem = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  background: ${props => props.$isRead ? 'transparent' : 'rgba(201, 0, 0, 0.05)'};
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

export const NotificationIcon = styled.div`
  position: absolute;
  left: 20px;
  top: 16px;
  width: 40px;
  height: 40px;
  background: ${props => {
    switch(props.$type) {
      case 'new_product': return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
      case 'new_service': return 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
      case 'order_confirmation': return 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
      case 'booking_confirmation': return 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)';
      default: return 'linear-gradient(135deg, #C90000 0%, #860000 100%)';
    }
  }};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1rem;
`;

export const NotificationContent = styled.div`
  margin-left: 60px;
`;

export const NotificationTitleText = styled.h4`
  color: #ECECEC;
  font-size: 0.9rem;
  font-weight: 600;
  margin: 0 0 4px 0;
  line-height: 1.3;
`;

export const NotificationMessage = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.8rem;
  margin: 0 0 8px 0;
  line-height: 1.4;
`;

export const NotificationTime = styled.span`
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.7rem;
  font-weight: 500;
`;

export const UnreadIndicator = styled.div`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 8px;
  height: 8px;
  background: #C90000;
  border-radius: 50%;
  display: ${props => props.$isRead ? 'none' : 'block'};
`;

export const EmptyState = styled.div`
  padding: 40px 20px;
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  
  i {
    font-size: 2rem;
    margin-bottom: 12px;
    display: block;
  }
  
  p {
    margin: 0;
    font-size: 0.9rem;
  }
`;