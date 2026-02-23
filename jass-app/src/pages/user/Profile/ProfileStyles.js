import styled from 'styled-components';

export const ProfileWrapper = styled.div`
  min-height: calc(100vh - 70px);
  background: #0a0a0a;
  padding: 40px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ProfileCard = styled.div`
  background: linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%);
  border: 1px solid rgba(204, 0, 0, 0.3);
  border-radius: 20px;
  padding: 40px;
  max-width: 500px;
  width: 100%;
  text-align: center;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
`;

export const Avatar = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, #cc0000 0%, #ff0000 100%);
  color: white;
  font-size: 40px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  border: 3px solid rgba(204, 0, 0, 0.3);
`;

export const UserName = styled.h2`
  font-family: 'Barlow Condensed', Arial, sans-serif;
  font-size: 28px;
  color: white;
  margin-bottom: 5px;
  letter-spacing: 1px;
`;

export const UserEmail = styled.p`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 30px;
`;

export const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 30px;
`;

export const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

export const Label = styled.span`
  font-family: 'Barlow Condensed', Arial, sans-serif;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  gap: 8px;

  i {
    color: #cc0000;
  }
`;

export const Value = styled.span`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 16px;
  color: white;
  font-weight: 500;
`;
