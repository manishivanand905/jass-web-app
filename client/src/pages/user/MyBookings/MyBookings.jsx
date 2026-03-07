import React, { useState, useEffect } from 'react';
import Sidebar from '../../../components/common/Sidebar/Sidebar';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useBookingModal } from '../../../hooks/useNewBookingModal';
import {
  Container, Header, Title, HeaderActions, SearchBar, FilterChips, Chip, Table, TableHeader, TableBody, TableRow,
  TableCell, StatusBadge, ActionButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalTitle, CloseButton,
  DetailGrid, DetailItem, DetailLabel, DetailValue, EmptyState
} from './MyBookingsStyles';

const MyBookings = () => {
  const { isOpen } = useBookingModal();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, [search, statusFilter]);

  useEffect(() => {
    if (!isOpen) {
      fetchBookings();
    }
  }, [isOpen]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('userToken');
      
      if (!token) {
        console.warn('No token found in localStorage');
        toast.error('Please login to view bookings');
        setBookings([]);
        return;
      }

      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const url = `${apiUrl}/api/bookings/user`;
      console.log('Fetching bookings from:', url);
      
      const response = await axios.get(url, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Bookings response:', response.data);
      
      if (response.data.success && Array.isArray(response.data.bookings)) {
        setBookings(response.data.bookings);
      } else if (Array.isArray(response.data.bookings)) {
        setBookings(response.data.bookings);
      } else {
        console.warn('Unexpected response format:', response.data);
        setBookings([]);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Failed to fetch bookings');
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredBookings = bookings.filter(b => {
    const matchesFilter = statusFilter === '' || b.status?.toLowerCase() === statusFilter;
    const matchesSearch = b.bookingId?.toLowerCase().includes(search.toLowerCase()) || 
                         b.service?.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status) => {
    const colors = { 
      pending: '#ff9800', 
      confirmed: '#2196f3', 
      'in-progress': '#2196f3', 
      completed: '#00c853', 
      cancelled: '#f44336' 
    };
    return colors[status?.toLowerCase()] || '#999';
  };

  return (
    <Sidebar type="user">
      <Container>
        <Header>
          <Title>MY BOOKINGS</Title>
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
        ) : filteredBookings.length === 0 ? (
          <EmptyState>
            <i className="fas fa-calendar-times"></i>
            <p>{bookings.length === 0 ? 'No bookings yet' : 'No bookings found'}</p>
          </EmptyState>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell>Booking ID</TableCell>
                  <TableCell>Service</TableCell>
                  <TableCell>Plan</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Car</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.map(booking => (
                  <TableRow key={booking._id}>
                    <TableCell data-label="Booking ID">{booking.bookingId}</TableCell>
                    <TableCell data-label="Service">{booking.service}</TableCell>
                    <TableCell data-label="Plan">{booking.serviceTier}</TableCell>
                    <TableCell data-label="Date">{new Date(booking.date).toLocaleDateString()}</TableCell>
                    <TableCell data-label="Time">{booking.timeSlot}</TableCell>
                    <TableCell data-label="Car">{booking.carBrand} {booking.carModel}</TableCell>
                    <TableCell data-label="Amount">₹{booking.totalAmount?.toLocaleString()}</TableCell>
                    <TableCell data-label="Status">
                      <StatusBadge $color={getStatusColor(booking.status)}>{booking.status}</StatusBadge>
                    </TableCell>
                    <TableCell data-label="Actions">
                      <ActionButton onClick={() => setSelectedBooking(booking)}>
                        <i className="fas fa-eye"></i>
                      </ActionButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
                    <DetailLabel>Service</DetailLabel>
                    <DetailValue>{selectedBooking.service}</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Plan (Tier)</DetailLabel>
                    <DetailValue>{selectedBooking.serviceTier}</DetailValue>
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
                    <DetailLabel>Color</DetailLabel>
                    <DetailValue>{selectedBooking.carColor}</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Pickup Option</DetailLabel>
                    <DetailValue>{selectedBooking.pickupOption === 'pickup' ? 'Pick up from Home' : 'Drop at Store'}</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Amount</DetailLabel>
                    <DetailValue>₹{selectedBooking.totalAmount?.toLocaleString()}</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Status</DetailLabel>
                    <DetailValue>{selectedBooking.status}</DetailValue>
                  </DetailItem>
                </DetailGrid>
              </ModalContent>
            </Modal>
          </>
        )}
      </Container>
    </Sidebar>
  );
};

export default MyBookings;
