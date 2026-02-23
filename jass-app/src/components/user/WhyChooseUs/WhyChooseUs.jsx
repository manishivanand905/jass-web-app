import React from "react";
import { motion } from "framer-motion";
import { whyChooseUsData } from "../../../data/whyChooseUsdata";
import AnimatedSection from "../../common/AnimatedSection/AnimatedSection";
import { staggerContainer, staggerItem } from "../../../animations/variants";
import { useScrollAnimation } from "../../../hooks/useScrollAnimation";
import {
  SectionWrapper,
  Inner,
  SectionHeader,
  Eyebrow,
  SectionTitle,
  FeaturesGrid,
  FeatureCard,
  IconCircle,
  FeatureTitle,
  FeatureDescription,
} from "./WhyChooseUsStyles";

const CARD_DELAYS = ["0.1s", "0.2s", "0.3s", "0.4s"];

const WhyChooseUs = () => {
  const { eyebrow, title, titleAccent, features } = whyChooseUsData;
  const { ref, controls } = useScrollAnimation(0.2);

  return (
    <SectionWrapper>
      <Inner>
        {/* Header */}
        <AnimatedSection animation="fadeInUp">
          <SectionHeader>
            <Eyebrow>{eyebrow}</Eyebrow>
            <SectionTitle>
              {title} <span>{titleAccent}</span>
            </SectionTitle>
          </SectionHeader>
        </AnimatedSection>

        {/* Feature Cards */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={staggerContainer}
        >
          <FeaturesGrid>
            {features.map((feature, index) => (
              <motion.div key={feature.id} variants={staggerItem}>
                <FeatureCard $delay={CARD_DELAYS[index]}>
                  <IconCircle>
                    <i className={feature.icon} aria-hidden="true" />
                  </IconCircle>
                  <FeatureTitle>{feature.title}</FeatureTitle>
                  <FeatureDescription>{feature.description}</FeatureDescription>
                </FeatureCard>
              </motion.div>
            ))}
          </FeaturesGrid>
        </motion.div>
      </Inner>
    </SectionWrapper>
  );
};

export default WhyChooseUs;
