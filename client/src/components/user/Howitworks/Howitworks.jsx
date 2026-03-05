import React from "react";
import { motion } from "framer-motion";
import { howItWorksData } from "../../../data/howitworksdata";
import AnimatedSection from "../../common/AnimatedSection/AnimatedSection";
import { staggerContainer, staggerItem } from "../../../animations/variants";
import { useScrollAnimation } from "../../../hooks/useScrollAnimation";
import {
  SectionWrapper,
  Inner,
  SectionHeader,
  Eyebrow,
  SectionTitle,
  StepsRow,
  StepItem,
  IconBlock,
  RingOuter,
  IconCircle,
  StepNumber,
  StepTitle,
  StepDescription,
} from "./HowitworksStyles";

const STEP_DELAYS = ["0.1s", "0.25s", "0.4s"];

const HowItWorks = () => {
  const { eyebrow, title, titleAccent, steps } = howItWorksData;
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

        {/* Steps */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={staggerContainer}
        >
          <StepsRow>
            {steps.map((step, index) => (
              <motion.div key={step.id} variants={staggerItem}>
                <StepItem $delay={STEP_DELAYS[index]}>
                  {/* Icon with rotating ring */}
                  <IconBlock>
                    <RingOuter />
                    <IconCircle>
                      <i className={step.icon} aria-hidden="true" />
                    </IconCircle>
                    <StepNumber>{step.step}</StepNumber>
                  </IconBlock>

                  {/* Text */}
                  <StepTitle>{step.title}</StepTitle>
                  <StepDescription>{step.description}</StepDescription>
                </StepItem>
              </motion.div>
            ))}
          </StepsRow>
        </motion.div>
      </Inner>
    </SectionWrapper>
  );
};

export default HowItWorks;
