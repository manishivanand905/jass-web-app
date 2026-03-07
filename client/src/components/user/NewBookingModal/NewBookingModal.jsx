import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useBookingModal } from '../../../hooks/useNewBookingModal';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: #2a2a2a;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  border: 1px solid #403D40;
  
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
`;

const Header = styled.div`
  padding: 24px;
  border-bottom: 2px solid #C90000;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  color: #ECECEC;
  font-size: 1.5rem;
  margin: 0;
  font-weight: 700;
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  color: #ECECEC;
  font-size: 1.5rem;
  cursor: pointer;
  &:hover { color: #C90000; }
`;

const Content = styled.div`
  padding: 24px;
  flex: 1;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  
  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const StepIndicator = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
`;

const Step = styled.div`
  flex: 1;
  height: 3px;
  background: ${props => props.$active ? '#C90000' : '#403D40'};
  border-radius: 2px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  color: #ECECEC;
  font-size: 0.9rem;
  margin-bottom: 8px;
  font-weight: 600;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  background: #1a1a1a;
  border: 1px solid #403D40;
  border-radius: 4px;
  color: #ECECEC;
  font-family: inherit;
  &:focus {
    outline: none;
    border-color: #C90000;
    box-shadow: 0 0 0 2px rgba(201, 0, 0, 0.1);
  }
`;

const TimeSlotGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

const TimeSlot = styled.button`
  padding: 12px;
  background: ${props => props.$selected ? '#C90000' : '#1a1a1a'};
  border: 1px solid ${props => props.$selected ? '#C90000' : '#403D40'};
  border-radius: 4px;
  color: ${props => props.$selected ? '#ECECEC' : '#ECECEC'};
  cursor: pointer;
  font-weight: 600;
  &:hover { border-color: #C90000; }
`;

const OptionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
`;

const OptionCard = styled.button`
  padding: 20px;
  background: ${props => props.$selected ? 'rgba(201, 0, 0, 0.2)' : '#1a1a1a'};
  border: 2px solid ${props => props.$selected ? '#C90000' : '#403D40'};
  border-radius: 4px;
  color: #ECECEC;
  cursor: pointer;
  text-align: center;
  i { display: block; font-size: 2rem; margin-bottom: 10px; color: #C90000; }
  &:hover { border-color: #C90000; }
`;

const OptionLabel = styled.div`
  font-weight: 600;
  margin-bottom: 8px;
`;

const OptionPrice = styled.div`
  font-size: 0.85rem;
  color: #C90000;
  font-weight: 700;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #403D40;
  color: #ECECEC;
  &:last-child { border-bottom: none; }
  
  span { font-weight: 500; }
  strong { color: #C90000; font-weight: 600; }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
`;

const Button = styled.button`
  flex: 1;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  background: ${props => props.$primary ? '#C90000' : '#1a1a1a'};
  color: ${props => props.$primary ? '#ECECEC' : '#ECECEC'};
  border: ${props => props.$primary ? 'none' : '1px solid #403D40'};
  &:hover { background: ${props => props.$primary ? '#860000' : '#2a2a2a'}; }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`;

const NewBookingModal = () => {
  const { isOpen, closeModal, initialData } = useBookingModal();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [bookingInfo, setBookingInfo] = useState({
    serviceName: '',
    tierName: '',
    category: '',
    price: '',
    originalPrice: null,
    isCombo: false
  });
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    carBrand: '',
    vehicleModel: '',
    carYear: new Date().getFullYear(),
    vehicleColor: '',
    pickupOption: '',
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });

  useEffect(() => {
    if (initialData && isOpen) {
      setBookingInfo({
        serviceName: initialData.serviceName || '',
        tierName: initialData.tierName || '',
        category: initialData.category || '',
        price: initialData.price || '',
        originalPrice: initialData.originalPrice || null,
        isCombo: initialData.isCombo || false
      });
      setStep(1);
    }
  }, [initialData, isOpen]);

  const timeSlots = ['10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'];
  const pickupCharge = 499;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (step === 1 && (!formData.date || !formData.time)) {
      toast.error('Please select date and time');
      return;
    }
    if (step === 2 && (!formData.carBrand || !formData.vehicleModel || !formData.carYear || !formData.vehicleColor)) {
      toast.error('Please enter all vehicle details');
      return;
    }
    if (step === 3 && !formData.pickupOption) {
      toast.error('Please select pickup option');
      return;
    }
    setStep(step + 1);
  };

  const getTotalAmount = () => {
    const charge = formData.pickupOption === 'pickup' ? pickupCharge : 0;
    return bookingInfo.price + charge;
  };

  const handleSubmit = async () => {
    if (!user) {
      toast.info('Please login to book a service');
      closeModal();
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const token = localStorage.getItem('userToken');
      
      if (!token) {
        toast.error('Authentication token not found. Please login again.');
        setLoading(false);
        return;
      }

      const bookingPayload = {
        service: bookingInfo.serviceName,
        serviceTier: bookingInfo.tierName,
        serviceType: bookingInfo.serviceName,
        servicePackage: bookingInfo.tierName,
        date: formData.date,
        timeSlot: formData.time,
        carBrand: formData.carBrand,
        carModel: formData.vehicleModel,
        carYear: parseInt(formData.carYear),
        carColor: formData.vehicleColor,
        pickupOption: formData.pickupOption,
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        totalAmount: getTotalAmount(),
        isCombo: bookingInfo.isCombo || false,
        originalPrice: bookingInfo.originalPrice || null
      };

      const response = await axios.post(`${apiUrl}/api/bookings`, bookingPayload, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      toast.success('Booking confirmed!');
      closeModal();
      navigate(`/booking/confirmation/${response.data.booking._id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Booking failed');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Overlay onClick={closeModal}>
      <Modal onClick={e => e.stopPropagation()}>
        <Header>
          <Title>Book Service</Title>
          <CloseBtn onClick={closeModal}><i className="fas fa-times"></i></CloseBtn>
        </Header>

        <Content>
          <StepIndicator>
            <Step $active={step >= 1} />
            <Step $active={step >= 2} />
            <Step $active={step >= 3} />
            <Step $active={step >= 4} />
          </StepIndicator>

          {step === 1 && (
            <>
              <FormGroup>
                <Label>Select Date</Label>
                <Input type="date" name="date" value={formData.date} onChange={handleChange} min={new Date().toISOString().split('T')[0]} />
              </FormGroup>
              <FormGroup>
                <Label>Select Time Slot</Label>
                <TimeSlotGrid>
                  {timeSlots.map(slot => (
                    <TimeSlot
                      key={slot}
                      $selected={formData.time === slot}
                      onClick={() => setFormData(prev => ({ ...prev, time: slot }))}
                    >
                      {slot}
                    </TimeSlot>
                  ))}
                </TimeSlotGrid>
              </FormGroup>
            </>
          )}

          {step === 2 && (
            <>
              <FormGroup>
                <Label>Car Brand</Label>
                <Input type="text" name="carBrand" value={formData.carBrand} onChange={handleChange} placeholder="e.g., BMW" />
              </FormGroup>
              <FormGroup>
                <Label>Car Model</Label>
                <Input type="text" name="vehicleModel" value={formData.vehicleModel} onChange={handleChange} placeholder="e.g., X5" />
              </FormGroup>
              <FormGroup>
                <Label>Car Year</Label>
                <Input type="number" name="carYear" value={formData.carYear} onChange={handleChange} min="1990" max={new Date().getFullYear()} />
              </FormGroup>
              <FormGroup>
                <Label>Vehicle Color</Label>
                <Input type="text" name="vehicleColor" value={formData.vehicleColor} onChange={handleChange} placeholder="e.g., Black" />
              </FormGroup>
            </>
          )}

          {step === 3 && (
            <FormGroup>
              <Label>How would you like to proceed?</Label>
              <OptionGrid>
                <OptionCard
                  $selected={formData.pickupOption === 'pickup'}
                  onClick={() => setFormData(prev => ({ ...prev, pickupOption: 'pickup' }))}
                >
                  <i className="fas fa-car" />
                  <OptionLabel>Pick up from Home</OptionLabel>
                  <OptionPrice>+ ₹{pickupCharge}</OptionPrice>
                </OptionCard>
                <OptionCard
                  $selected={formData.pickupOption === 'drop'}
                  onClick={() => setFormData(prev => ({ ...prev, pickupOption: 'drop' }))}
                >
                  <i className="fas fa-store" />
                  <OptionLabel>Drop at Store</OptionLabel>
                  <OptionPrice>Free</OptionPrice>
                </OptionCard>
              </OptionGrid>
            </FormGroup>
          )}

          {step === 4 && (
            <>
              <h3 style={{ color: '#ECECEC', marginBottom: '20px', fontSize: '1.2rem', fontWeight: '700' }}>Confirm Your Booking</h3>
              <SummaryItem>
                <span>Service:</span>
                <strong>{bookingInfo.serviceName}</strong>
              </SummaryItem>
              <SummaryItem>
                <span>{bookingInfo.isCombo ? 'Included Services:' : 'Plan:'}</span>
                <strong>{bookingInfo.tierName}</strong>
              </SummaryItem>
              {bookingInfo.isCombo && bookingInfo.originalPrice && (
                <SummaryItem>
                  <span>Original Price:</span>
                  <strong style={{ textDecoration: 'line-through', color: 'rgba(255,255,255,0.6)' }}>₹{bookingInfo.originalPrice?.toLocaleString()}</strong>
                </SummaryItem>
              )}
              <SummaryItem>
                <span>{bookingInfo.isCombo ? 'Discounted Price:' : 'Service Price:'}</span>
                <strong>₹{bookingInfo.price?.toLocaleString()}</strong>
              </SummaryItem>
              {formData.pickupOption === 'pickup' && (
                <SummaryItem>
                  <span>Pickup Charge:</span>
                  <strong>₹{pickupCharge}</strong>
                </SummaryItem>
              )}
              <SummaryItem>
                <span>Total Amount:</span>
                <strong>₹{getTotalAmount()?.toLocaleString()}</strong>
              </SummaryItem>
              <SummaryItem>
                <span>Date:</span>
                <strong>{new Date(formData.date).toLocaleDateString()}</strong>
              </SummaryItem>
              <SummaryItem>
                <span>Time:</span>
                <strong>{formData.time}</strong>
              </SummaryItem>
              <SummaryItem>
                <span>Car:</span>
                <strong>{formData.carBrand} {formData.vehicleModel} ({formData.carYear})</strong>
              </SummaryItem>
              <SummaryItem>
                <span>Color:</span>
                <strong>{formData.vehicleColor}</strong>
              </SummaryItem>
              <SummaryItem>
                <span>Pickup:</span>
                <strong>{formData.pickupOption === 'pickup' ? 'Pick up from Home' : 'Drop at Store'}</strong>
              </SummaryItem>
              <SummaryItem>
                <span>Name:</span>
                <strong>{formData.name}</strong>
              </SummaryItem>
              <SummaryItem>
                <span>Email:</span>
                <strong>{formData.email}</strong>
              </SummaryItem>
              <SummaryItem>
                <span>Phone:</span>
                <strong>{formData.phone}</strong>
              </SummaryItem>
            </>
          )}

          <ButtonGroup>
            {step > 1 && (
              <Button onClick={() => setStep(step - 1)}>
                Back
              </Button>
            )}
            {step < 4 ? (
              <Button $primary onClick={handleNext}>
                Next
              </Button>
            ) : (
              <Button $primary onClick={handleSubmit} disabled={loading}>
                {loading ? 'Booking...' : 'Confirm Booking'}
              </Button>
            )}
          </ButtonGroup>
        </Content>
      </Modal>
    </Overlay>
  );
};

export default NewBookingModal;
