import Sidebar from "../../../components/common/Sidebar/Sidebar";
import Footer from "../../../components/common/Footer/Footer";
import { motion } from "framer-motion";
import AnimatedSection from "../../../components/common/AnimatedSection/AnimatedSection";
import { staggerContainer, staggerItem } from "../../../animations/variants";
import { useScrollAnimation } from "../../../hooks/useScrollAnimation";
import { useBookingModal } from "../../../hooks/useNewBookingModal";
import {
  ServicesWrapper,
  HeroSection,
  HeroOverlay,
  HeroContent,
  Eyebrow,
  HeroTitle,
  HeroSubtitle,
  StatsStrip,
  StatBlock,
  StatNumber,
  StatLabel,
  StatDivider,
  ServiceSection,
  ServiceGrid,
  ImagePanel,
  ServiceImage,
  ImageBadge,
  ContentPanel,
  ServiceEyebrow,
  ServiceTitle,
  ServiceDescription,
  TiersRow,
  TierCard,
  TierIcon,
  TierName,
  TierCoverage,
  TierPrice,
  TierButton,
  BenefitsList,
  BenefitItem,
  ComboSection,
  ComboHeader,
  ComboGrid,
  ComboCard,
  ComboTopBar,
  ComboIconCircle,
  ComboName,
  ComboIncludes,
  ComboPricing,
  OldPrice,
  NewPrice,
  ComboButton,
  PopularBadge,
  CTABanner,
  CTAContent,
  CTATitle,
  CTASubtitle,
  CTAButtons,
  PrimaryButton,
  SecondaryButton,
} from "./ServicesStyles";

