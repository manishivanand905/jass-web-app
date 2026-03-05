import React, { useState, useEffect } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout/AdminLayout';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  Container, Header, Title, StatsGrid, StatCard, StatIcon, StatContent, StatNumber, StatLabel, StatSubtext,
  Section, SectionHeader, SectionTitle, ViewAllLink, TablesGrid, Table, TableHeader, TableBody, TableRow, TableCell,
  StatusBadge, EmptyState
} from './DashboardStyles';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const { data } = await axios.get(`${apiUrl}/api/admin/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(data);
    } catch (error) {
      toast.error('Failed to fetch stats');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#ff9800',
      confirmed: '#2196f3',
      processing: '#2196f3',
      completed: '#00c853',
      cancelled: '#f44336'
    };
    return colors[status] || '#999';
  };

  if (loading) return <AdminLayout><Container><EmptyState><i className="fas fa-spinner fa-spin"></i></EmptyState></Container></AdminLayout>;

  return (
    <AdminLayout>
      <Container>
        <Header>
          <Title>OVERVIEW</Title>
        </Header>

        <StatsGrid>
          <StatCard>
            <StatIcon><i className="fas fa-box"></i></StatIcon>
            <StatContent>
              <StatNumber>{stats?.stats.totalProducts || 0}</StatNumber>
              <StatLabel>Total Products</StatLabel>
              <StatSubtext>{stats?.stats.productsThisMonth || 0} added this month</StatSubtext>
            </StatContent>
          </StatCard>

          <StatCard>
            <StatIcon><i className="fas fa-tools"></i></StatIcon>
            <StatContent>
              <StatNumber>{stats?.stats.totalServices || 0}</StatNumber>
              <StatLabel>Total Services</StatLabel>
            </StatContent>
          </StatCard>

          <StatCard>
            <StatIcon><i className="fas fa-calendar-check"></i></StatIcon>
            <StatContent>
              <StatNumber>{stats?.stats.totalBookings || 0}</StatNumber>
              <StatLabel>Total Bookings</StatLabel>
              <StatSubtext>{stats?.stats.bookingsThisWeek || 0} this week</StatSubtext>
            </StatContent>
          </StatCard>

          <StatCard>
            <StatIcon><i className="fas fa-shopping-cart"></i></StatIcon>
            <StatContent>
              <StatNumber>{stats?.stats.totalOrders || 0}</StatNumber>
              <StatLabel>Total Orders</StatLabel>
              <StatSubtext>{stats?.stats.ordersThisMonth || 0} this month</StatSubtext>
            </StatContent>
          </StatCard>

          <StatCard $highlight>
            <StatIcon><i className="fas fa-rupee-sign"></i></StatIcon>
            <StatContent>
              <StatNumber>₹{(stats?.stats.totalRevenue || 0).toLocaleString()}</StatNumber>
              <StatLabel>Total Revenue</StatLabel>
              <StatSubtext>₹{(stats?.stats.revenueThisMonth || 0).toLocaleString()} this month</StatSubtext>
            </StatContent>
          </StatCard>

          <StatCard $alert>
            <StatIcon><i className="fas fa-exclamation-circle"></i></StatIcon>
            <StatContent>
              <StatNumber>{stats?.stats.pendingBookings || 0}</StatNumber>
              <StatLabel>Pending Bookings</StatLabel>
              <StatSubtext>Requires attention</StatSubtext>
            </StatContent>
          </StatCard>
        </StatsGrid>

        <Section>
          <SectionHeader>
            <SectionTitle>Recent Activity</SectionTitle>
          </SectionHeader>
          <TablesGrid>
            <div>
              <SectionHeader>
                <SectionTitle style={{ fontSize: '1.2rem' }}>Recent Bookings</SectionTitle>
                <ViewAllLink onClick={() => window.location.href = '/admin/bookings'}>View All →</ViewAllLink>
              </SectionHeader>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell>Service</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stats?.recentBookings?.slice(0, 5).map(booking => (
                    <TableRow key={booking._id}>
                      <TableCell>{booking.bookingId}</TableCell>
                      <TableCell>{booking.customerName}</TableCell>
                      <TableCell>{booking.servicePackage}</TableCell>
                      <TableCell>{new Date(booking.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <StatusBadge $color={getStatusColor(booking.status)}>{booking.status}</StatusBadge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div>
              <SectionHeader>
                <SectionTitle style={{ fontSize: '1.2rem' }}>Recent Orders</SectionTitle>
                <ViewAllLink onClick={() => window.location.href = '/admin/orders'}>View All →</ViewAllLink>
              </SectionHeader>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableCell>Order ID</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stats?.recentOrders?.slice(0, 5).map(order => (
                    <TableRow key={order._id}>
                      <TableCell>{order.orderId}</TableCell>
                      <TableCell>{order.customerName}</TableCell>
                      <TableCell>₹{order.totalAmount.toLocaleString()}</TableCell>
                      <TableCell>
                        <StatusBadge $color={getStatusColor(order.status)}>{order.status}</StatusBadge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TablesGrid>
        </Section>
      </Container>
    </AdminLayout>
  );
};

export default Dashboard;
