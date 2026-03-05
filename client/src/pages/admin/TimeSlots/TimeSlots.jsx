import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { adminAPI } from "../../../services/admin/api";
import { showToast } from "../../../components/common/Toast/toastConfig";
import AdminLayout from "../../../components/admin/AdminLayout/AdminLayout";
import LoadingSpinner from "../../../components/common/LoadingSpinner/LoadingSpinner";
import {
  Container,
  Header,
  Title,
  AddButton,
  Calendar,
  DateCard,
  DateHeader,
  DateLabel,
  SlotGrid,
  SlotCard,
  SlotTime,
  SlotStatus,
  SlotActions,
  IconButton,
  EmptyState,
} from "./TimeSlotsStyles";

const TimeSlots = () => {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const { admin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!admin) navigate("/admin/login");
    else loadSlots();
  }, [admin, navigate]);

  const loadSlots = async () => {
    setLoading(true);
    try {
      const response = await adminAPI.getTimeSlots();
      if (response.success) setSlots(response.slots);
    } catch {
      showToast.error("Failed to load time slots");
    } finally {
      setLoading(false);
    }
  };

  const toggleSlot = async (dateId, slotId) => {
    try {
      const response = await adminAPI.toggleTimeSlot(dateId, slotId);
      if (response.success) {
        showToast.success("Slot updated");
        loadSlots();
      }
    } catch {
      showToast.error("Failed to update slot");
    }
  };

  const blockDate = async (dateId) => {
    try {
      const response = await adminAPI.blockDate(dateId);
      if (response.success) {
        showToast.success("Date blocked");
        loadSlots();
      }
    } catch {
      showToast.error("Failed to block date");
    }
  };

  return (
    <AdminLayout activeTab="timeslots" pageTitle="TIME SLOTS">
      <Container>
        <Header>
          <Title>Time Slot Management</Title>
          <AddButton onClick={loadSlots}>
            <i className="fas fa-sync" /> {" "}Refresh
          </AddButton>
        </Header>

        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "60px" }}>
            <LoadingSpinner size="50px" />
          </div>
        ) : slots.length > 0 ? (
          <Calendar>
            {slots.map((dateSlot) => (
              <DateCard key={dateSlot.id}>
                <DateHeader>
                  <DateLabel>
                    {new Date(dateSlot.date).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </DateLabel>
                  <IconButton
                    $variant={dateSlot.blocked ? "success" : "danger"}
                    onClick={() => blockDate(dateSlot.id)}
                  >
                    <i className={`fas fa-${dateSlot.blocked ? "unlock" : "ban"}`} />
                  </IconButton>
                </DateHeader>

                <SlotGrid>
                  {dateSlot.slots.map((slot) => (
                    <SlotCard key={slot.id} $available={slot.available}>
                      <SlotTime>{slot.time}</SlotTime>
                      <SlotStatus $available={slot.available}>
                        {slot.available ? "Available" : "Booked"}
                      </SlotStatus>
                      <SlotActions>
                        <IconButton
                          $small
                          onClick={() => toggleSlot(dateSlot.id, slot.id)}
                        >
                          <i className="fas fa-edit" />
                        </IconButton>
                      </SlotActions>
                    </SlotCard>
                  ))}
                </SlotGrid>
              </DateCard>
            ))}
          </Calendar>
        ) : (
          <EmptyState>
            <i className="fas fa-calendar-times" /> {" "}
            <p>No time slots configured</p>
          </EmptyState>
        )}
      </Container>
    </AdminLayout>
  );
};

export default TimeSlots;
