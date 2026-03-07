import Sidebar from "../../../components/common/Sidebar/Sidebar";
import Footer from "../../../components/common/Footer/Footer";
import { motion } from "framer-motion";
import AnimatedSection from "../../../components/common/AnimatedSection/AnimatedSection";
import { staggerContainer, staggerItem } from "../../../animations/variants";
import { useScrollAnimation } from "../../../hooks/useScrollAnimation";
import { useBookingModal } from "../../../hooks/useNewBookingModal";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

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
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [combos, setCombos] = useState([]);
  const [loading, setLoading] = useState(true);

  const { ref: statsRef, controls: statsControls } = useScrollAnimation(0.2);
  const { ref: comboRef, controls: comboControls } = useScrollAnimation(0.15);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const { data } = await axios.get(`${apiUrl}/api/services`);
      const normalServices = data.filter(s => s.category !== 'combo');
      const comboServices = data.filter(s => s.category === 'combo');
      const allCombos = comboServices.flatMap(s => s.combos || []);
      setServices(normalServices);
      setCombos(allCombos);
    } catch (error) {
      console.error('Failed to fetch services');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Sidebar type="user">
        <ServicesWrapper>
          <div style={{ textAlign: 'center', padding: '100px 20px', color: 'rgba(236, 236, 236, 0.4)' }}>
            <i className="fas fa-spinner fa-spin" style={{ fontSize: '3rem' }}></i>
          </div>
        </ServicesWrapper>
        <Footer />
      </Sidebar>
    );
  }

  return (
    <Sidebar type="user">
      <ServicesWrapper>
        {/* HERO SECTION */}
        <AnimatedSection animation="fadeInUp">
          <HeroSection>
            <HeroOverlay />
            <HeroContent>
              <Eyebrow>WHAT WE OFFER</Eyebrow>
              <HeroTitle>
                OUR <span>SERVICES</span>
              </HeroTitle>
              <HeroSubtitle>
                Professional automotive protection services delivered by
                certified technicians
              </HeroSubtitle>
            </HeroContent>
          </HeroSection>
        </AnimatedSection>

        {/* STATS STRIP */}
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

        {/* DYNAMIC SERVICES */}
        {services.length > 0 ? services.map((service, index) => {
          const isReverse = index % 2 !== 0;
          const titleParts = service.title.split(" ");

          return (
            <ServiceSection key={service._id} $reverse={isReverse}>
              <ServiceGrid $reverse={isReverse}>
                {/* IMAGE LEFT */}
                {!isReverse && (
                  <AnimatedSection animation="fadeInLeft" delay={0.2}>
                    <ImagePanel>
                      <ServiceImage src={service.image} alt={service.title} />
                      <ImageBadge>{service.title.toUpperCase()}</ImageBadge>
                    </ImagePanel>
                  </AnimatedSection>
                )}

                {/* CONTENT */}
                <AnimatedSection
                  animation={isReverse ? "fadeInLeft" : "fadeInRight"}
                  delay={0.4}
                >
                  <ContentPanel>
                    <ServiceEyebrow>
                      SERVICE {String(index + 1).padStart(2, "0")}
                    </ServiceEyebrow>

                    <ServiceTitle>
                      {titleParts[0]}{" "}
                      <span>{titleParts.slice(1).join(" ")}</span>
                    </ServiceTitle>

                    <ServiceDescription>
                      {service.description}
                    </ServiceDescription>

                    <TiersRow>
                      {service.tiers?.map((tier) => (
                        <TierCard key={tier._id}>
                          <TierIcon>
                            <i className={tier.icon} />
                          </TierIcon>

                          <TierName>{tier.name}</TierName>

                          <TierCoverage>{tier.coverage}</TierCoverage>

                          <TierPrice>₹{tier.price.toLocaleString()}</TierPrice>

                          <TierButton
                            onClick={() =>
                              openModal({
                                category: service.category,
                                serviceName: service.title,
                                tier: tier.tier,
                                tierName: tier.name,
                                price: tier.price
                              })
                            }
                          >
                            Book Now →
                          </TierButton>
                        </TierCard>
                      ))}
                    </TiersRow>

                    <BenefitsList>
                      {service.benefits?.map((benefit, i) => (
                        <BenefitItem key={i}>
                          <i className="fa-solid fa-check" />
                          {benefit}
                        </BenefitItem>
                      ))}
                    </BenefitsList>
                  </ContentPanel>
                </AnimatedSection>

                {/* IMAGE RIGHT */}
                {isReverse && (
                  <AnimatedSection animation="fadeInRight" delay={0.2}>
                    <ImagePanel>
                      <ServiceImage src={service.image} alt={service.title} />
                      <ImageBadge>{service.title.toUpperCase()}</ImageBadge>
                    </ImagePanel>
                  </AnimatedSection>
                )}
              </ServiceGrid>
            </ServiceSection>
          );
        }) : <div style={{ textAlign: 'center', padding: '50px 20px', color: 'rgba(236, 236, 236, 0.4)' }}>No services available</div>}

        {/* COMBO SECTION */}
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
              {combos.length > 0 ? combos.map((combo) => (
                <motion.div key={combo._id} variants={staggerItem}>
                  <ComboCard $popular={combo.popular}>
                    {combo.popular && <PopularBadge>MOST POPULAR</PopularBadge>}

                    <ComboTopBar />

                    <ComboIconCircle>
                      <i className={combo.icon} />
                    </ComboIconCircle>

                    <ComboName>{combo.name}</ComboName>

                    <ComboIncludes>
                      {combo.includes?.map((item, i) => (
                        <li key={i}>
                          <i className="fa-solid fa-check" />
                          {item}
                        </li>
                      ))}
                    </ComboIncludes>

                    <ComboPricing>
                      {combo.originalPrice && (
                        <OldPrice>
                          ₹{combo.originalPrice.toLocaleString()}
                        </OldPrice>
                      )}
                      <NewPrice>₹{combo.price.toLocaleString()}</NewPrice>
                    </ComboPricing>

                    <ComboButton
                      onClick={() => openModal({
                        category: "combo",
                        serviceName: combo.name,
                        tierName: combo.includes?.join(', ') || 'Combo Package',
                        price: combo.price,
                        originalPrice: combo.originalPrice,
                        isCombo: true
                      })}
                    >
                      BOOK NOW
                    </ComboButton>
                  </ComboCard>
                </motion.div>
              )) : <div style={{ textAlign: 'center', padding: '50px 20px', color: 'rgba(236, 236, 236, 0.4)' }}>No combo packages available</div>}
            </ComboGrid>
          </motion.div>
        </ComboSection>

        {/* CTA */}
        <AnimatedSection animation="fadeInUp">
          <CTABanner>
            <CTAContent>
              <CTATitle>
                READY TO PROTECT <span>YOUR VEHICLE?</span>
              </CTATitle>

              <CTASubtitle>
                Book your service today and experience premium automotive
                protection
              </CTASubtitle>

              <CTAButtons>
                <PrimaryButton onClick={() => navigate('/products')}>
                  <i className="fa-solid fa-box" />
                  VIEW PRODUCTS
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
