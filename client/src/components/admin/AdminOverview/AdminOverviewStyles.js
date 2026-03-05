import styled from 'styled-components';

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin-bottom: 20px;
  }
`;

export const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-top: 3px solid ${props => props.$accent || '#cc0000'};
  border-radius: 8px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 20px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(204, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    padding: 16px;
    gap: 12px;
  }
`;

export const StatIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${props => props.$bg || '#cc0000'};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  i {
    font-size: 22px;
    color: #fff;
  }
`;

export const StatInfo = styled.div`
  flex: 1;
`;

export const StatValue = styled.h3`
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 2.8rem;
  font-weight: 900;
  color: #fff;
  margin: 0 0 4px 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

export const StatLabel = styled.p`
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: rgba(255, 255, 255, 0.5);
  margin: 0 0 8px 0;

  @media (max-width: 768px) {
    font-size: 0.6rem;
  }
`;

export const StatTrend = styled.div`
  padding-top: 8px;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
  font-family: 'Cormorant Garamond', serif;
  font-size: 0.8rem;
  color: ${props => props.$color || 'rgba(255,255,255,0.6)'};
  display: flex;
  align-items: center;
  gap: 6px;

  i {
    font-size: 12px;
  }
`;

export const TwoColumnSection = styled.div`
  display: grid;
  grid-template-columns: 60% 40%;
  gap: 24px;
  margin-bottom: 40px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 768px) {
    gap: 12px;
    margin-bottom: 20px;
  }
`;

export const Card = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 8px;
  padding: 24px;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const CardTitle = styled.h3`
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: #cc0000;
  margin: 0;
`;

export const ViewAllLink = styled.button`
  background: none;
  border: none;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  color: #cc0000;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #ff0000;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHead = styled.thead`
  background: rgba(204, 0, 0, 0.06);
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  transition: background 0.3s ease;

  &:hover {
    background: rgba(204, 0, 0, 0.04);
  }
`;

export const TableHeader = styled.th`
  padding: 12px;
  text-align: left;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: rgba(255, 255, 255, 0.5);

  @media (max-width: 768px) {
    padding: 8px;
    font-size: 0.6rem;
  }
`;

export const TableCell = styled.td`
  padding: 12px;
  font-family: 'Cormorant Garamond', serif;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);

  @media (max-width: 768px) {
    padding: 8px;
    font-size: 0.75rem;
  }
`;

export const StatusPill = styled.span`
  padding: 4px 10px;
  border-radius: 4px;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: ${props => {
    switch(props.$status) {
      case 'pending': return 'rgba(230, 126, 34, 0.15)';
      case 'confirmed': return 'rgba(52, 152, 219, 0.15)';
      case 'completed': return 'rgba(39, 174, 96, 0.15)';
      case 'cancelled': return 'rgba(204, 0, 0, 0.15)';
      default: return 'rgba(255, 255, 255, 0.1)';
    }
  }};
  border: 1px solid ${props => {
    switch(props.$status) {
      case 'pending': return '#e67e22';
      case 'confirmed': return '#3498db';
      case 'completed': return '#27ae60';
      case 'cancelled': return '#cc0000';
      default: return 'rgba(255, 255, 255, 0.2)';
    }
  }};
  color: ${props => {
    switch(props.$status) {
      case 'pending': return '#e67e22';
      case 'confirmed': return '#3498db';
      case 'completed': return '#27ae60';
      case 'cancelled': return '#cc0000';
      default: return 'rgba(255, 255, 255, 0.6)';
    }
  }};
`;

export const ServiceBar = styled.div`
  margin-bottom: 16px;

  @media (max-width: 768px) {
    margin-bottom: 12px;
  }
`;

export const ServiceBarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
`;

export const ServiceName = styled.span`
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
`;

export const ServicePercentage = styled.span`
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  color: #fff;
`;

export const ServiceBarTrack = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 4px;
`;

export const ServiceBarFill = styled.div`
  height: 100%;
  width: ${props => props.$percentage}%;
  background: #cc0000;
  border-radius: 2px;
  transition: width 0.6s ease;
`;

export const ServiceCount = styled.span`
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.4);
`;

export const ProductItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    gap: 8px;
    padding: 8px 0;
  }
`;

export const ProductImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 4px;
  object-fit: cover;

  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
  }
`;

export const ProductInfo = styled.div`
  flex: 1;
`;

export const ProductName = styled.div`
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 2px;

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

export const ProductTag = styled.span`
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.65rem;
  padding: 2px 8px;
  border-radius: 3px;
  background: rgba(204, 0, 0, 0.1);
  color: #cc0000;
`;

export const ProductPrice = styled.div`
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.6);

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

export const RevenueChartCard = styled(Card)`
  margin-bottom: 0;
`;

export const ChartContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  height: 200px;
  gap: 8px;
  padding: 20px 0;

  @media (max-width: 768px) {
    height: 150px;
    gap: 4px;
    padding: 15px 0;
  }
`;

export const ChartBar = styled.div`
  flex: 1;
  height: ${props => props.$height}%;
  background: #cc0000;
  border-radius: 4px 4px 0 0;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #ff0000;
    transform: translateY(-4px);
  }
`;

export const ChartTooltip = styled.div`
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: #0d0d0d;
  color: #fff;
  padding: 6px 12px;
  border-radius: 4px;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.8rem;
  font-weight: 700;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
  margin-bottom: 8px;

  ${ChartBar}:hover & {
    opacity: 1;
  }

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 6px solid transparent;
    border-top-color: #0d0d0d;
  }
`;

export const ChartLabels = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
`;

export const ChartLabel = styled.span`
  flex: 1;
  text-align: center;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.4);

  @media (max-width: 768px) {
    font-size: 0.6rem;
  }
`;
