import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { userAPI } from "../../../services/user/api";
import Header from "../../../components/common/Header/Header";
import Footer from "../../../components/common/Footer/Footer";
import LoadingSpinner from "../../../components/common/LoadingSpinner/LoadingSpinner";
import {
  Wrapper,
  Container,
  SuccessIcon,
  Title,
  BookingId,
  Card,
  Section,
  Label,
  Value,
  StatusBadge,
  ButtonGroup,
  Button,
} from "./BookingConfirmationStyles";

const BookingConfirmation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await userAPI.getBookingById(id);
        if (response.success) {
          setBooking(response.booking);
        }
      } catch {
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, [id, navigate]);

  if (loading) {
    return (
      <Wrapper>
        <Header />
        <Container>
          <LoadingSpinner size="50px" />
        </Container>
        <Footer />
      </Wrapper>
    );
  }

  if (!booking) return null;

  return (
    <Wrapper>
      <Header />
      <Container>
        <SuccessIcon>
          <i className="fas fa-check-circle" />
        </SuccessIcon>
        <Title>Booking Confirmed!</Title>
        <BookingId>Booking ID: {booking.bookingId}</BookingId>

        <Card>
          <Section>
            <Label>Service</Label>
            <Value>{booking.service}</Value>
          </Section>

          <Section>
            <Label>Date & Time</Label>
            <Value>
              {new Date(booking.date).toLocaleDateString()} at {booking.timeSlot}
            </Value>
          </Section>

          <Section>
            <Label>Vehicle</Label>
            <Value>
              {booking.carBrand} {booking.carModel} ({booking.carYear})
            </Value>
            <Value $small>{booking.carType} • {booking.carColor}</Value>
          </Section>

          <Section>
            <Label>Customer Details</Label>
            <Value>{booking.customerName}</Value>
            <Value $small>{booking.customerEmail}</Value>
            <Value $small>{booking.customerPhone}</Value>
          </Section>

          <Section>
            <Label>Status</Label>
            <StatusBadge $status={booking.status}>{booking.status}</StatusBadge>
          </Section>

          <Section>
            <Label>Total Amount</Label>
            <Value $large>₹{booking.totalAmount?.toLocaleString()}</Value>
          </Section>
        </Card>

        <ButtonGroup>
          <Button onClick={() => navigate("/")}>
            <i className="fas fa-home" /> {" "}Go to Home
          </Button>
          <Button $variant="secondary" onClick={() => navigate("/products")}>
            <i className="fas fa-box" /> {" "}Browse Products
          </Button>
        </ButtonGroup>
      </Container>
      <Footer />
    </Wrapper>
  );
};

export default BookingConfirmation;
