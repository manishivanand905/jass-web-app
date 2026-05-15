import React, { useState, useEffect, useCallback } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout/AdminLayout';
import axios from 'axios';
import { toast } from 'react-toastify';
import { downloadAdminExport } from '../../../utils/adminExport';
import {
  Container,
  Header,
  Title,
  HeaderActions,
  SearchBar,
  ExportActions,
  SelectionInfo,
  ExportButton,
  FilterChips,
  Chip,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  CheckboxInput,
  StatusBadge,
  ActionButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  CloseButton,
  DetailGrid,
  DetailItem,
  DetailLabel,
  DetailValue,
  Select,
  SubmitButton,
  EmptyState,
  Pagination,
  PageButton
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
  const [selectedBookings, setSelectedBookings] = useState({});
  const [exporting, setExporting] = useState(false);

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

  useEffect(() => {
    setSelectedBookings((prev) => {
      const next = { ...prev };
      bookings.forEach((booking) => {
        if (next[booking._id]) {
          next[booking._id] = booking;
        }
      });
      return next;
    });
  }, [bookings]);

  const updateStatus = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      await axios.patch(
        `${apiUrl}/api/bookings/${selectedBooking._id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Status updated successfully');
      setSelectedBooking(null);
      fetchBookings();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#ff9800',
      confirmed: '#2196f3',
      'in-progress': '#2196f3',
      completed: '#00c853',
      cancelled: '#f44336'
    };
    return colors[status] || '#999';
  };

  const getPickupLabel = (option) => {
    return option === 'pickup' ? 'Pick up from Home' : 'Drop at Store';
  };

  const getPickupCharge = (option) => {
    return option === 'pickup' ? 499 : 0;
  };

  const selectedCount = Object.keys(selectedBookings).length;
  const allVisibleSelected = bookings.length > 0 && bookings.every((booking) => selectedBookings[booking._id]);

  const toggleBookingSelection = (booking, isChecked) => {
    setSelectedBookings((prev) => {
      const next = { ...prev };

      if (isChecked) {
        next[booking._id] = booking;
      } else {
        delete next[booking._id];
      }

      return next;
    });
  };

  const toggleSelectAllVisible = (isChecked) => {
    setSelectedBookings((prev) => {
      const next = { ...prev };

      bookings.forEach((booking) => {
        if (isChecked) {
          next[booking._id] = booking;
        } else {
          delete next[booking._id];
        }
      });

      return next;
    });
  };

  const handleExportSelected = async () => {
    if (!selectedCount) {
      toast.error('Select at least one booking to export');
      return;
    }

    try {
      setExporting(true);
      downloadAdminExport({
        bookings: Object.values(selectedBookings),
        includeOrders: false,
        includeBookings: true,
        filenamePrefix: 'jass-bookings-export'
      });
      toast.success('Selected bookings exported successfully');
    } catch (error) {
      toast.error('Failed to export selected bookings');
    } finally {
      setExporting(false);
    }
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
            <ExportActions>
              <SelectionInfo>{selectedCount} selected</SelectionInfo>
              <ExportButton type="button" onClick={handleExportSelected} disabled={!selectedCount || exporting}>
                <i className={`fas ${exporting ? 'fa-spinner fa-spin' : 'fa-file-export'}`}></i>
                {exporting ? 'Exporting...' : 'Export Selected'}
              </ExportButton>
            </ExportActions>
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
                  <TableCell>
                    <CheckboxInput
                      type="checkbox"
                      checked={allVisibleSelected}
                      onChange={(e) => toggleSelectAllVisible(e.target.checked)}
                      aria-label="Select all visible bookings"
                    />
                  </TableCell>
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
                {bookings.map((booking) => (
                  <TableRow key={booking._id}>
                    <TableCell data-label="Select">
                      <CheckboxInput
                        type="checkbox"
                        checked={Boolean(selectedBookings[booking._id])}
                        onChange={(e) => toggleBookingSelection(booking, e.target.checked)}
                        aria-label={`Select booking ${booking.bookingId}`}
                      />
                    </TableCell>
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
                    <DetailValue>Rs. {(selectedBooking.totalAmount - getPickupCharge(selectedBooking.pickupOption))?.toLocaleString('en-IN')}</DetailValue>
                  </DetailItem>
                  {getPickupCharge(selectedBooking.pickupOption) > 0 && (
                    <DetailItem>
                      <DetailLabel>Pickup Charge</DetailLabel>
                      <DetailValue>Rs. {getPickupCharge(selectedBooking.pickupOption).toLocaleString('en-IN')}</DetailValue>
                    </DetailItem>
                  )}
                  <DetailItem>
                    <DetailLabel>Total Amount</DetailLabel>
                    <DetailValue><strong>Rs. {selectedBooking.totalAmount?.toLocaleString('en-IN')}</strong></DetailValue>
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
