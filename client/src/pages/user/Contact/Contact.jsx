import { useState } from "react";
import Sidebar from "../../../components/common/Sidebar/Sidebar";
import Footer from "../../../components/common/Footer/Footer";
import ContactForm from "../../../components/user/ContactForm/ContactForm";
import { useBookingModal } from "../../../hooks/useNewBookingModal";
import { contactInfo, whyContactUs } from "../../../data/contactData";
import {
  ContactWrapper,
  HeroSection,
  HeroOverlay,
  HeroContent,
  Eyebrow,
  HeroTitle,
  HeroSubtitle,
  QuickContactStrip,
  ContactBlock,
  ContactIcon,
  ContactLabel,
  ContactValue,
  ContactSubtext,
  MainContent,
  LeftColumn,
  ActionHub,
  ActionEyebrow,
  ActionTitle,
  ActionSubtitle,
  ActionGrid,
  ActionCard,
  ActionIcon,
  ActionCardTitle,
  ActionCardText,
  ActionButton,
  ActionNote,
  RightColumn,
  InfoCard,
  CardHeader,
  HoursTable,
  HoursRow,
  StatusBadge,
  WhyList,
  WhyItem,
  SocialLinks,
  SocialButton,
  MapSection,
  MapContainer,
  MapOverlay,
  CTABanner,
  CTAContent,
  CTATitle,
  CTASubtitle,
  CTAButtons,
  PrimaryButton,
  SecondaryButton,
  FooterFix,
} from "./ContactStyles";

