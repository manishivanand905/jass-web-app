import { useState } from "react";
import Sidebar from "../../../components/common/Sidebar/Sidebar";
import Footer from "../../../components/common/Footer/Footer";
import ReviewCard from "../../../components/user/ReviewCard/ReviewCard";
import ReviewForm from "../../../components/user/ReviewForm/ReviewForm";
import { reviewsData, overallStats, featuredReview } from "../../../data/reviewsData";
import {
  ReviewsWrapper,
  HeroSection,
  HeroOverlay,
  HeroContent,
  Eyebrow,
  HeroTitle,
  HeroSubtitle,
  StatsStrip,
  StatsGrid,
  StatBlock,
  OverallScore,
  ScoreNumber,
  Stars,
  ScoreLabel,
  BreakdownBlock,
  BreakdownRow,
  BarTrack,
  BarFill,
  Percentage,
  ServiceBlock,
  ServiceRow,
  TrustBlock,
  TrustItem,
  FilterBar,
  FilterPills,
  FilterPill,
  SearchInput,
  SortSection,
  SortLabel,
  SortSelect,
  ResultsCount,
  ReviewsGrid,
  FeaturedCard,
  FeaturedImage,
  FeaturedContent,
  FeaturedBadge,
  LoadMoreButton,
} from "./ReviewsStyles";

const Reviews = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [visibleCount, setVisibleCount] = useState(12);

  const filterReviews = () => {
    let filtered = [...reviewsData];

    if (activeFilter !== "All") {
      if (activeFilter.includes("★")) {
        const rating = parseInt(activeFilter);
        filtered = filtered.filter((r) => r.rating === rating);
      } else {
        filtered = filtered.filter((r) => r.service === activeFilter);
      }
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (r) =>
          r.review.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.vehicle.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortBy === "highest") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "lowest") {
      filtered.sort((a, b) => a.rating - b.rating);
    } else if (sortBy === "helpful") {
      filtered.sort((a, b) => b.helpful - a.helpful);
    }

    return filtered;
  };

  const filteredReviews = filterReviews();
  const displayedReviews = filteredReviews.slice(0, visibleCount);

  const renderStars = (rating, size = "20px") => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i
          key={i}
          className="fa-solid fa-star"
          style={{ color: i <= rating ? "#cc0000" : "rgba(255,255,255,0.2)", fontSize: size }}
        />
      );
    }
    return stars;
  };

  return (
    <Sidebar type="user">
      <ReviewsWrapper>
        <HeroSection>
          <HeroOverlay />
          <HeroContent>
            <Eyebrow>CUSTOMER STORIES</Eyebrow>
            <HeroTitle>
              Real <span>Reviews</span>
            </HeroTitle>
            <HeroSubtitle>Honest reviews from real vehicle owners across India</HeroSubtitle>
          </HeroContent>
        </HeroSection>

        <StatsStrip>
          <StatsGrid>
            <StatBlock>
              <OverallScore>
                <ScoreNumber>{overallStats.averageRating}</ScoreNumber>
                <Stars>{renderStars(5, "24px")}</Stars>
                <ScoreLabel>Based on {overallStats.totalReviews} reviews</ScoreLabel>
              </OverallScore>
            </StatBlock>

            <StatBlock>
              <BreakdownBlock>
                {overallStats.breakdown.map((item) => (
                  <BreakdownRow key={item.stars}>
                    <span>{item.stars}★</span>
                    <BarTrack>
                      <BarFill $percentage={item.percentage} />
                    </BarTrack>
                    <Percentage>{item.percentage}%</Percentage>
                  </BreakdownRow>
                ))}
              </BreakdownBlock>
            </StatBlock>

            <StatBlock>
              <ServiceBlock>
                <ServiceRow>
                  <span>PPF Reviews</span>
                  <div>
                    <i className="fa-solid fa-star" /> {overallStats.ppfRating} ({overallStats.ppfCount})
                  </div>
                </ServiceRow>
                <ServiceRow>
                  <span>Ceramic Reviews</span>
                  <div>
                    <i className="fa-solid fa-star" /> {overallStats.ceramicRating} ({overallStats.ceramicCount})
                  </div>
                </ServiceRow>
              </ServiceBlock>
            </StatBlock>

            <StatBlock>
              <TrustBlock>
                <TrustItem>
                  <i className="fa-solid fa-certificate" />
                  Verified Purchases Only
                </TrustItem>
                <TrustItem>
                  <i className="fa-solid fa-shield-halved" />
                  No Fake Reviews
                </TrustItem>
              </TrustBlock>
            </StatBlock>
          </StatsGrid>
        </StatsStrip>

        <FilterBar>
          <FilterPills>
            {["All", "PPF", "Ceramic", "Accessory", "5★", "4★"].map((filter) => (
              <FilterPill key={filter} $active={activeFilter === filter} onClick={() => setActiveFilter(filter)}>
                {filter}
              </FilterPill>
            ))}
          </FilterPills>

          <SearchInput>
            <i className="fa-solid fa-magnifying-glass" />
            <input
              type="text"
              placeholder="Search reviews..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SearchInput>

          <SortSection>
            <SortLabel>SORT BY</SortLabel>
            <SortSelect value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="newest">Newest</option>
              <option value="highest">Highest Rated</option>
              <option value="lowest">Lowest Rated</option>
              <option value="helpful">Most Helpful</option>
            </SortSelect>
          </SortSection>
        </FilterBar>

        <ResultsCount>
          Showing {displayedReviews.length} of {filteredReviews.length} reviews
        </ResultsCount>

        <ReviewsGrid>
          {featuredReview && activeFilter === "All" && !searchQuery && (
            <FeaturedCard>
              <FeaturedBadge>FEATURED REVIEW</FeaturedBadge>
              <FeaturedImage>
                <img src={featuredReview.featuredImage} alt="Featured" />
                <div className="play-button">
                  <i className="fa-solid fa-circle-play" />
                </div>
              </FeaturedImage>
              <FeaturedContent>
                <Stars>{renderStars(featuredReview.rating, "22px")}</Stars>
                <p>"{featuredReview.review}"</p>
                <div className="author">
                  <i className="fa-solid fa-circle-user" />
                  <strong>{featuredReview.name}</strong>
                  <span>
                    {featuredReview.vehicle} • {featuredReview.city}
                  </span>
                </div>
              </FeaturedContent>
            </FeaturedCard>
          )}

          {displayedReviews.map((review, index) => (
            <ReviewCard key={review.id} review={review} index={index} />
          ))}
        </ReviewsGrid>

        {displayedReviews.length < filteredReviews.length && (
          <LoadMoreButton onClick={() => setVisibleCount(visibleCount + 12)}>
            LOAD MORE REVIEWS <i className="fa-solid fa-chevron-down" />
          </LoadMoreButton>
        )}

        <ReviewForm />
      </ReviewsWrapper>
      <Footer />
    </Sidebar>
  );
};

export default Reviews;
