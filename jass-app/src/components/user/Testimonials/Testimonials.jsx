import React from "react";
import { motion } from "framer-motion";
import { testimonialsData } from "../../../data/testimonialsData";
import AnimatedSection from "../../common/AnimatedSection/AnimatedSection";
import { staggerContainer, staggerItem } from "../../../animations/variants";
import { useScrollAnimation } from "../../../hooks/useScrollAnimation";
import {
  SectionWrapper,
  Inner,
  SectionHeader,
  Eyebrow,
  SectionTitle,
  CardsGrid,
  ReviewCard,
  CardTopRow,
  StarsRow,
  QuoteIcon,
  ReviewText,
  AuthorBlock,
  AuthorName,
  AuthorVehicle,
} from "./TestimonialsStyles";

const CARD_DELAYS = ["0.1s", "0.2s", "0.3s", "0.4s"];

// Renders filled + empty stars using FA icons
const StarRating = ({ rating, max = 5 }) => (
  <StarsRow>
    {Array.from({ length: max }, (_, i) => (
      <i
        key={i}
        className={i < rating ? "fa-solid fa-star" : "fa-solid fa-star empty"}
        aria-hidden="true"
      />
    ))}
  </StarsRow>
);

const Testimonials = () => {
  const { eyebrow, title, titleAccent, reviews } = testimonialsData;
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

        {/* Review Cards */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={staggerContainer}
        >
          <CardsGrid>
            {reviews.map((review, index) => (
              <motion.div key={review.id} variants={staggerItem}>
                <ReviewCard $delay={CARD_DELAYS[index]}>
                  {/* Stars + Quote icon */}
                  <CardTopRow>
                    <StarRating rating={review.rating} />
                    <QuoteIcon>
                      <i className="fa-solid fa-quote-right" aria-hidden="true" />
                    </QuoteIcon>
                  </CardTopRow>

                  {/* Review body */}
                  <ReviewText>{review.review}</ReviewText>

                  {/* Author */}
                  <AuthorBlock>
                    <AuthorName>{review.name}</AuthorName>
                    <AuthorVehicle>{review.vehicle}</AuthorVehicle>
                  </AuthorBlock>
                </ReviewCard>
              </motion.div>
            ))}
          </CardsGrid>
        </motion.div>
      </Inner>
    </SectionWrapper>
  );
};

export default Testimonials;