const Services = () => {
  const { openModal } = useBookingModal();
  const { ref: statsRef, controls: statsControls } = useScrollAnimation(0.3);
  const { ref: tiersRef1, controls: tiersControls1 } = useScrollAnimation(0.2);
  const { ref: tiersRef2, controls: tiersControls2 } = useScrollAnimation(0.2);
  const { ref: comboRef, controls: comboControls } = useScrollAnimation(0.2);

  return (
    <Sidebar type="user">
      <ServicesWrapper>
        {/* Hero Banner */}
        <AnimatedSection animation="fadeInUp">
          <HeroSection>
            <HeroOverlay />
            <HeroContent>
              <Eyebrow>WHAT WE OFFER</Eyebrow>
              <HeroTitle>
                OUR <span>SERVICES</span>
              </HeroTitle>
              <HeroSubtitle>
                Professional PPF installation and ceramic coating services
                delivered by certified technicians
              </HeroSubtitle>
            </HeroContent>
          </HeroSection>
        </AnimatedSection>

        {/* Stats Strip */}
        <motion.div
          ref={statsRef}
          initial="hidden"
          animate={statsControls}
          variants={staggerContainer}
        >
          <StatsStrip>
            <motion.div variants={staggerItem}>
              <StatBlock>
                <StatNumber>50+</StatNumber>
                <StatLabel>Vehicles Protected</StatLabel>
              </StatBlock>
            </motion.div>
            <StatDivider />
            <motion.div variants={staggerItem}>
              <StatBlock>
                <StatNumber>3 Years</StatNumber>
                <StatLabel>Industry Experience</StatLabel>
              </StatBlock>
            </motion.div>
            <StatDivider />
            <motion.div variants={staggerItem}>
              <StatBlock>
                <StatNumber>100%</StatNumber>
                <StatLabel>Satisfaction Guaranteed</StatLabel>
              </StatBlock>
            </motion.div>
          </StatsStrip>
        </motion.div>

        {/* PPF Section */}
        <ServiceSection>
          <ServiceGrid>
            <AnimatedSection animation="fadeInLeft">
              <ImagePanel>
                <ServiceImage
                  src="https://images.pexels.com/photos/20051468/pexels-photo-20051468.jpeg"
                  alt="PPF Installation"
                />
                <ImageBadge>PAINT PROTECTION FILM</ImageBadge>
              </ImagePanel>
            </AnimatedSection>
            <AnimatedSection animation="fadeInRight" delay={0.2}>
              <ContentPanel>
                <ServiceEyebrow>SERVICE 01</ServiceEyebrow>
                <ServiceTitle>
                  Paint Protection <span>Film</span>
                </ServiceTitle>
                <ServiceDescription>
                  Our premium paint protection film provides an invisible shield
                  against rock chips, scratches, and environmental damage.
                  Featuring self-healing technology and backed by a 10-year
                  warranty, PPF maintains your vehicle's pristine finish while
                  preserving its resale value.
                </ServiceDescription>
                <motion.div
                  ref={tiersRef1}
                  initial="hidden"
                  animate={tiersControls1}
                  variants={staggerContainer}
                >
                  <TiersRow>
                    <motion.div variants={staggerItem}>
                      <TierCard>
                        <TierIcon>
                          <i className="fa-solid fa-shield" />
                        </TierIcon>
                        <TierName>Basic PPF</TierName>
                        <TierCoverage>Hood + bumpers</TierCoverage>
                        <TierPrice>₹8,999</TierPrice>
                        <TierButton onClick={openModal}>Book Now →</TierButton>
                      </TierCard>
                    </motion.div>
                    <motion.div variants={staggerItem}>
                      <TierCard>
                        <TierIcon>
                          <i className="fa-solid fa-shield-halved" />
                        </TierIcon>
                        <TierName>Standard PPF</TierName>
                        <TierCoverage>
                          Hood + bumpers + fenders + mirrors
                        </TierCoverage>
                        <TierPrice>₹14,999</TierPrice>
                        <TierButton onClick={openModal}>Book Now →</TierButton>
                      </TierCard>
                    </motion.div>
                    <motion.div variants={staggerItem}>
                      <TierCard>
                        <TierIcon>
                          <i className="fa-solid fa-car" />
                        </TierIcon>
                        <TierName>Full Body PPF</TierName>
                        <TierCoverage>Complete vehicle coverage</TierCoverage>
                        <TierPrice>₹24,999</TierPrice>
                        <TierButton onClick={openModal}>Book Now →</TierButton>
                      </TierCard>
                    </motion.div>
                  </TiersRow>
                </motion.div>
                <BenefitsList>
                  <BenefitItem>
                    <i className="fa-solid fa-check" />
                    Self-healing technology
                  </BenefitItem>
                  <BenefitItem>
                    <i className="fa-solid fa-check" />
                    10-year warranty
                  </BenefitItem>
                  <BenefitItem>
                    <i className="fa-solid fa-check" />
                    UV & yellowing resistant
                  </BenefitItem>
                  <BenefitItem>
                    <i className="fa-solid fa-check" />
                    Hydrophobic top coat
                  </BenefitItem>
                </BenefitsList>
              </ContentPanel>
            </AnimatedSection>
          </ServiceGrid>
        </ServiceSection>

        {/* Ceramic Coating Section */}
        <ServiceSection $reverse>
          <ServiceGrid $reverse>
            <AnimatedSection animation="fadeInLeft">
              <ContentPanel>
                <ServiceEyebrow>SERVICE 02</ServiceEyebrow>
                <ServiceTitle>
                  Ceramic <span>Coating</span>
                </ServiceTitle>
                <ServiceDescription>
                  Professional-grade nano-ceramic coating creates a permanent bond
                  with your vehicle's paint, delivering 9H hardness protection and
                  a stunning mirror finish. Experience extreme hydrophobic
                  properties and long-lasting chemical resistance.
                </ServiceDescription>
                <motion.div
                  ref={tiersRef2}
                  initial="hidden"
                  animate={tiersControls2}
                  variants={staggerContainer}
                >
                  <TiersRow>
                    <motion.div variants={staggerItem}>
                      <TierCard>
                        <TierIcon>
                          <i className="fa-solid fa-spray-can" />
                        </TierIcon>
                        <TierName>Ceramic Spray</TierName>
                        <TierCoverage>Single coat maintenance spray</TierCoverage>
                        <TierPrice>₹2,999</TierPrice>
                        <TierButton onClick={openModal}>Book Now →</TierButton>
                      </TierCard>
                    </motion.div>
                    <motion.div variants={staggerItem}>
                      <TierCard>
                        <TierIcon>
                          <i className="fa-solid fa-star" />
                        </TierIcon>
                        <TierName>Ceramic Pro</TierName>
                        <TierCoverage>Full vehicle 9H coating</TierCoverage>
                        <TierPrice>₹8,999</TierPrice>
                        <TierButton onClick={openModal}>Book Now →</TierButton>
                      </TierCard>
                    </motion.div>
                    <motion.div variants={staggerItem}>
                      <TierCard>
                        <TierIcon>
                          <i className="fa-solid fa-crown" />
                        </TierIcon>
                        <TierName>Ceramic Elite</TierName>
                        <TierCoverage>Multi-layer + paint correction</TierCoverage>
                        <TierPrice>₹15,999</TierPrice>
                        <TierButton onClick={openModal}>Book Now →</TierButton>
                      </TierCard>
                    </motion.div>
                  </TiersRow>
                </motion.div>
                <BenefitsList>
                  <BenefitItem>
                    <i className="fa-solid fa-check" />
                    9H hardness
                  </BenefitItem>
                  <BenefitItem>
                    <i className="fa-solid fa-check" />
                    5-year durability
                  </BenefitItem>
                  <BenefitItem>
                    <i className="fa-solid fa-check" />
                    Extreme hydrophobic
                  </BenefitItem>
                  <BenefitItem>
                    <i className="fa-solid fa-check" />
                    Chemical resistant
                  </BenefitItem>
                </BenefitsList>
              </ContentPanel>
            </AnimatedSection>
            <AnimatedSection animation="fadeInRight" delay={0.2}>
              <ImagePanel>
                <ServiceImage
                  src="https://images.pexels.com/photos/20042055/pexels-photo-20042055.jpeg"
                  alt="Ceramic Coating"
                />
                <ImageBadge>CERAMIC COATING</ImageBadge>
              </ImagePanel>
            </AnimatedSection>
          </ServiceGrid>
        </ServiceSection>

        {/* Combo Packages */}
        <ComboSection>
          <AnimatedSection animation="fadeInUp">
            <ComboHeader>
              <Eyebrow>BEST VALUE</Eyebrow>
              <HeroTitle>
                COMBO <span>PACKAGES</span>
              </HeroTitle>
            </ComboHeader>
          </AnimatedSection>
          <motion.div
            ref={comboRef}
            initial="hidden"
            animate={comboControls}
            variants={staggerContainer}
          >
            <ComboGrid>
              <motion.div variants={staggerItem}>
                <ComboCard>
                  <ComboTopBar />
                  <ComboIconCircle>
                    <i className="fa-solid fa-layer-group" />
                  </ComboIconCircle>
                  <ComboName>Starter Shield</ComboName>
                  <ComboIncludes>
                    <li>
                      <i className="fa-solid fa-check" />
                      Basic PPF
                    </li>
                    <li>
                      <i className="fa-solid fa-check" />
                      Ceramic Spray
                    </li>
                  </ComboIncludes>
                  <ComboPricing>
                    <NewPrice>₹10,999</NewPrice>
                  </ComboPricing>
                  <ComboButton onClick={openModal}>BOOK NOW</ComboButton>
                </ComboCard>
              </motion.div>
              <motion.div variants={staggerItem}>
                <ComboCard $popular>
                  <PopularBadge>MOST POPULAR</PopularBadge>
                  <ComboTopBar />
                  <ComboIconCircle>
                    <i className="fa-solid fa-shield-halved" />
                  </ComboIconCircle>
                  <ComboName>Pro Guard</ComboName>
                  <ComboIncludes>
                    <li>
                      <i className="fa-solid fa-check" />
                      Standard PPF
                    </li>
                    <li>
                      <i className="fa-solid fa-check" />
                      Ceramic Pro
                    </li>
                  </ComboIncludes>
                  <ComboPricing>
                    <OldPrice>₹23,998</OldPrice>
                    <NewPrice>₹21,999</NewPrice>
                  </ComboPricing>
                  <ComboButton onClick={openModal}>BOOK NOW</ComboButton>
                </ComboCard>
              </motion.div>
              <motion.div variants={staggerItem}>
                <ComboCard>
                  <ComboTopBar />
                  <ComboIconCircle>
                    <i className="fa-solid fa-crown" />
                  </ComboIconCircle>
                  <ComboName>Elite Armour</ComboName>
                  <ComboIncludes>
                    <li>
                      <i className="fa-solid fa-check" />
                      Full Body PPF
                    </li>
                    <li>
                      <i className="fa-solid fa-check" />
                      Ceramic Elite
                    </li>
                  </ComboIncludes>
                  <ComboPricing>
                    <OldPrice>₹40,998</OldPrice>
                    <NewPrice>₹37,999</NewPrice>
                  </ComboPricing>
                  <ComboButton onClick={openModal}>BOOK NOW</ComboButton>
                </ComboCard>
              </motion.div>
            </ComboGrid>
          </motion.div>
        </ComboSection>

        {/* CTA Banner */}
        <AnimatedSection animation="fadeInUp">
          <CTABanner>
            <CTAContent>
              <CTATitle>
                READY TO PROTECT <span>YOUR VEHICLE?</span>
              </CTATitle>
              <CTASubtitle>
                Book your service today and experience the ultimate in automotive
                protection
              </CTASubtitle>
              <CTAButtons>
                <PrimaryButton onClick={openModal}>
                  <i className="fa-solid fa-calendar-check" />
                  BOOK A SERVICE
                </PrimaryButton>
                <SecondaryButton>
                  <i className="fa-solid fa-phone" />
                  CONTACT US
                </SecondaryButton>
              </CTAButtons>
            </CTAContent>
          </CTABanner>
        </AnimatedSection>
      </ServicesWrapper>
      <Footer />
    </Sidebar>
  );
};

export default Services;
