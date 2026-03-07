import React, { useState, useEffect, useCallback } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout/AdminLayout';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  Container, Header, Title, HeaderActions, FilterChips, Chip, Table, TableHeader, TableBody, TableRow, TableCell,
  StatusBadge, ActionButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalTitle, CloseButton, DetailGrid,
  DetailItem, DetailLabel, DetailValue, ProductGrid, ProductCard, ProductImage, ProductInfo, Select, SubmitButton,
  EmptyState
} from './OrdersStyles';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState('');

  const fetchOrders = useCallback(async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const { data } = await axios.get(`${apiUrl}/api/orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const filtered = statusFilter ? data.orders.filter(o => o.status === statusFilter) : data.orders;
      setOrders(filtered);
    } catch (error) {
      toast.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const updateStatus = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      await axios.patch(`${apiUrl}/api/orders/${selectedOrder._id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` }}
      );
      toast.success('Status updated successfully');
      setSelectedOrder(null);
      fetchOrders();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const getStatusColor = (status) => {
    const colors = { pending: '#ff9800', confirmed: '#2196f3', processing: '#2196f3', completed: '#00c853', cancelled: '#f44336' };
    return colors[status] || '#999';
  };

  return (
    <AdminLayout>
      <Container>
        <Header>
          <Title>PRODUCT ORDERS</Title>
          <HeaderActions>
            <FilterChips>
              <Chip $active={statusFilter === ''} onClick={() => setStatusFilter('')}>All</Chip>
              <Chip $active={statusFilter === 'pending'} onClick={() => setStatusFilter('pending')}>Pending</Chip>
              <Chip $active={statusFilter === 'confirmed'} onClick={() => setStatusFilter('confirmed')}>Confirmed</Chip>
              <Chip $active={statusFilter === 'processing'} onClick={() => setStatusFilter('processing')}>Processing</Chip>
              <Chip $active={statusFilter === 'completed'} onClick={() => setStatusFilter('completed')}>Completed</Chip>
              <Chip $active={statusFilter === 'cancelled'} onClick={() => setStatusFilter('cancelled')}>Cancelled</Chip>
            </FilterChips>
          </HeaderActions>
        </Header>

        {loading ? (
          <EmptyState><i className="fas fa-spinner fa-spin"></i></EmptyState>
        ) : orders.length === 0 ? (
          <EmptyState>
            <i className="fas fa-shopping-cart"></i>
            <p>No orders found</p>
          </EmptyState>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Items</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Delivery</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map(order => (
                <TableRow key={order._id}>
                  <TableCell>{order.orderId}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>{order.items.length} items</TableCell>
                  <TableCell>₹{order.totalAmount.toLocaleString()}</TableCell>
                  <TableCell>{order.deliveryType}</TableCell>
                  <TableCell>
                    <StatusBadge $color={getStatusColor(order.status)}>{order.status}</StatusBadge>
                  </TableCell>
                  <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <ActionButton onClick={() => { setSelectedOrder(order); setNewStatus(order.status); }}>
                      <i className="fas fa-eye"></i>
                    </ActionButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {selectedOrder && (
          <>
            <ModalOverlay onClick={() => setSelectedOrder(null)} />
            <Modal>
              <ModalContent>
                <ModalHeader>
                  <ModalTitle>Order Details - {selectedOrder.orderId}</ModalTitle>
                  <CloseButton onClick={() => setSelectedOrder(null)}><i className="fas fa-times"></i></CloseButton>
                </ModalHeader>
                <DetailGrid>
                  <DetailItem>
                    <DetailLabel>Customer</DetailLabel>
                    <DetailValue>{selectedOrder.customerName}</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Email</DetailLabel>
                    <DetailValue>{selectedOrder.customerEmail}</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Phone</DetailLabel>
                    <DetailValue>{selectedOrder.customerPhone}</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Total Amount</DetailLabel>
                    <DetailValue>₹{selectedOrder.totalAmount.toLocaleString()}</DetailValue>
                  </DetailItem>
                </DetailGrid>
                <DetailLabel style={{ marginTop: '20px', marginBottom: '10px' }}>Products</DetailLabel>
                <ProductGrid>
                  {selectedOrder.items.map((item, index) => (
                    <ProductCard key={index}>
                      <ProductImage src={item.image} alt={item.name} />
                      <ProductInfo>
                        <strong>{item.name}</strong>
                        <p>Qty: {item.quantity} × ₹{item.price.toLocaleString()}</p>
                      </ProductInfo>
                    </ProductCard>
                  ))}
                </ProductGrid>
                {selectedOrder.deliveryAddress && (
                  <>
                    <DetailLabel style={{ marginTop: '20px', marginBottom: '10px' }}>Delivery Address</DetailLabel>
                    <DetailValue>
                      {selectedOrder.deliveryAddress.fullName}<br />
                      {selectedOrder.deliveryAddress.addressLine}<br />
                      {selectedOrder.deliveryAddress.city}, {selectedOrder.deliveryAddress.state} - {selectedOrder.deliveryAddress.pincode}<br />
                      Phone: {selectedOrder.deliveryAddress.phone}
                    </DetailValue>
                  </>
                )}
                <DetailGrid style={{ marginTop: '20px' }}>
                  <DetailItem>
                    <DetailLabel>Status</DetailLabel>
                    <Select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="processing">Processing</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </Select>
                  </DetailItem>
                </DetailGrid>
                <SubmitButton onClick={updateStatus}>Update Status</SubmitButton>
              </ModalContent>
            </Modal>
          </>
        )}
      </Container>
    </AdminLayout>
  );
};

export default Orders;
