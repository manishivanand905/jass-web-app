import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { userAPI } from "../../../services/user/api";
import { API_BASE } from "../../../config/api";
import Sidebar from "../../../components/common/Sidebar/Sidebar";
import { Container, HeroBanner, HeroContent, Avatar, CameraButton, HeroInfo, VerifiedBadge, StatPills, StatPill, ContentWrapper, SideNav, NavTab, MainContent, SectionTitle, FormGrid, InputGroup, Label, Input, InputIcon, ErrorText, SaveButton, DiscardButton } from "./ProfileStyles";

const Profile = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("edit");
  const [stats, setStats] = useState({ bookings: 0, orders: 0 });
  const { register, handleSubmit, formState: { errors, isDirty }, reset, setValue } = useForm({
    defaultValues: {
      firstName: user?.name?.split(" ")[0] || "",
      lastName: user?.name?.split(" ")[1] || "",
      phone: user?.phone || "",
      email: user?.email || "",
      city: user?.city || "",
      address: user?.address || ""
    }
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    if (user) {
      setValue('firstName', user.name?.split(" ")[0] || "");
      setValue('lastName', user.name?.split(" ")[1] || "");
      setValue('phone', user.phone || "");
      setValue('email', user.email || "");
      setValue('city', user.city || "");
      setValue('address', user.address || "");
    }
  }, [user, setValue]);

  const fetchStats = async () => {
    try {
      const [bookingsRes, ordersRes] = await Promise.all([
        userAPI.getBookings(),
        userAPI.getUserOrders()
      ]);
      setStats({
        bookings: bookingsRes.bookings?.length || 0,
        orders: ordersRes.orders?.length || 0
      });
    } catch (error) {
      console.error('Failed to fetch stats');
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/auth/update-profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        },
        body: JSON.stringify({
          name: `${data.firstName} ${data.lastName}`,
          phone: data.phone,
          email: data.email,
          city: data.city,
          address: data.address
        })
      });
      const result = await response.json();
      if (result.success) {
        updateUser(result.user);
        toast.success("Profile updated successfully!");
        reset({
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          email: data.email,
          city: data.city,
          address: data.address
        });
      } else {
        toast.error(result.message || "Failed to update profile");
      }
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <Sidebar>
      <Container>
        <HeroBanner>
          <HeroContent>
            <Avatar>
              <i className="fa-solid fa-circle-user" />
              <CameraButton>
                <i className="fa-solid fa-camera" />
              </CameraButton>
            </Avatar>
            <HeroInfo>
              <h2>{user.name}</h2>
              <p>Member since January 2025</p>
              <VerifiedBadge>
                <i className="fa-solid fa-circle-check" /> Verified Account
              </VerifiedBadge>
            </HeroInfo>
          </HeroContent>
          <StatPills>
            <StatPill><i className="fa-solid fa-calendar" /> {stats.bookings} Bookings</StatPill>
            <StatPill><i className="fa-solid fa-box-open" /> {stats.orders} Orders</StatPill>
          </StatPills>
        </HeroBanner>

        <ContentWrapper>
          <SideNav>
            <NavTab $active={activeTab === "edit"} onClick={() => setActiveTab("edit")}>
              <i className="fa-solid fa-user-pen" /> Edit Profile
            </NavTab>
            <NavTab $active={activeTab === "bookings"} onClick={() => navigate("/my-bookings")}>
              <i className="fa-solid fa-calendar-check" /> My Bookings
            </NavTab>
            <NavTab $active={activeTab === "orders"} onClick={() => navigate("/my-orders")}>
              <i className="fa-solid fa-box-open" /> My Orders
            </NavTab>
          </SideNav>

          <MainContent>
            {activeTab === "edit" && (
              <>
                <SectionTitle>
                  <span>Your</span> Profile Details
                </SectionTitle>
                <p style={{ color: '#B0B0B0', fontStyle: 'italic', marginBottom: '30px' }}>Keep your details up to date for faster bookings</p>

                <form onSubmit={handleSubmit(onSubmit)}>
              <FormGrid>
                <InputGroup>
                  <Label>First Name</Label>
                  <div style={{ position: 'relative' }}>
                    <InputIcon className="fa-solid fa-user" />
                    <Input
                      {...register("firstName", { required: "First name is required", pattern: { value: /^[a-zA-Z\s]{2,}$/, message: "Letters only, min 2 characters" } })}
                      $error={errors.firstName}
                    />
                  </div>
                  {errors.firstName && <ErrorText><i className="fa-solid fa-triangle-exclamation" /> {errors.firstName.message}</ErrorText>}
                </InputGroup>

                <InputGroup>
                  <Label>Last Name</Label>
                  <div style={{ position: 'relative' }}>
                    <InputIcon className="fa-solid fa-user" />
                    <Input
                      {...register("lastName", { required: "Last name is required", pattern: { value: /^[a-zA-Z\s]{2,}$/, message: "Letters only, min 2 characters" } })}
                      $error={errors.lastName}
                    />
                  </div>
                  {errors.lastName && <ErrorText><i className="fa-solid fa-triangle-exclamation" /> {errors.lastName.message}</ErrorText>}
                </InputGroup>

                <InputGroup>
                  <Label>Phone Number</Label>
                  <div style={{ position: 'relative' }}>
                    <InputIcon className="fa-solid fa-phone" />
                    <Input
                      {...register("phone", { required: "Phone is required", pattern: { value: /^[6-9]\d{9}$/, message: "Enter a valid 10-digit mobile number" } })}
                      $error={errors.phone}
                    />
                  </div>
                  {errors.phone && <ErrorText><i className="fa-solid fa-triangle-exclamation" /> {errors.phone.message}</ErrorText>}
                </InputGroup>

                <InputGroup>
                  <Label>Email Address</Label>
                  <div style={{ position: 'relative' }}>
                    <InputIcon className="fa-solid fa-envelope" />
                    <Input
                      {...register("email", { required: "Email is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email" } })}
                      $error={errors.email}
                    />
                  </div>
                  {errors.email && <ErrorText><i className="fa-solid fa-triangle-exclamation" /> {errors.email.message}</ErrorText>}
                </InputGroup>

                <InputGroup>
                  <Label>City</Label>
                  <div style={{ position: 'relative' }}>
                    <InputIcon className="fa-solid fa-location-dot" />
                    <Input
                      {...register("city", { required: "City is required" })}
                      $error={errors.city}
                    />
                  </div>
                  {errors.city && <ErrorText><i className="fa-solid fa-triangle-exclamation" /> {errors.city.message}</ErrorText>}
                </InputGroup>

                <InputGroup>
                  <Label>Delivery Address</Label>
                  <div style={{ position: 'relative' }}>
                    <InputIcon className="fa-solid fa-map-location-dot" />
                    <Input
                      {...register("address")}
                    />
                  </div>
                </InputGroup>
              </FormGrid>

              {isDirty && (
                <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
                  <SaveButton type="submit" disabled={loading}>
                    <i className={loading ? "fa-solid fa-spinner fa-spin" : "fa-solid fa-floppy-disk"} />
                    {loading ? "Saving..." : "Save Changes"}
                  </SaveButton>
                  <DiscardButton type="button" onClick={() => reset()}>
                    Discard
                  </DiscardButton>
                </div>
              )}
            </form>
              </>
            )}
          </MainContent>
        </ContentWrapper>
      </Container>
    </Sidebar>
  );
};

export default Profile;
