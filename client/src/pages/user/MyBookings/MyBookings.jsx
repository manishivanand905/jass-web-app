import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import Sidebar from "../../../components/common/Sidebar/Sidebar";
import { getUserBookings } from "../../../services/user/api";
import { Container, Header, Title, Subtitle, FilterBar, SearchInput, StatusChip, BookingCard, StatusPill, BookingHeader, BookingId, ServiceIcon, ServiceName, InfoGrid, InfoItem, Price, ActionRow, ActionButton, NoBookings } from "./MyBookingsStyles";

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const fetchBookings = async () => {
    try {
      const data = await getUserBookings();
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBookings = bookings.filter(b => {
    const matchesFilter = filter === "all" || b.status.toLowerCase() === filter;
    const matchesSearch = b.service?.toLowerCase().includes(search.toLowerCase()) || b.bookingId?.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const statusCounts = {
    pending: bookings.filter(b => b.status === "Pending").length,
    confirmed: bookings.filter(b => b.status === "Confirmed").length,
    completed: bookings.filter(b => b.status === "Completed").length,
    cancelled: bookings.filter(b => b.status === "Cancelled").length
  };

  if (loading) {
    return (
      <Sidebar>
        <Container>
          <Header>
            <div>
              <Title><span>Your</span> Services</Title>
              <Subtitle>Loading bookings...</Subtitle>
            </div>
          </Header>
        </Container>
      </Sidebar>
    );
  }

  return (
    <Sidebar>
      <Container>
        <Header>
          <div>
            <Title><span>Your</span> Services</Title>
            <Subtitle>{bookings.length} bookings found</Subtitle>
          </div>
        </Header>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', flexWrap: 'wrap' }}>
          <StatusChip $active={filter === "all"} onClick={() => setFilter("all")}>
            All Bookings
          </StatusChip>
          <StatusChip $active={filter === "pending"} $color="#e67e22" onClick={() => setFilter("pending")}>
            🟡 {statusCounts.pending} Pending
          </StatusChip>
          <StatusChip $active={filter === "confirmed"} $color="#3498db" onClick={() => setFilter("confirmed")}>
            🔵 {statusCounts.confirmed} Confirmed
          </StatusChip>
          <StatusChip $active={filter === "completed"} $color="#27ae60" onClick={() => setFilter("completed")}>
            🟢 {statusCounts.completed} Completed
          </StatusChip>
          <StatusChip $active={filter === "cancelled"} $color="#cc0000" onClick={() => setFilter("cancelled")}>
            🔴 {statusCounts.cancelled} Cancelled
          </StatusChip>
        </div>

        <FilterBar>
          <SearchInput>
            <i className="fa-solid fa-magnifying-glass" />
            <input
              type="text"
              placeholder="Search bookings..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </SearchInput>
          {(search || filter !== "all") && (
            <button onClick={() => { setSearch(""); setFilter("all"); }} style={{ padding: '10px 20px', background: 'rgba(204,0,0,0.1)', border: '1px solid #cc0000', borderRadius: '6px', color: '#cc0000', cursor: 'pointer', fontFamily: 'Barlow Condensed', fontSize: '0.85rem', fontWeight: '700' }}>
              <i className="fa-solid fa-xmark" /> Clear
            </button>
          )}
        </FilterBar>

        {filteredBookings.length === 0 ? (
          <NoBookings>
            <i className="fa-solid fa-calendar-xmark" />
            <h2>No Bookings Found</h2>
            <p>{filter !== "all" ? `No ${filter} bookings found` : "You haven't made any bookings yet."}</p>
          </NoBookings>
        ) : (
          filteredBookings.map((booking) => (
            <BookingCard key={booking._id} $status={booking.status}>
              <BookingHeader>
                <div>
                  <StatusPill $status={booking.status}>{booking.status.toUpperCase()}</StatusPill>
                  <BookingId>REF: #{booking.bookingId}</BookingId>
                </div>
              </BookingHeader>

              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                <ServiceIcon className="fa-solid fa-film" />
                <div>
                  <ServiceName>{booking.service}</ServiceName>
                  <p style={{ color: '#B0B0B0', fontSize: '0.85rem' }}>Complete vehicle coverage</p>
                </div>
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '20px', marginBottom: '20px' }}>
                <InfoGrid>
                  <InfoItem>
                    <i className="fa-solid fa-calendar" />
                    {new Date(booking.date).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
                  </InfoItem>
                  <InfoItem>
                    <i className="fa-solid fa-clock" />
                    {booking.time}
                  </InfoItem>
                  <InfoItem>
                    <i className="fa-solid fa-car" />
                    {booking.vehicleModel}
                  </InfoItem>
                  <InfoItem>
                    <i className="fa-solid fa-location-dot" />
                    {booking.city || 'Hyderabad'}
                  </InfoItem>
                </InfoGrid>
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '20px' }}>
                <Price>₹{booking.price || '24,999'}</Price>
                <ActionRow>
                  <ActionButton $variant="ghost">
                    View Details
                  </ActionButton>
                  {(booking.status === "Pending" || booking.status === "Confirmed") && (
                    <>
                      <ActionButton $variant="ghost">
                        <i className="fa-solid fa-calendar-days" /> Reschedule
                      </ActionButton>
                      <ActionButton $variant="danger">
                        Cancel Booking
                      </ActionButton>
                    </>
                  )}
                  {booking.status === "Completed" && (
                    <ActionButton $variant="success">
                      <i className="fa-solid fa-star" /> Write a Review
                    </ActionButton>
                  )}
                  {booking.status === "Cancelled" && (
                    <ActionButton $variant="primary">
                      Book Again
                    </ActionButton>
                  )}
                </ActionRow>
              </div>
            </BookingCard>
          ))
        )}
      </Container>
    </Sidebar>
  );
};

export default MyBookings;