const Contact = () => {
  const { openModal } = useBookingModal();
  const [activeFormType, setActiveFormType] = useState(null);

  const getCurrentDay = () => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[new Date().getDay()];
  };

  const isOpenNow = () => {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();

    if (day === 0) return false;
    if (day === 6) return hour >= 9 && hour < 17;
    return hour >= 9 && hour < 19;
  };

  return (
    <Sidebar type="user">
      <ContactWrapper>
        <HeroSection>
          <HeroOverlay />
          <HeroContent>
            <Eyebrow>GET IN TOUCH</Eyebrow>
            <HeroTitle>
              Contact <span>Us</span>
            </HeroTitle>
            <HeroSubtitle>
              Raise a support ticket, ask a query, or visit our studio. We are here to help.
            </HeroSubtitle>
          </HeroContent>
        </HeroSection>

        <QuickContactStrip>
          <ContactBlock as="a" href={`tel:${contactInfo.phone}`}>
            <ContactIcon>
              <i className="fa-solid fa-phone" />
            </ContactIcon>
            <ContactLabel>CALL US</ContactLabel>
            <ContactValue>{contactInfo.phone}</ContactValue>
            <ContactSubtext>Mon-Sat, 9AM-7PM</ContactSubtext>
          </ContactBlock>

          <ContactBlock as="a" href={`mailto:${contactInfo.email}`}>
            <ContactIcon>
              <i className="fa-solid fa-envelope" />
            </ContactIcon>
            <ContactLabel>EMAIL US</ContactLabel>
            <ContactValue>{contactInfo.email}</ContactValue>
            <ContactSubtext>Reply within 24 hours</ContactSubtext>
          </ContactBlock>

          <ContactBlock as="a" href={contactInfo.address.googleMapsUrl} target="_blank" rel="noopener noreferrer">
            <ContactIcon>
              <i className="fa-solid fa-location-dot" />
            </ContactIcon>
            <ContactLabel>VISIT US</ContactLabel>
            <ContactValue>{contactInfo.address.line1}</ContactValue>
            <ContactSubtext>{contactInfo.address.line2}</ContactSubtext>
          </ContactBlock>

          <ContactBlock
            as="a"
            href={`https://wa.me/${contactInfo.whatsapp.replace(/\s/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ContactIcon>
              <i className="fa-brands fa-whatsapp" />
            </ContactIcon>
            <ContactLabel>WHATSAPP</ContactLabel>
            <ContactValue>{contactInfo.whatsapp}</ContactValue>
            <ContactSubtext>Quick replies guaranteed</ContactSubtext>
          </ContactBlock>
        </QuickContactStrip>

        <MainContent>
          <LeftColumn>
            <ActionHub>
              <ActionEyebrow>CONTACT DESK</ActionEyebrow>
              <ActionTitle>
                Choose Your <span>Request</span>
              </ActionTitle>
              <ActionSubtitle>
                Instead of the old lets-talk form, choose the request type that fits best. Both enquiry forms and raised
                tickets are saved directly to the backend contacts section for your team.
              </ActionSubtitle>

              <ActionGrid>
                <ActionCard>
                  <ActionIcon>
                    <i className="fa-solid fa-circle-question" />
                  </ActionIcon>
                  <ActionCardTitle>Ask a Query</ActionCardTitle>
                  <ActionCardText>
                    Use this for pricing questions, service details, appointment clarifications, or any general
                    enquiry before you book.
                  </ActionCardText>
                  <ActionButton type="button" onClick={() => setActiveFormType("enquiry")}>
                    <i className="fa-solid fa-paper-plane" />
                    Open Enquiry
                  </ActionButton>
                </ActionCard>

                <ActionCard>
                  <ActionIcon>
                    <i className="fa-solid fa-life-ring" />
                  </ActionIcon>
                  <ActionCardTitle>Raise a Ticket</ActionCardTitle>
                  <ActionCardText>
                    Use this when you need help with a delivery issue, service follow-up, support problem, or an update
                    request from our team.
                  </ActionCardText>
                  <ActionButton type="button" onClick={() => setActiveFormType("ticket")}>
                    <i className="fa-solid fa-headset" />
                    Raise Ticket
                  </ActionButton>
                </ActionCard>
              </ActionGrid>

              <ActionNote>Popup submissions now create separate enquiry and ticket records in contacts.</ActionNote>
            </ActionHub>
          </LeftColumn>

          <RightColumn>
            <InfoCard>
              <CardHeader>
                <i className="fa-solid fa-clock" />
                OPENING HOURS
                <StatusBadge $open={isOpenNow()}>{isOpenNow() ? "OPEN NOW" : "CLOSED"}</StatusBadge>
              </CardHeader>
              <HoursTable>
                {contactInfo.hours.map((item, index) => (
                  <HoursRow key={index} $isToday={item.day.includes(getCurrentDay())}>
                    <span>{item.day}</span>
                    <span>{item.hours}</span>
                  </HoursRow>
                ))}
              </HoursTable>
            </InfoCard>

            <InfoCard>
              <CardHeader>
                <i className="fa-solid fa-headset" />
                WHY CHOOSE US
              </CardHeader>
              <WhyList>
                {whyContactUs.map((item, index) => (
                  <WhyItem key={index}>
                    <i className={item.icon} />
                    {item.text}
                  </WhyItem>
                ))}
              </WhyList>
            </InfoCard>

            <InfoCard>
              <CardHeader>
                <i className="fa-solid fa-share-nodes" />
                FOLLOW US
              </CardHeader>
              <SocialLinks>
                {contactInfo.social.map((item, index) => (
                  <SocialButton key={index} href={item.url} target="_blank" rel="noopener noreferrer">
                    <i className={item.icon} />
                  </SocialButton>
                ))}
              </SocialLinks>
            </InfoCard>
          </RightColumn>
        </MainContent>

        <MapSection>
          <MapContainer>
            <iframe
              src={contactInfo.address.embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Location Map"
            />
          </MapContainer>
          <MapOverlay>
            <i className="fa-solid fa-location-dot" />
            <h3>Shield Pro Studio</h3>
            <p>
              {contactInfo.address.line1}, {contactInfo.address.line2}
            </p>
            <a href={contactInfo.address.googleMapsUrl} target="_blank" rel="noopener noreferrer">
              GET DIRECTIONS -&gt;
            </a>
          </MapOverlay>
        </MapSection>

        <CTABanner>
          <CTAContent>
            <CTATitle>
              Ready to Protect <span>Your Vehicle?</span>
            </CTATitle>
            <CTASubtitle>
              Book your service today and experience the ultimate in automotive protection
            </CTASubtitle>
            <CTAButtons>
              <PrimaryButton onClick={openModal}>
                <i className="fa-solid fa-calendar-check" />
                BOOK A SERVICE
              </PrimaryButton>
              <SecondaryButton as="a" href={`tel:${contactInfo.phone}`}>
                <i className="fa-solid fa-phone" />
                CALL US NOW
              </SecondaryButton>
            </CTAButtons>
          </CTAContent>
        </CTABanner>
      </ContactWrapper>

      <ContactForm
        isOpen={Boolean(activeFormType)}
        requestType={activeFormType || "enquiry"}
        onClose={() => setActiveFormType(null)}
      />

      <FooterFix>
        <Footer />
      </FooterFix>
    </Sidebar>
  );
};

export default Contact;
