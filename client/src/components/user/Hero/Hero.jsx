import React from "react";
import { useNavigate } from "react-router-dom";
import { heroProducts } from "../../../data/productsData";
import {
  HeroWrapper,
  HeroInner,
  LeftContent,
  BadgeWrapper,
  BadgeDot,
  BadgeText,
  HeroTitle,
  HeroSubtitle,
  CTAGroup,
  PrimaryButton,
  SecondaryButton,
  ProductsGrid,
  ProductCard,
  ProductImageWrapper,
  GoldDivider,
  TickerWrapper,
  TickerTrack,
  TickerCard,
  TickerImage,
  TickerLabel,
  StatsRow,
  StatItem,
  StatNumber,
  StatLabel,
} from "./HeroStyles";

// Duplicate products so ticker loops seamlessly
const tickerItems = [...heroProducts, ...heroProducts];

const stats = [
  { number: "500+", label: "Vehicles Protected" },
  { number: "10Y", label: "Warranty" },
  { number: "100%", label: "Satisfaction" },
];

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <HeroWrapper>
      <HeroInner>
        {/* TABLET + MOBILE: auto-scrolling product ticker */}
        <TickerWrapper>
          <TickerTrack>
            {tickerItems.map((product, index) => (
              <TickerCard key={`${product.id}-${index}`}>
                <TickerImage>
                  <img src={product.image} alt={product.name} loading="lazy" />
                </TickerImage>
                <TickerLabel>
                  <p>{product.name}</p>
                  <span>{product.price}</span>
                </TickerLabel>
              </TickerCard>
            ))}
          </TickerTrack>
        </TickerWrapper>

        {/* ALL BREAKPOINTS: left text content */}
        <LeftContent>
          <BadgeWrapper>
            <BadgeDot />
            <BadgeText>Premium Protection</BadgeText>
          </BadgeWrapper>

          <HeroTitle>
            PPF &amp;
            <span className="gold">Ceramic</span>
            Coating
          </HeroTitle>

          <GoldDivider />

          <HeroSubtitle>
            Shield your vehicle with world-class paint protection film and
            ceramic coatings. Professional grade products for ultimate defence.
          </HeroSubtitle>

          <CTAGroup>
            <PrimaryButton onClick={() => navigate("/products")}>
              Explore Products
              <span className="arrow">→</span>
            </PrimaryButton>
            <SecondaryButton onClick={() => navigate("/explore")}>View PPF</SecondaryButton>
          </CTAGroup>
        </LeftContent>

        {/* TABLET + MOBILE: stats strip */}
        <StatsRow>
          {stats.map((stat) => (
            <StatItem key={stat.label}>
              <StatNumber>{stat.number}</StatNumber>
              <StatLabel>{stat.label}</StatLabel>
            </StatItem>
          ))}
        </StatsRow>

        {/* DESKTOP ONLY: floating product grid */}
        <ProductsGrid>
          {heroProducts.slice(0, 6).map((product, index) => (
            <ProductCard key={product.id} $delay={index * 0.15}>
              <ProductImageWrapper>
                <img src={product.image} alt={product.name} loading="lazy" />
              </ProductImageWrapper>
            </ProductCard>
          ))}
        </ProductsGrid>
      </HeroInner>
    </HeroWrapper>
  );
};

export default HeroSection;
