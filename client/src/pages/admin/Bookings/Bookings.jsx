import React, { useState, useEffect, useCallback } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout/AdminLayout';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  Container, Header, Title, HeaderActions, SearchBar, FilterChips, Chip, Table, TableHeader, TableBody, TableRow,
  TableCell, StatusBadge, ActionButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalTitle, CloseButton,
  DetailGrid, DetailItem, DetailLabel, DetailValue, Select, SubmitButton, EmptyState, Pagination, PageButton
} from './BookingsStyles';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [newStatus, setNewStatus] = useState('');

  const fetchBookings = useCallback(async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const { data } = await axios.get(`${apiUrl}/api/bookings`, {
        params: { page, limit: 10, search, status: statusFilter },
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(data.bookings);
      setTotalPages(data.totalPages);
    } catch (error) {
      toast.error('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  }, [page, search, statusFilter]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const updateStatus = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      await axios.patch(`${apiUrl}/api/bookings/${selectedBooking._id}/status`, 
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` }}
      );
      toast.success('Status updated successfully');
      setSelectedBooking(null);
      fetchBookings();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const getStatusColor = (status) => {
    const colors = { pending: '#ff9800', confirmed: '#2196f3', 'in-progress': '#2196f3', completed: '#00c853', cancelled: '#f44336' };
    return colors[status] || '#999';
  };

  const getPickupLabel = (option) => {
    return option === 'pickup' ? 'Pick up from Home' : 'Drop at Store';
  };

  const getPickupCharge = (option) => {
    return option === 'pickup' ? 499 : 0;
  };

  return (
    <AdminLayout>
      <Container>
        <Header>
          <Title>SERVICE BOOKINGS</Title>
          <HeaderActions>
            <SearchBar
              type="text"
              placeholder="Search bookings..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </HeaderActions>
        </Header>

        <FilterChips>
          <Chip $active={statusFilter === ''} onClick={() => setStatusFilter('')}>All</Chip>
          <Chip $active={statusFilter === 'pending'} onClick={() => setStatusFilter('pending')}>Pending</Chip>
          <Chip $active={statusFilter === 'confirmed'} onClick={() => setStatusFilter('confirmed')}>Confirmed</Chip>
          <Chip $active={statusFilter === 'in-progress'} onClick={() => setStatusFilter('in-progress')}>In Progress</Chip>
          <Chip $active={statusFilter === 'completed'} onClick={() => setStatusFilter('completed')}>Completed</Chip>
          <Chip $active={statusFilter === 'cancelled'} onClick={() => setStatusFilter('cancelled')}>Cancelled</Chip>
        </FilterChips>

        {loading ? (
          <EmptyState><i className="fas fa-spinner fa-spin"></i></EmptyState>
        ) : bookings.length === 0 ? (
          <EmptyState>
            <i className="fas fa-calendar-times"></i>
            <p>No bookings found</p>
          </EmptyState>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell>Booking ID</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Service Type</TableCell>
                  <TableCell>Plan</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map(booking => (
                  <TableRow key={booking._id}>
                    <TableCell data-label="Booking ID">{booking.bookingId}</TableCell>
                    <TableCell data-label="Customer">{booking.customerName}</TableCell>
                    <TableCell data-label="Phone">{booking.customerPhone}</TableCell>
                    <TableCell data-label="Service Type">{booking.service || 'N/A'}</TableCell>
                    <TableCell data-label="Plan">{booking.serviceTier || 'N/A'}</TableCell>
                    <TableCell data-label="Date">{new Date(booking.date).toLocaleDateString()}</TableCell>
                    <TableCell data-label="Time">{booking.timeSlot}</TableCell>
                    <TableCell data-label="Status">
                      <StatusBadge $color={getStatusColor(booking.status)}>{booking.status}</StatusBadge>
                    </TableCell>
                    <TableCell data-label="Actions">
                      <ActionButton onClick={() => { setSelectedBooking(booking); setNewStatus(booking.status); }}>
                        <i className="fas fa-eye"></i>
                      </ActionButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Pagination>
              {Array.from({ length: totalPages }, (_, i) => (
                <PageButton key={i + 1} $active={page === i + 1} onClick={() => setPage(i + 1)}>
                  {i + 1}
                </PageButton>
              ))}
            </Pagination>
          </>
        )}

        {selectedBooking && (
          <>
            <ModalOverlay onClick={() => setSelectedBooking(null)} />
            <Modal>
              <ModalContent>
                <ModalHeader>
                  <ModalTitle>Booking Details</ModalTitle>
                  <CloseButton onClick={() => setSelectedBooking(null)}><i className="fas fa-times"></i></CloseButton>
                </ModalHeader>
                <DetailGrid>
                  <DetailItem>
                    <DetailLabel>Booking ID</DetailLabel>
                    <DetailValue>{selectedBooking.bookingId}</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Customer Name</DetailLabel>
                    <DetailValue>{selectedBooking.customerName}</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Email</DetailLabel>
                    <DetailValue>{selectedBooking.customerEmail}</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Phone</DetailLabel>
                    <DetailValue>{selectedBooking.customerPhone}</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Service Type</DetailLabel>
                    <DetailValue>{selectedBooking.service || 'N/A'}</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Selected Plan (Tier)</DetailLabel>
                    <DetailValue>{selectedBooking.serviceTier || 'N/A'}</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Date</DetailLabel>
                    <DetailValue>{new Date(selectedBooking.date).toLocaleDateString()}</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Time Slot</DetailLabel>
                    <DetailValue>{selectedBooking.timeSlot}</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Car</DetailLabel>
                    <DetailValue>{selectedBooking.carBrand} {selectedBooking.carModel} ({selectedBooking.carYear})</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Car Color</DetailLabel>
                    <DetailValue>{selectedBooking.carColor}</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Pickup Option</DetailLabel>
                    <DetailValue>{getPickupLabel(selectedBooking.pickupOption)}</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Service Price</DetailLabel>
                    <DetailValue>₹{(selectedBooking.totalAmount - getPickupCharge(selectedBooking.pickupOption))?.toLocaleString()}</DetailValue>
                  </DetailItem>
                  {getPickupCharge(selectedBooking.pickupOption) > 0 && (
                    <DetailItem>
                      <DetailLabel>Pickup Charge</DetailLabel>
                      <DetailValue>₹{getPickupCharge(selectedBooking.pickupOption)}</DetailValue>
                    </DetailItem>
                  )}
                  <DetailItem>
                    <DetailLabel>Total Amount</DetailLabel>
                    <DetailValue><strong>₹{selectedBooking.totalAmount?.toLocaleString()}</strong></DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Status</DetailLabel>
                    <Select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="in-progress">In Progress</option>
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

export default Bookings;
