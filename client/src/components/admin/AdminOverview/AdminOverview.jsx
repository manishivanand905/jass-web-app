import React from 'react';
import PropTypes from 'prop-types';
import { adminStats, recentBookings, serviceBreakdown, recentProducts, revenueData } from '../../../data/adminData';
import {
  StatsGrid,
  StatCard,
  StatIcon,
  StatInfo,
  StatValue,
  StatLabel,
  StatTrend,
  TwoColumnSection,
  Card,
  CardHeader,
  CardTitle,
  ViewAllLink,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  StatusPill,
  ServiceBar,
  ServiceBarHeader,
  ServiceName,
  ServicePercentage,
  ServiceBarTrack,
  ServiceBarFill,
  ServiceCount,
  ProductItem,
  ProductImage,
  ProductInfo,
  ProductName,
  ProductTag,
  ProductPrice,
  RevenueChartCard,
  ChartContainer,
  ChartBar,
  ChartTooltip,
  ChartLabels,
  ChartLabel
} from './AdminOverviewStyles';

const AdminOverview = ({ onTabChange }) => {
  const maxRevenue = Math.max(...revenueData.map(d => d.amount));

  return (
    <>
      <StatsGrid>
        <StatCard>
          <StatIcon>
            <i className="fa-solid fa-box-open" />
          </StatIcon>
          <StatInfo>
            <StatValue>{adminStats.totalProducts}</StatValue>
            <StatLabel>Total Products</StatLabel>
            <StatTrend $color="#27ae60">
              <i className="fa-solid fa-arrow-up" />
              {adminStats.addedThisMonth} added this month
            </StatTrend>
          </StatInfo>
        </StatCard>

        <StatCard>
          <StatIcon>
            <i className="fa-solid fa-calendar-check" />
          </StatIcon>
          <StatInfo>
            <StatValue>{adminStats.totalBookings}</StatValue>
            <StatLabel>Total Bookings</StatLabel>
            <StatTrend $color="#27ae60">
              <i className="fa-solid fa-arrow-up" />
              {adminStats.bookingsThisWeek} this week
            </StatTrend>
          </StatInfo>
        </StatCard>

        <StatCard $accent="#e67e22">
          <StatIcon $bg="#e67e22">
            <i className="fa-solid fa-clock" />
          </StatIcon>
          <StatInfo>
            <StatValue>{adminStats.pendingBookings}</StatValue>
            <StatLabel>Pending Bookings</StatLabel>
            <StatTrend $color="#e67e22">
              <i className="fa-solid fa-exclamation" />
              Requires attention
            </StatTrend>
          </StatInfo>
        </StatCard>

        <StatCard>
          <StatIcon>
            <i className="fa-solid fa-indian-rupee-sign" />
          </StatIcon>
          <StatInfo>
            <StatValue>₹{(adminStats.totalRevenue / 1000).toFixed(0)}K</StatValue>
            <StatLabel>Total Revenue</StatLabel>
            <StatTrend $color="#27ae60">
              <i className="fa-solid fa-arrow-up" />
              ₹{(adminStats.revenueThisMonth / 1000).toFixed(0)}K this month
            </StatTrend>
          </StatInfo>
        </StatCard>
      </StatsGrid>

      <TwoColumnSection>
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
            <ViewAllLink onClick={() => onTabChange('bookings')}>
              View All →
            </ViewAllLink>
          </CardHeader>

          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>#</TableHeader>
                <TableHeader>Customer</TableHeader>
                <TableHeader>Service</TableHeader>
                <TableHeader>Date</TableHeader>
                <TableHeader>Status</TableHeader>
              </TableRow>
            </TableHead>
            <tbody>
              {recentBookings.map(booking => (
                <TableRow key={booking.id}>
                  <TableCell>{booking.id}</TableCell>
                  <TableCell>{booking.customer}</TableCell>
                  <TableCell>{booking.service}</TableCell>
                  <TableCell>{new Date(booking.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</TableCell>
                  <TableCell>
                    <StatusPill $status={booking.status}>
                      {booking.status}
                    </StatusPill>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </Card>

        <div>
          <Card style={{ marginBottom: '24px' }}>
            <CardHeader>
              <CardTitle>Service Breakdown</CardTitle>
            </CardHeader>

            {serviceBreakdown.map(service => (
              <ServiceBar key={service.name}>
                <ServiceBarHeader>
                  <ServiceName>{service.name}</ServiceName>
                  <ServicePercentage>{service.percentage}%</ServicePercentage>
                </ServiceBarHeader>
                <ServiceBarTrack>
                  <ServiceBarFill $percentage={service.percentage} />
                </ServiceBarTrack>
                <ServiceCount>{service.count} bookings</ServiceCount>
              </ServiceBar>
            ))}
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recently Added</CardTitle>
            </CardHeader>

            {recentProducts.map(product => (
              <ProductItem key={product.id}>
                <ProductImage src={product.image} alt={product.name} />
                <ProductInfo>
                  <ProductName>{product.name}</ProductName>
                  <ProductTag>{product.category}</ProductTag>
                </ProductInfo>
                <ProductPrice>₹{product.price.toLocaleString()}</ProductPrice>
              </ProductItem>
            ))}
          </Card>
        </div>
      </TwoColumnSection>

      <RevenueChartCard>
        <CardHeader>
          <CardTitle>Revenue Overview</CardTitle>
          <span style={{ fontFamily: 'Cormorant Garamond', fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)' }}>
            Jan 2026
          </span>
        </CardHeader>

        <ChartContainer>
          {revenueData.map(data => (
            <ChartBar key={data.month} $height={(data.amount / maxRevenue) * 100}>
              <ChartTooltip>₹{(data.amount / 1000).toFixed(0)}K</ChartTooltip>
            </ChartBar>
          ))}
        </ChartContainer>

        <ChartLabels>
          {revenueData.map(data => (
            <ChartLabel key={data.month}>{data.month}</ChartLabel>
          ))}
        </ChartLabels>
      </RevenueChartCard>
    </>
  );
};

AdminOverview.propTypes = {
  onTabChange: PropTypes.func.isRequired
};

export default AdminOverview;
