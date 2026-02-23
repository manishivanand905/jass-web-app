import Sidebar from "../../../components/common/Sidebar/Sidebar";
import Footer from "../../../components/common/Footer/Footer";
import { ProfileWrapper, ProfileCard, Avatar, UserName, UserEmail, InfoSection, InfoItem, Label, Value } from "./ProfileStyles";

const Profile = () => {
  return (
    <Sidebar type="user">
      <ProfileWrapper>
        <ProfileCard>
          <Avatar>U</Avatar>
          <UserName>User Name</UserName>
          <UserEmail>user@example.com</UserEmail>
          
          <InfoSection>
            <InfoItem>
              <Label><i className="fa-solid fa-phone" /> Phone</Label>
              <Value>+91 XXXXX XXXXX</Value>
            </InfoItem>
            <InfoItem>
              <Label><i className="fa-solid fa-location-dot" /> Address</Label>
              <Value>City, State</Value>
            </InfoItem>
            <InfoItem>
              <Label><i className="fa-solid fa-calendar" /> Member Since</Label>
              <Value>January 2024</Value>
            </InfoItem>
          </InfoSection>
        </ProfileCard>
      </ProfileWrapper>
      <Footer />
    </Sidebar>
  );
};

export default Profile;
