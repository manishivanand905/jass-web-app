import React, { useState, useEffect } from "react";
import { adminAPI } from "../../../services/admin/api";
import { showToast } from "../../common/Toast/toastConfig";
import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner";
import {
  Section,
  SectionHeader,
  SectionTitle,
  DateCard,
  DateHeader,
  DateInfo,
  BlockButton,
  SlotsGrid,
  SlotCard,
  SlotTime,
  SlotStatus,
  EmptyState,
} from "./ServicesTabStyles";

const ServicesTab = () => {
  const [timeSlots, setTimeSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTimeSlots();
  }, []);

  const loadTimeSlots = async () => {
    setLoading(true);
    try {
      const response = await adminAPI.getTimeSlots();
      if (response.success) {
        setTimeSlots(response.slots);
      } else {
        showToast.error("Failed to load time slots");
      }
    } catch {
      showToast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleSlot = async (dateId, slotId) => {
    try {
      const response = await adminAPI.toggleTimeSlot(dateId, slotId);
      if (response.success) {
        setTimeSlots((prev) =>
          prev.map((date) =>
            date.id === dateId
              ? {
                  ...date,
                  slots: date.slots.map((slot) =>
                    slot.id === slotId
                      ? { ...slot, available: !slot.available }
                      : slot
                  ),
                }
              : date
          )
        );
        showToast.success("Slot updated successfully");
      } else {
        showToast.error(response.message || "Failed to update slot");
      }
    } catch {
      showToast.error("An error occurred");
    }
  };

  const handleBlockDate = async (dateId) => {
    try {
      const response = await adminAPI.blockDate(dateId);
      if (response.success) {
        setTimeSlots((prev) =>
          prev.map((date) =>
            date.id === dateId ? { ...date, blocked: !date.blocked } : date
          )
        );
        showToast.success("Date updated successfully");
      } else {
        showToast.error(response.message || "Failed to update date");
      }
    } catch {
      showToast.error("An error occurred");
    }
  };

  if (loading) {
    return (
      <Section>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "40px",
          }}
        >
          <LoadingSpinner size="40px" />
        </div>
      </Section>
    );
  }

  return (
    <Section>
      <SectionHeader>
        <SectionTitle>Service Time Slot Management</SectionTitle>
      </SectionHeader>

      {timeSlots.length > 0 ? (
        timeSlots.map((dateSlot) => (
          <DateCard key={dateSlot.id} $blocked={dateSlot.blocked}>
            <DateHeader>
              <DateInfo>
                <i className="fas fa-calendar-alt" />
                <span>
                  {new Date(dateSlot.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </DateInfo>
              <BlockButton
                onClick={() => handleBlockDate(dateSlot.id)}
                $blocked={dateSlot.blocked}
              >
                <i
                  className={`fas fa-${dateSlot.blocked ? "unlock" : "ban"}`}
                />
                {dateSlot.blocked ? "Unblock Date" : "Block Date"}
              </BlockButton>
            </DateHeader>

            <SlotsGrid>
              {dateSlot.slots.map((slot) => (
                <SlotCard
                  key={slot.id}
                  onClick={() => handleToggleSlot(dateSlot.id, slot.id)}
                  $available={slot.available}
                  $blocked={dateSlot.blocked}
                >
                  <SlotTime>
                    <i className="fas fa-clock" />
                    {slot.time}
                  </SlotTime>
                  <SlotStatus $available={slot.available}>
                    {slot.available ? "Available" : "Blocked"}
                  </SlotStatus>
                </SlotCard>
              ))}
            </SlotsGrid>
          </DateCard>
        ))
      ) : (
        <EmptyState>
          <i className="fas fa-calendar-times" />
          <p>No time slots available</p>
        </EmptyState>
      )}
    </Section>
  );
};

export default ServicesTab;
