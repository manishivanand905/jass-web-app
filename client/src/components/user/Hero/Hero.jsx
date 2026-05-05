import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE } from "../../../config/api";
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
  GoldDivider,
  TickerWrapper,
  TickerTrack,
  TickerCard,
  TickerImage,
  TickerLabel,
  TickerOverlay,
  StatsRow,
  StatItem,
  StatNumber,
  StatLabel,
  DesktopScrollSection,
  ScrollRow,
  ScrollTrack,
  ScrollCard,
  ScrollCardImage,
  ScrollCardOverlay,
  ScrollCardName,
  ScrollCardPrice,
} from "./HeroStyles";

const stats = [
  { number: "500+", label: "Vehicles Protected" },
  { number: "10Y", label: "Warranty" },
  { number: "100%", label: "Satisfaction" },
];

const HeroSection = () => {
  const navigate = useNavigate();
  const [heroProducts, setHeroProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/products?limit=100`);
        setHeroProducts(data.products || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  // Duplicate for seamless infinite loop
  const loopItems = [...heroProducts, ...heroProducts, ...heroProducts];
  const tickerItems = [...heroProducts, ...heroProducts];

  const half = Math.ceil(loopItems.length / 2);
  const row1 = loopItems.slice(0, half);
  const row2 = loopItems.slice(half);

  return (
    <HeroWrapper>
      <HeroInner>
        {/* MOBILE: auto-scrolling product ticker */}
        <TickerWrapper>
          <TickerTrack>
            {tickerItems.map((product, index) => (
              <TickerCard key={`${product._id}-${index}`} onClick={() => navigate(`/products/${product._id}`)}>
                <TickerImage>
                  <img src={product.image} alt={product.name} loading="lazy" />
                </TickerImage>
                <TickerOverlay>
                  <span>{product.name}</span>
                  <strong>₹{Number(product.price || 0).toLocaleString()}</strong>
                </TickerOverlay>
                <TickerLabel>
                  <p>{product.name}</p>
                  <span>₹{product.price}</span>
                </TickerLabel>
              </TickerCard>
            ))}
          </TickerTrack>
        </TickerWrapper>

        {/* LEFT TEXT CONTENT */}
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
            <SecondaryButton onClick={() => navigate("/services")}>View Services</SecondaryButton>
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

        {/* DESKTOP ONLY: 2-row infinite scroll */}
        <DesktopScrollSection>
          {/* Row 1: left to right */}
          <ScrollRow>
            <ScrollTrack $direction="left">
              {[...row1, ...row1].map((product, index) => (
                <ScrollCard
                  key={`r1-${product._id}-${index}`}
                  onClick={() => navigate(`/products/${product._id}`)}
                >
                  <ScrollCardImage>
                    <img src={product.image} alt={product.name} loading="lazy" />
                  </ScrollCardImage>
                  <ScrollCardOverlay>
                    <ScrollCardName>{product.name}</ScrollCardName>
                    <ScrollCardPrice>₹{Number(product.price || 0).toLocaleString()}</ScrollCardPrice>
                  </ScrollCardOverlay>
                </ScrollCard>
              ))}
            </ScrollTrack>
          </ScrollRow>

          {/* Row 2: right to left */}
          <ScrollRow>
            <ScrollTrack $direction="right">
              {[...row2, ...row2].map((product, index) => (
                <ScrollCard
                  key={`r2-${product._id}-${index}`}
                  onClick={() => navigate(`/products/${product._id}`)}
                >
                  <ScrollCardImage>
                    <img src={product.image} alt={product.name} loading="lazy" />
                  </ScrollCardImage>
                  <ScrollCardOverlay>
                    <ScrollCardName>{product.name}</ScrollCardName>
                    <ScrollCardPrice>₹{Number(product.price || 0).toLocaleString()}</ScrollCardPrice>
                  </ScrollCardOverlay>
                </ScrollCard>
              ))}
            </ScrollTrack>
          </ScrollRow>
        </DesktopScrollSection>
      </HeroInner>
    </HeroWrapper>
  );
};

export default HeroSection;
