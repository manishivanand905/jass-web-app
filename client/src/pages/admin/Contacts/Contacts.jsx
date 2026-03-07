import React, { useState, useEffect, useCallback } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout/AdminLayout';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  Container, Header, Title, HeaderActions, FilterChips, Chip, Table, TableHeader, TableBody, TableRow, TableCell,
  StatusBadge, ActionButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalTitle, CloseButton, DetailGrid,
  DetailItem, DetailLabel, DetailValue, Select, SubmitButton, EmptyState, Pagination, PageButton
} from './ContactsStyles';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedContact, setSelectedContact] = useState(null);
  const [newStatus, setNewStatus] = useState('');

  const fetchContacts = useCallback(async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const { data } = await axios.get(`${apiUrl}/api/contacts`, {
        params: { page, limit: 10, status: statusFilter },
        headers: { Authorization: `Bearer ${token}` }
      });
      setContacts(data.contacts);
      setTotalPages(data.totalPages);
    } catch (error) {
      toast.error('Failed to fetch contacts');
    } finally {
      setLoading(false);
    }
  }, [page, statusFilter]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const updateStatus = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      await axios.patch(`${apiUrl}/api/contacts/${selectedContact._id}/status`, 
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` }}
      );
      toast.success('Status updated successfully');
      setSelectedContact(null);
      fetchContacts();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const getStatusColor = (status) => {
    const colors = { new: '#ff9800', contacted: '#2196f3', resolved: '#00c853' };
    return colors[status] || '#999';
  };

  return (
    <AdminLayout>
      <Container>
        <Header>
          <Title>CONTACT REQUESTS</Title>
          <HeaderActions>
            <FilterChips>
              <Chip $active={statusFilter === ''} onClick={() => setStatusFilter('')}>All</Chip>
              <Chip $active={statusFilter === 'new'} onClick={() => setStatusFilter('new')}>New</Chip>
              <Chip $active={statusFilter === 'contacted'} onClick={() => setStatusFilter('contacted')}>Contacted</Chip>
              <Chip $active={statusFilter === 'resolved'} onClick={() => setStatusFilter('resolved')}>Resolved</Chip>
            </FilterChips>
          </HeaderActions>
        </Header>

        {loading ? (
          <EmptyState><i className="fas fa-spinner fa-spin"></i></EmptyState>
        ) : contacts.length === 0 ? (
          <EmptyState>
            <i className="fas fa-envelope-open"></i>
            <p>No contact requests found</p>
          </EmptyState>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Service</TableCell>
                  <TableCell>Message</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contacts.map(contact => (
                  <TableRow key={contact._id} $unread={contact.status === 'new'}>
                    <TableCell>{contact.name}</TableCell>
                    <TableCell>{contact.email}</TableCell>
                    <TableCell>{contact.phone}</TableCell>
                    <TableCell>{contact.service}</TableCell>
                    <TableCell>{contact.message.substring(0, 50)}...</TableCell>
                    <TableCell>{new Date(contact.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <StatusBadge $color={getStatusColor(contact.status)}>{contact.status}</StatusBadge>
                    </TableCell>
                    <TableCell>
                      <ActionButton onClick={() => { setSelectedContact(contact); setNewStatus(contact.status); }}>
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

        {selectedContact && (
          <>
            <ModalOverlay onClick={() => setSelectedContact(null)} />
            <Modal>
              <ModalContent>
                <ModalHeader>
                  <ModalTitle>Contact Details</ModalTitle>
                  <CloseButton onClick={() => setSelectedContact(null)}><i className="fas fa-times"></i></CloseButton>
                </ModalHeader>
                <DetailGrid>
                  <DetailItem>
                    <DetailLabel>Name</DetailLabel>
                    <DetailValue>{selectedContact.name}</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Email</DetailLabel>
                    <DetailValue>{selectedContact.email}</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Phone</DetailLabel>
                    <DetailValue>{selectedContact.phone}</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Service</DetailLabel>
                    <DetailValue>{selectedContact.service}</DetailValue>
                  </DetailItem>
                  {selectedContact.preferredDate && (
                    <DetailItem>
                      <DetailLabel>Preferred Date</DetailLabel>
                      <DetailValue>{new Date(selectedContact.preferredDate).toLocaleDateString()}</DetailValue>
                    </DetailItem>
                  )}
                  {selectedContact.preferredTime && (
                    <DetailItem>
                      <DetailLabel>Preferred Time</DetailLabel>
                      <DetailValue>{selectedContact.preferredTime}</DetailValue>
                    </DetailItem>
                  )}
                  <DetailItem style={{ gridColumn: '1 / -1' }}>
                    <DetailLabel>Message</DetailLabel>
                    <DetailValue>{selectedContact.message}</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Status</DetailLabel>
                    <Select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="resolved">Resolved</option>
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

export default Contacts;
